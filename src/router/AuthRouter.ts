import { LoginUser, RegisterUser } from "@/controllers/auth.controller";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);

export default authRouter;
