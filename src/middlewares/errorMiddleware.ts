import { ErrorRequestHandler, RequestHandler } from "express";
import mongoose from "mongoose";

export const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  if (err instanceof mongoose.Error.ValidationError) {
    const messages = Object.values(err.errors).map((e: any) => e.message);
    res.status(422).json({
      errors: messages,
      stack: err.stack,
    });
  }
};

export const NotFound: RequestHandler = (req, res) => {
  res.status(404).send("Route tidak ditemukan");
};
