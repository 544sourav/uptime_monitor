import { Request, Response, NextFunction } from "express";
import { getAuth } from "@clerk/express";

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  // console.log(req);
  const { userId } = getAuth(req);

  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  (req as any).userId = userId;
  next();
};
