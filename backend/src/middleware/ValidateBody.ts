import { z } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validateBody = <T extends z.ZodType>(schema: T) => {
    return (req: Request<any, any, unknown>, res: Response, next: NextFunction) => {
        const result = schema.safeParse(req.body);

        if (!result.success) {
            return res.status(400).json({
                message: "Invalid input",
            });
        }

        req.body = result.data;
        next();
    };
};