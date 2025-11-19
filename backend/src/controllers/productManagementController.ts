import type { Request, Response } from "express";
import { TAddProductBody, TCart, TDeleteProductBody, TEditProductBody } from "../dtos/Products.dto";
import { Product } from "../models/Product";
import Stripe from "stripe";
import { TUser } from "../models/User";
import stripe from "../lib/Stripe";
import { env } from "../env";
import mongoose, { isObjectIdOrHexString } from "mongoose";
import cloudinary from "../lib/Cloudinary";
import { Order, TOrderProduct } from "../models/Order";

export async function AddProduct(req: Request<{}, {}, TAddProductBody>, res: Response) {
    try {
        const { name, price, description, stock } = req.body;
        let imgUrl = await processImgUrl(req);

        const product = await Product.create({
            name,
            price,
            description,
            img: imgUrl,
            stock,
        });

        return res.status(201).json({ product });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ error: "Server Error" });
    }
}

export async function EditProduct(req: Request<{}, {}, TEditProductBody>, res: Response) {
    try {
        const { productId, name, price, description, stock } = req.body;
        let imgUrl = await processImgUrl(req);

        const updateData: any = { name, price, description, stock };
        if (imgUrl != " ") updateData.img = imgUrl;

        const product = await Product.findByIdAndUpdate(
            productId,
            updateData,
            { new: true }
        );

        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json({ product });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Server Error" });
    }
}

export async function DeleteProduct(req: Request<{}, {}, TDeleteProductBody>, res: Response) {
    try {
        const { productId } = req.body;
        const deleted = await Product.findByIdAndDelete(productId);

        if (!deleted) {
            return res.status(404).json({ error: "Product not found" });
        }

        return res.json({ message: "Successful Removal" });
    } catch (err) {
        return res.status(500).json({ error: "Server Error" });
    }
}

export async function CustomerCheckout(req: Request<{}, {}, TCart>, res: Response) {
    const user = req.user as TUser
    const errors: { message: string, productId: string }[] = []
    const ok: TCart = { cart: [] }
    const productsForOrder: TOrderProduct[] = []
    let total = 0
    try {
        let CartData: Promise<Stripe.Checkout.SessionCreateParams.LineItem | null>[] = req.body.cart.map(async ({ productId, quantity }: { productId: string, quantity: number }) => {
            try {
                if (!isObjectIdOrHexString(productId)) {
                    errors.push({ message: "Product Not Found", productId })
                    return null
                }

                const productData = await Product.findById(productId)

                if (!productData) {
                    errors.push({ message: "Product Not Found", productId })
                    return null
                }

                if (productData.stock < quantity) {
                    errors.push({ message: productData.stock == 0 ? "Product out of stock" : "Insufficient Stock", productId })
                    return null
                }

                // to return the good ones to the user so he gets a valid cart
                ok.cart.push({ productId, quantity })

                productsForOrder.push({
                    productId: productData._id,
                    name: productData.name,
                    description: productData.description,
                    price: productData.price,
                    img: productData.img,
                    quantity
                })

                total += quantity * productData.price

                return {
                    price_data: {
                        currency: "usd",
                        unit_amount: productData.price * 100,
                        product_data: {
                            name: productData.name,
                            description: productData.description,
                            metadata: {
                                productId: productData._id.toString()
                            },
                            images: [productData.img]
                        },
                    },
                    quantity,
                } satisfies Stripe.Checkout.SessionCreateParams.LineItem;

            } catch (e) {
                console.log(e)
                errors.push({ message: "Server Error", productId })
                return null
            }
        })



        // dont redirect the user , let them know about the errors first
        if (errors.length) {
            return res.status(400).json({ ok, errors })
        }

        // NOW CREATE CHECKOUT SESSION !!!!!!!

        // ready to be plugged into stripe
        const filteredCartData: Stripe.Checkout.SessionCreateParams.LineItem[] = (await Promise.all(CartData)).filter(x => x != null)

        // should never come here but i kept that check because paranoid
        if (!filteredCartData.length) {
            return res.status(400).json({ ok, errors })
        }

        const session = await stripe.checkout.sessions.create({
            line_items: filteredCartData,
            mode: "payment",
            success_url: `${env.FRONTEND}`,
            cancel_url: `${env.FRONTEND}`,
            customer: user.stripeCustomerId as string,
            metadata: {
                userId: user._id.toString()
            },
        })

        const order = await Order.create({
            userId: user._id,
            payUrl: session.url,
            products: productsForOrder,
            totalPrice: total,
            sessionId: session.id
        })

        return res.json({ url: session.url })

    } catch (e) {
        console.log(e)
        return res.status(500).json({ message: "Server Error" })
    }
}

export async function stripeWebhookHandler(req: Request, res: Response) {
    const sig = req.headers["stripe-signature"] as string;
    let event = req.body;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        return res.sendStatus(400);
    }

    const mongooseSession = await mongoose.startSession();
    const eventType = event.type;

    try {
        switch (eventType) {
            case "checkout.session.completed": {
                const session: Stripe.Checkout.Session = event.data.object;
                if(!await Order.findOne({sessionId : session.id , status : "pending"})){
                    // we already proccessed duplicate stripe signal
                    return res.json({ received: true })
                }
                const lineItems = await stripe.checkout.sessions.listLineItems(session.id, { expand: ['data.price.product'] });

                mongooseSession.startTransaction()

                for (const item of lineItems.data) {

                    const product = item.price?.product as Stripe.Product
                    const productId = product?.metadata?.productId

                    const result = await Product.updateOne(
                        { _id: productId, stock: { $gte: item.quantity } },
                        { $inc: { stock: item.quantity ? -item.quantity : 0 } }
                    ).session(mongooseSession);

                    if (result.modifiedCount === 0) {
                        await mongooseSession.abortTransaction();

                        await stripe.refunds.create({
                            payment_intent: session.payment_intent as string
                        });

                        console.log(`Insufficient stock for product ID: ${productId}. Refund initiated.`);
                        
                        await Order.findOneAndUpdate({ sessionId: session.id }, { status: "canceled" , message : `Order canceled due to insufficient stock for product ID: ${productId}`})

                        return res.json({ received: true })
                    }
                }
                
                await mongooseSession.commitTransaction();
                await Order.findOneAndUpdate({ sessionId: session.id }, { status: "completed" , message : "Order completed successfully"})

                break;
            }
            case "checkout.session.expired":{
                const session: Stripe.Checkout.Session = event.data.object;
                await Order.findOneAndUpdate({ sessionId: session.id , status : "pending"}, { status: "canceled" , message : "Order Expired before payment" })
                break;
            }
        }

    } catch (err) {
        console.error("Error handling Stripe webhook:", err);
        res.status(500).json({ message: "Server Error" })
    } finally {
        await mongooseSession.endSession()
    }
    return res.json({ received: true })
};

export async function GetAllProducts(req: Request, res: Response) {
    try {
        const products = await Product.find();
        return res.json(products);
    } catch (err) {
        return res.status(500).json({ error: "Server Error" });
    }
}

async function processImgUrl(req: Request) {
    try {
        if (!req.file) return " ";

        const imgUrl = await new Promise<string>((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                { folder: "products" },
                (err, result) => {
                    if (err) return reject(err);
                    return resolve(result!.secure_url);
                }
            );
            stream.end(req?.file?.buffer);
        });

        return imgUrl;
    } catch (err) {
        console.log("processImgUrl ERROR:", err);
        return " ";
    }
}

export async function getOrders(req : Request , res : Response){
    const orders = await Order.find({ userId: req.user!._id });
    return res.json(orders);
}