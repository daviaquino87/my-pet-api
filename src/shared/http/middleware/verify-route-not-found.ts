import { NextFunction, Request, Response } from "express";

export function verifyRouteNotFound(
  req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(404).json({ error: "Route not found" });
}
