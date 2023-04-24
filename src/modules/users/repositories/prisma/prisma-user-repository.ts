import { Prisma } from "@prisma/client";

import { UserRepository } from "../user-repository";
import { prisma } from "@/lib/prisma";

export class PrismaUserRepoitory implements UserRepository {
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    });

    return user;
  }
}
