import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/lib/express";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Delete Spending (e2e)", () => {
  it("should be able to delete a spending", async () => {
    const { token, user } = await createAndAuthenticateUser(app);

    const spending = await prisma.spending.create({
      data: {
        user_id: user.id,
        price: 150,
      },
    });

    const response = await request(app)
      .delete(`/spendings/delete/${spending.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(204);
  });
});
