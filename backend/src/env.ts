import { z } from "zod";
import { config } from "dotenv";
config()

const envSchema = z.object({
    PORT: z.string().transform(Number),
    MONGO_URI: z.string(),
    JWT_SECRET: z.string().min(30),
    FRONTEND: z.string(),
    NODE_ENV: z.string(),
    STRIPE_PUB_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
    STRIPE_WEBHOOK_SECRET : z.string(),
    GOOGLE_CLIENT_ID : z.string(),
    GOOGLE_CLIENT_SECRET : z.string(),
    CLOUD_NAME : z.string(),
    CLOUD_KEY : z.string(),
    CLOUD_SECRET : z.string(),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
    console.error("Incompaitable environment : ", _env.error.message);
    process.exit(1);
}

export const env = _env.data;