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

export const LoginUser: RequestHandler = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({
      message: "Email atau Password harus diisi",
    });

    return;
  }

  const userDoc = await User.findOne({ email });

  if (!userDoc) {
    res.status(403).json({
      message: "User dengan email " + email + " tidak ditemukan !",
    });

    return;
  }

  res.send("Login berhasil");
};
