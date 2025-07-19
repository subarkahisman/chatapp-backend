import {
  getProfile,
  getUsers,
  LoginUser,
  LogoutUser,
  RegisterUser,
} from "@/controllers/auth.controller";
import { isAuth } from "@/middlewares/authMiddleware";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);
authRouter.post("/logout", isAuth, LogoutUser);
authRouter.get("/profile", isAuth, getProfile);
authRouter.get("/users", isAuth, getUsers);

export default authRouter;
