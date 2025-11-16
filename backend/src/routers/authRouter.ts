import { Router } from "express";
import { getMe, login, register, logout, Google } from "../controllers/authController";
import { LoginBody, RegisterBody } from "../dtos/Auth.dto";
import { validateBody } from "../middleware/ValidateBody";
import { AuthenticationMiddleware } from "../middleware/AuthenticationMiddleware";

const AuthRouter = Router()

AuthRouter.post("/login", validateBody(LoginBody), login)
AuthRouter.post("/register", validateBody(RegisterBody), register)
AuthRouter.post("/google" , Google)
AuthRouter.get("/me", AuthenticationMiddleware(false), getMe)
AuthRouter.post("/logout", logout)

export default AuthRouter