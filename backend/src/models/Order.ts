import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const orderProductSchema = new Schema({
    productId: {
        type: Schema.Types.ObjectId,
        ref: "Product",
        required: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        min: 1
    }
}, { _id: false });

const orderSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    products: {
        type: [orderProductSchema],
        required: true
    },
    totalPrice: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["pending", "canceled", "completed"],
        default: "pending"
    },
    payUrl: {
        type: String,
        required: true
    },
    sessionId:{
        type: String,
        required: true
    },
    message : {
        type : String,
        default : "Order Pending Payment"
    },
    usedPoints : {
        type : Number , 
        default : 0
    }
}, { timestamps: true });

export type TOrderBase = InferSchemaType<typeof orderSchema>;
export type TOrder = HydratedDocument<TOrderBase>;
export type TOrderProduct = InferSchemaType<typeof orderProductSchema>;
export const Order = model("Order", orderSchema);