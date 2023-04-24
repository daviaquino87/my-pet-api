import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { UnauthorizedError } from "../errors/unauthorized-error";

type JWTPlayload = {
  sig: string;
  exp: number;
};

export async function ensureAuthenticate(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const { authorization } = request.headers;

  if (!authorization) {
    throw new UnauthorizedError();
  }

  const token = authorization.split(" ");

  const data = jwt.decode(token[1]) as JWTPlayload;

  if (new Date(data.exp * 1000).getTime() < new Date().getTime()) {
    throw new UnauthorizedError();
  }

  request.user = {
    id: data.sig,
  };

  next();
}
