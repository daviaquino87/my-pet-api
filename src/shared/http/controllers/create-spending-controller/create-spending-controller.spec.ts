import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/lib/express";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";

describe("Create Spending (e2e)", () => {
  it("should be able to create a spending", async () => {
    const { token } = await createAndAuthenticateUser(app);
    const response = await request(app)
      .post("/spendings")
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 205,
      });

    expect(response.statusCode).toEqual(201);
    expect(response.body.spending).toEqual(
      expect.objectContaining({
        id: expect.any(String),
      })
    );
  });
});
