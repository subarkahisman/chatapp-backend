import { RegisterUser } from "@/controllers/auth.controller";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);

export default authRouter;
