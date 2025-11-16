import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    img: {
        type: String,
        required: true
    },
    stock : {
        type : Number,
        required : true,
        default : 0
    }
});

export type TProductBase = InferSchemaType<typeof productSchema>
export type TProduct = HydratedDocument<TProductBase>

export const Product = model("Product", productSchema);