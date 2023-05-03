import { app } from "@/lib/express";
import request from "supertest";
import { describe, expect, it } from "vitest";

describe("Authenticate (e2e)", () => {
  it("should be able to authenticate", async () => {
    await request(app).post("/register").send({
      name: "Jhon Doe",
      email: "jhonDoe@example.com",
      password: "1234567",
    });

    const response = await request(app).post("/session").send({
      email: "jhonDoe@example.com",
      password: "1234567",
    });

    expect(response.statusCode).toEqual(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });
});
