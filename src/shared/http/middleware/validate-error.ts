import { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { UnauthorizedError } from "../errors/unauthorized-error";

export function validadeError(
  error: Error | ZodError | UnauthorizedError,
  request: Request,
  response: Response,
  next: NextFunction
) {
  if (error instanceof ZodError) {
    return response
      .status(400)
      .json({ message: "validation error.", issues: error.format() });
  }

  if (error instanceof UnauthorizedError) {
    return response.status(401).json({ message: error.message });
  }

  console.log(error);
  return response.status(500).json({ message: "Internal error server." });
}
