import {
  getProfile,
  getUsers,
  LoginUser,
  LogoutUser,
  RegisterUser,
  updatePassowrdByToken,
  updateProfileUserByToken,
  uploadImageAvatar,
} from "@/controllers/auth.controller";
import { isAuth } from "@/middlewares/authMiddleware";
import upload from "@/middlewares/uploadMiddleware";
import express from "express";

const authRouter = express.Router();

authRouter.post("/register", RegisterUser);
authRouter.post("/login", LoginUser);
authRouter.post("/logout", isAuth, LogoutUser);
authRouter.get("/profile", isAuth, getProfile);
authRouter.get("/users", isAuth, getUsers);
authRouter.post("/upload", isAuth, upload.single("avatar"), uploadImageAvatar);
authRouter.put("/update-user", isAuth, updateProfileUserByToken);
authRouter.put("/update-password", isAuth, updatePassowrdByToken);

export default authRouter;
