import { Schema, model, InferSchemaType, HydratedDocument } from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    loyaltyPoints: {
        type: Number,
        required: true,
        default: 0
    },
    isAdminstartor: {
        type: Boolean,
        required: true,
        default: false
    }, stripeCustomerId: {
        type: String
    },
    googleSub : {
        type: String,
        unique: true,
    }
});

export type TUserBase = InferSchemaType<typeof userSchema>
export type TUser = HydratedDocument<TUserBase>

export const User = model("User", userSchema);