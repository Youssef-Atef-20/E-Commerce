// dependencies
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import { verifyStripeKey } from './lib/Stripe';

// environment vars
import { env } from './env';

// routers
import AuthRouter from './routers/authRouter';
import ProductManagementRouter from './routers/productManagementRouter';
import { stripeWebhookHandler } from './controllers/productManagementController';

// closes server if invalid key
verifyStripeKey()

const app = express();
const PORT = env.PORT

app.use(cors({
    credentials: true,
    origin: ["http://localhost:5173", env.FRONTEND]
}));


app.post(
    "/api/products/stripe/webhook",
    bodyParser.raw({ type: "application/json" }),
    stripeWebhookHandler
);


app.use(express.json())
app.use(cookieParser())


// applying routers
app.use('/api/auth', AuthRouter);
app.use('/api/products', ProductManagementRouter);

// database connection and starting server
mongoose.connect(env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log("Listening To PORT number: " + PORT)
        })
    }).catch((e) => {
        console.error("Error connecting to database : " + e)
        process.exit(1)
    })

// testing vercel
// app.listen(PORT, () => {
//     console.log("Listening To PORT number: " + PORT)
// })

app.get("/" , (req , res) => {
    res.end("DEPI Backend is running")
})