import User from "@/models/User";
import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

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

  const isPasswordMatched = await userDoc.comparePassword(password);

  if (!isPasswordMatched) {
    res.status(403).json({
      message: "Password Anda Salah !",
    });

    return;
  }

  const AccressToken = jwt.sign({ id: userDoc._id }, jwtSecret);

  userDoc.token = AccressToken;

  await userDoc.save();

  res.status(200).json({
    message: "Berhasil Login",
    user: {
      id: userDoc._id,
      email: userDoc.email,
      name: userDoc.name,
      avatar: userDoc.avatar?.url,
    },
    token: AccressToken,
  });
};

export const LogoutUser: RequestHandler = async (req, res) => {
  const userDoc = await User.findOne({ _id: req.user.id });

  if (!userDoc) {
    res.status(403).json({
      message: "User tidak ditemukan",
    });

    return;
  }

  userDoc.token = null;

  await userDoc.save();

  res.status(200).json({
    message: "Logout Berhasil !",
  });
};

export const getProfile: RequestHandler = async (req, res) => {
  res.json({
    user: req.user,
  });
};

export const getUsers: RequestHandler = async (req, res) => {
  const usersData = await User.find({ _id: { $ne: req.user.id } }).select([
    "-password",
    "-token",
  ]);

  res.json({
    message: "All Users",
    data: usersData,
  });
};
