import { app } from "@/lib/express";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Register (e2e)", () => {
  it("should be able to register", async () => {
    const response = await request(app).post("/register").send({
      name: "Jhon Doe",
      email: "jhonDoe@example.com",
      password: "1234567",
    });

    expect(response.statusCode).toBe(201);
  });
});
