import { Prisma, User } from "@prisma/client";
import { UserRepository } from "../user-repository";
import { randomUUID } from "node:crypto";

export class UserRepositoryInMemory implements UserRepository {
  public users: User[] = [];

  async findByEmail(email: string): Promise<User | null> {
    const user = this.users.find((user) => user.email === email);

    if (user) {
      return user;
    }

    return null;
  }

  async create({
    name,
    email,
    password_hash,
  }: Prisma.UserCreateInput): Promise<User> {
    const user = {
      id: randomUUID(),
      name,
      email,
      password_hash,
      created_at: new Date(),
    };

    this.users.push(user);

    return user;
  }
}
