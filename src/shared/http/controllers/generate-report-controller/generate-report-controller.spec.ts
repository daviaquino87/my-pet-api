import { describe, expect, it } from "vitest";
import request from "supertest";

import { app } from "@/lib/express";
import { createAndAuthenticateUser } from "@/utils/tests/create-and-authenticate-user";
import { prisma } from "@/lib/prisma";

describe("Generate Report (e2e)", () => {
  it("should generate a report", async () => {
    const { token, user } = await createAndAuthenticateUser(app);

    await prisma.spending.createMany({
      data: [
        {
          user_id: user.id,
          price: 125,
          date: new Date("2023-04-09 12:21:15"),
        },
        {
          user_id: user.id,
          price: 125,
          date: new Date("2023-04-09 12:21:15"),
        },
      ],
    });

    const response = await request(app)
      .get("/spendings/report")
      .query({
        initialDate: "2023-04-08 12:21:15",
        finalDate: "2023-04-10 12:21:15",
      })
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(200);
    expect(response.header["content-type"]).toBe("application/pdf");
  }, 30000);
});
