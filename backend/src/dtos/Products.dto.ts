import z from "zod"

const ProductInCart = z.object({
    productId: z.string(),
    quantity: z.number().min(1)
})

const Cart = z.object({ cart: z.array(ProductInCart).min(1) })

const CartAndPoints = Cart.extend({ points: z.number().min(0) })

const AddProductBody = z.object({
    name: z.string().trim().min(1),
    description: z.string().trim().min(1),
    price: z.string().transform(Number).refine((val) => val >= 1 && val <= 10000),
    stock: z.string().transform(Number).refine((val) => val >= 0)
})

const EditProductBody = AddProductBody.extend({ productId: z.string() })
const DeleteProductBody = z.object({ productId: z.string() })

type TCart = z.infer<typeof Cart>
type TAddProductBody = z.infer<typeof AddProductBody>
type TEditProductBody = z.infer<typeof EditProductBody>
type TDeleteProductBody = z.infer<typeof DeleteProductBody>
type TCartAndPoints = z.infer<typeof CartAndPoints>
export type { TAddProductBody, TEditProductBody, TDeleteProductBody, TCart, TCartAndPoints }
export { AddProductBody, EditProductBody, DeleteProductBody , CartAndPoints}

export { Cart }