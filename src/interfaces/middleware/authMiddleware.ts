import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";

export interface AuthRequest extends Request {
  user?: { id: string; role?: string };
}

export const authenticateToken = (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader?.split(" ")[1];
  const secret = process.env.JWT_SECRET;

  if (!token) {
    res.status(401).json({
      message: "Token is missing",
    });
    return;
  }

  jwt.verify(token, secret!, (err, user: any) => {
    if (err) {
      res.status(403).json({ message: "Invalid or expired token" });
    }

    req.user = { id: user.id };

    next();
  });
};
