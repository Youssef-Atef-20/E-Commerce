import type { Request, Response } from "express";
import { SafeUser } from "../dtos/Auth.dto";
import type { TLoginBody, TRegisterBody } from "../dtos/Auth.dto";
import { env } from "../env";
import { sign } from "jsonwebtoken"
import { TUser, User } from "../models/User";
import bcrypt from "bcrypt"
import stripe from "../lib/Stripe";
import { OAuth2Client, TokenPayload } from "google-auth-library";

const TOKEN_SECRET = env.JWT_SECRET

const client = new OAuth2Client(
    env.GOOGLE_CLIENT_ID,
    env.GOOGLE_CLIENT_SECRET,
    'postmessage',
);

export async function getMe(req: Request, res: Response) {
    if (req.user) return returnUser(res, req.user)
    else return res.status(401).json({ message: "Unauthorized" })
}

export async function login(req: Request<{}, {}, TLoginBody>, res: Response) {
    const { email, password } = req.body
    const user = await User.findOne({ email })

    if (user) {
        if (user.password == "UNSET") return res.status(400).json({ message: "Please login with google" })
        if (await bcrypt.compare(password, user.password)) {
            assignUserToken(res, user._id.toString())
            return returnUser(res, user)
        } else {
            return res.status(401).json({ message: "Invalid Credintials" })
        }
    } else {
        return res.status(401).json({ message: "Invalid Credintials" })
    }
}

export async function register(req: Request<{}, {}, TRegisterBody>, res: Response) {
    const { email, password, username } = req.body

    const exists = await User.findOne({ email })

    if (exists) {
        return res.status(409).json({ message: "Email in use" })
    } else {
        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await createUser({ username, email, password: hashedPassword })
        if (!user) return res.status(500).json({ message: "Error creating user " })

        assignUserToken(res, user._id.toString())
        return returnUser(res, user)
    }
}

export async function Google(req: Request<{}, {}, { code: string }>, res: Response) {
    const { code } = req.body;
    if (!code) return res.status(400).json({ message: "No code provided" })

    try {
        const ticket = await client.verifyIdToken({
            idToken: code,
            audience: env.GOOGLE_CLIENT_ID,
        });

        const payload: TokenPayload = ticket.getPayload() as TokenPayload;

        const { sub, email } = payload;

        if (!email) {
            throw new Error("No email")
        }

        if (!payload.exp || payload.exp < Date.now() / 1000) {
            throw new Error('Token expired');
        }

        let existingUser = await User.findOne({ email });

        if (existingUser) {
            if (!existingUser.googleSub) existingUser.googleSub = sub
            await existingUser.save()

            assignUserToken(res, existingUser._id.toString());
            return returnUser(res, existingUser)
        } else {
            const newUser = await createUser({ username: email, email, password: "UNSET", googleSub: sub })
            if (!newUser) return res.status(500).json({ message: "Error creating user " })
            assignUserToken(res, newUser._id.toString());
            return returnUser(res, newUser)
        }


    } catch (error) {
        console.error('Google authentication error:', error);
        return res.status(500).json({ message: 'Server error' });
    }
}

export async function logout(req: Request, res: Response) {
    res.clearCookie("token", {
        httpOnly: true,
        secure: env.NODE_ENV !== "development",
        maxAge: 0,
        sameSite: env.NODE_ENV !== "development" ? "none" : "lax",
        path: "/",
    })

    return res.json({ message: "Logged out" });
}


function assignUserToken(res: Response, id: string) {
    const token = sign({ id }, TOKEN_SECRET, { expiresIn: "7d" });

    return res.cookie("token", token, {
        httpOnly: true,
        secure: env.NODE_ENV !== "development",
        maxAge: 7 * 24 * 60 * 60 * 1000,
        sameSite: env.NODE_ENV !== "development" ? "none" : "lax",
        path: "/",
    });
}

function returnUser(res: Response, user: TUser) {
    const safeUser = SafeUser.parse(user.toObject())

    return res.json({ user: safeUser })
}

async function createUser(obj: { username: string, password: string, email: string, googleSub?: string }) {
    try {
        const { username, password, email, googleSub } = obj
        const user = await User.create({ email, username, password, googleSub: googleSub ? googleSub : null })

        const stripeCustomer = await stripe.customers.create({
            email,
            metadata: {
                userId: user._id.toString()
            }
        })

        user.stripeCustomerId = stripeCustomer.id
        await user.save()

        return user
    } catch (e) {
        console.log("Error creating user : ", e)
        return null
    }
}