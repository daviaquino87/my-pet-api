import { Spending, Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

import { SpendingRepository } from "../spendings-repository";
import dayjs from "dayjs";

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

  async searchSpendingsByPeriod(
    userId: string,
    initialDate: Date,
    finalDate: Date
  ) {
    const startOfTheDay = dayjs(initialDate).startOf("date");
    const endOfTheDay = dayjs(finalDate).endOf("date");

    const spendings = await prisma.spending.findMany({
      where: {
        user_id: userId,
        date: {
          gte: startOfTheDay.toDate(),
          lte: endOfTheDay.toDate(),
        },
      },
    });

    return spendings;
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

    const spendings = await prisma.spending.findMany({
      where: {
        user_id: userId,
      },
    });

    spendings.forEach((spending) => {
      balance += spending.price;
    });

    return balance;
  }

  async create(data: Prisma.SpendingUncheckedCreateInput) {
    const spending = await prisma.spending.create({
      data,
    });

    return spending;
  }

  async save(data: Spending) {
    const spending = await prisma.spending.update({
      where: {
        id: data.id,
      },
      data,
    });

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
