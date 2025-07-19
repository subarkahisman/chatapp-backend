import User from "@/models/User";
import { RequestHandler } from "express";
import jwt, { JsonWebTokenError, TokenExpiredError } from "jsonwebtoken";

const jwtSecret = process.env.JWT_SECRET!;

interface UserDocument {
  id: any;
  name: string;
  email: string;
  avatar?: string;
}

declare global {
  namespace Express {
    interface Request {
      user: UserDocument;
    }
  }
}

export const isAuth: RequestHandler = async (req, res, next) => {
  try {
    const HeaderToken = req.headers.authorization;

    if (!HeaderToken) {
      res.status(401).json({
        message: "Unauthorized Token Belum Ada",
      });
      return;
    }

    const token = HeaderToken.split("Bearer ")[1];
    const decoded = jwt.verify(token, jwtSecret) as { id: string };
    const userDoc = await User.findById(decoded.id);

    if (!userDoc) {
      res.status(403).json({
        message: "Unauthorized Token User tidak Ditemukan",
      });
      return;
    }

    req.user = {
      id: userDoc._id,
      email: userDoc.email,
      name: userDoc.name,
      avatar: userDoc.avatar?.url,
    };

    next();
  } catch (error) {
    if (error instanceof TokenExpiredError) {
      res.status(401).json({
        message: "Token sudah expired",
      });

      return;
    }

    if (error instanceof JsonWebTokenError) {
      res.status(401).json({
        message: "Unauthorized token",
      });
      return;
    }

    next(error);
  }
};
