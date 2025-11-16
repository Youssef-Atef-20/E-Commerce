import type { TUser } from "../models/User"

declare global {
    namespace Express {
        interface Request {
            user?: TUser
        }
    }
}