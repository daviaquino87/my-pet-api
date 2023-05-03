import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/lib/express";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Update Spending (e2e)", () => {
  it("should be able to updated a spending", async () => {
    const { token, user } = await createAndAuthenticateUser(app);

    const spending = await prisma.spending.create({
      data: {
        user_id: user.id,
        price: 150,
      },
    });

    const response = await request(app)
      .put(`/spendings/update/${spending.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        price: 300,
      });

    expect(response.statusCode).toEqual(200);
    expect(response.body.spending).toEqual(
      expect.objectContaining({
        price: 300,
      })
    );
  });
});
