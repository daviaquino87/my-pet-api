import { Spending, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { SpendingRepository } from "../spendings-repository";
import { getRedis, setRedis } from "@/lib/ioredis";

export class PrismaSpendingsRepository implements SpendingRepository {
  async findSpendingByUser(id: string, user_id: string) {
    const spending = await prisma.spending.findFirst({
      where: {
        id,
        user_id,
      },
    });

    return spending;
  }

  async findById(id: string) {
    const spending = await prisma.spending.findUnique({
      where: {
        id,
      },
    });

    return spending;
  }

  async findManyByUserId(userId: string, page: number) {
    const spendings = await prisma.spending.findMany({
      where: {
        user_id: userId,
      },
      orderBy: { created_at: "desc" },
      take: 10,
      skip: (page - 1) * 10,
    });

    return spendings;
  }

  async countBalance(userId: string) {
    let balance = 0;

    const data_cache = await getRedis(`balance_${userId}`);

    if (data_cache) {
      balance = parseInt(JSON.parse(data_cache));
      return balance;
    }

    const spendings = await prisma.spending.findMany({
      where: {
        user_id: userId,
      },
    });

    spendings.forEach((spending) => {
      balance += spending.price;
    });

    await setRedis(`balance_${userId}`, balance.toString());

    return balance;
  }

  async create(data: Prisma.SpendingUncheckedCreateInput) {
    const spending = await prisma.spending.create({
      data,
    });

    await setRedis(`balance_${data.user_id}`, "");
    return spending;
  }

  async save(data: Spending) {
    const spending = await prisma.spending.update({
      where: {
        id: data.id,
      },
      data,
    });

    await setRedis(`balance_${data.user_id}`, "");
    return spending;
  }

  async delete(id: string) {
    await prisma.spending.delete({
      where: {
        id,
      },
    });
  }
}
