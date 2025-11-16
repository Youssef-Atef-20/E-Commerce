import Stripe from "stripe";
import { env } from "../env";

const stripe = new Stripe(env.STRIPE_SECRET_KEY);

export function verifyStripeKey() {
    stripe.customers.list({ limit: 1 }).catch(() => {
        console.error("Stripe connection failed wrong key");
        process.exit(1)
    });
}

export default stripe