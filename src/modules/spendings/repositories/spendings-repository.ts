import { Prisma, Spending } from "@prisma/client";

export interface SpendingRepository {
  findById(id: string): Promise<Spending | null>;
  findSpendingByUser(id: string, user_id: string): Promise<Spending | null>;
  findManyByUserId(userId: string, page: number): Promise<Spending[]>;
  countBalance(userId: string): Promise<number>;
  save(spending: Spending): Promise<Spending>;
  create(data: Prisma.SpendingUncheckedCreateInput): Promise<Spending>;
  delete(id: string): Promise<void>;
}
