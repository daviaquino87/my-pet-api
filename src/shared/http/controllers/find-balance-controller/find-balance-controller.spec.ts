import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/lib/express";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("List Balance (e2e)", () => {
  it("should be able to list a balance of an user", async () => {
    const { token, user } = await createAndAuthenticateUser(app);

    await prisma.spending.createMany({
      data: [
        {
          user_id: user.id,
          price: 125,
        },
        {
          user_id: user.id,
          price: 125,
        },
      ],
    });

    const response = await request(app)
      .get("/users/balance")
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.balance).toEqual(250);
  });
});
