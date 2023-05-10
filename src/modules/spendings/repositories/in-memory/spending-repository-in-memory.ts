import { Prisma, Spending } from "@prisma/client";
import { randomUUID } from "crypto";
import { SpendingRepository } from "../spendings-repository";
import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
dayjs.extend(isBetween);

export class SpendingRepositoryInMemory implements SpendingRepository {
  public spendings: Spending[] = [];

  async countBalance(userId: string) {
    let balance = 0;
    const spendings = this.spendings.filter(
      (spending) => spending.user_id === userId
    );

    spendings.forEach((spending) => {
      balance += spending.price;
    });

    return balance;
  }

  async searchSpendingsByPeriod(
    userId: string,
    initialDate: Date,
    finalDate: Date
  ) {
    const spendings = this.spendings.filter((spending) => {
      const spendingDate = dayjs(spending.date);
      const initialDay = dayjs(initialDate);
      const finalDay = dayjs(finalDate);

      return (
        spending.user_id === userId &&
        spendingDate.isBetween(initialDay, finalDay, null, "[]")
      );
    });

    return spendings;
  }

  async findSpendingByUser(id: string, user_id: string) {
    const spending = this.spendings.find(
      (item) => item.id === id && item.user_id === user_id
    );

    if (!spending) {
      return null;
    }

    return spending;
  }

  async findById(id: string) {
    const spending = this.spendings.find((item) => item.id === id);

    if (!spending) {
      return null;
    }

    return spending;
  }

  async findManyByUserId(userId: string, page: number) {
    return this.spendings
      .filter((spending) => spending.user_id === userId)
      .slice((page - 1) * 10, page * 10);
  }

  async save(spending: Spending) {
    const spendingIndex = this.spendings.findIndex(
      (item) => item.id === spending.id
    );

    if (spendingIndex >= 0) {
      this.spendings[spendingIndex] = spending;
    }

    return this.spendings[spendingIndex];
  }

  async create(data: Prisma.SpendingUncheckedCreateInput) {
    const spending = {
      id: randomUUID(),
      price: data.price,
      date: (data.date as Date) ?? new Date(),
      user_id: data.user_id,
      created_at: new Date(),
    };

    this.spendings.push(spending);

    return spending;
  }

  async delete(id: string) {
    const spendingIndex = this.spendings.findIndex((item) => item.id === id);
    if (spendingIndex !== -1) {
      this.spendings.splice(spendingIndex, 1);
    }
  }
}
