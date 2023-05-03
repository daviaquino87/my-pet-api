import { app } from "@/lib/express";
import { prisma } from "@/lib/prisma";
import { hash } from "bcryptjs";
import { Express } from "express";
import request from "supertest";

export async function createAndAuthenticateUser(app: Express) {
  const user = await prisma.user.create({
    data: {
      name: "Jhon Doe",
      email: "jhonDoe@example.com",
      password_hash: await hash("1234567", 6),
    },
  });

  const authResponse = await request(app).post("/session").send({
    email: "jhonDoe@example.com",
    password: "1234567",
  });

  const { token } = authResponse.body;

  return {
    token,
    user,
  };
}
