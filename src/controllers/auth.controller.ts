import User from "@/models/User";
import { RequestHandler } from "express";

export const RegisterUser: RequestHandler = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({
    name,
    email,
    password,
  });

  res.status(201).json({
    message: "Register User Berhasil Dilakukan",
  });
};
