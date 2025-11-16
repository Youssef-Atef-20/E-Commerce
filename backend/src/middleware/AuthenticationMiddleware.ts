import { User } from "../models/User";
import type { Request, Response, NextFunction } from "express";
import { JwtPayload, verify } from "jsonwebtoken";
import { env } from "../env";
import { isObjectIdOrHexString } from "mongoose";

export function AuthenticationMiddleware(shouldBeAdmin: boolean) {
    const TOKEN_SECRET = env.JWT_SECRET

    return async (req: Request<any, any, unknown>, res: Response, next: NextFunction) => {
        const { token } = req.cookies
        if (token) {
            try {
                const result = verify(token, TOKEN_SECRET) as JwtPayload
                if (result.id && isObjectIdOrHexString(result.id)) {
                    const user = await User.findById(result.id)
                    if (user) {
                        if (shouldBeAdmin && !user.isAdminstartor) return res.status(401).json({ message: "Unauthorized" })
                        req.user = user;
                        return next()
                    }
                }
            } catch {
                return res.status(401).json({ message: "Unauthorized" })
            }
        }
        
        return res.status(401).json({ message: "Unauthorized" })
    }
}