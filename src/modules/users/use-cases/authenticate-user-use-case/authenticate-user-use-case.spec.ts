import { describe, beforeEach, it, expect } from "vitest";
import { hash } from "bcryptjs";

import { UserRepositoryInMemory } from "@/modules/users/repositories/in-memory/user-repository-in-memory";
import { AuthenticateUserUseCase } from "./authenticate-user-use-case";

import { InvalidCredentialsError } from "@/modules/users/errors/invalid-cretential-error";

let userRepository: UserRepositoryInMemory;
let sut: AuthenticateUserUseCase;

describe("Authenticate use case", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    sut = new AuthenticateUserUseCase(userRepository);
  });

  it("should be able possible to authenticate an user", async () => {
    await userRepository.create({
      name: "user test",
      email: "userEmail@test.com",
      password_hash: await hash("123456", 6),
    });

    const userAuth = await sut.execute({
      email: "userEmail@test.com",
      password: "123456",
    });

    expect(userAuth).toBeTruthy();
  });

  it("should not be able possible to authenticate an user with wrong email", async () => {
    await expect(() =>
      sut.execute({
        email: "invalidEmail@test.com",
        password: "123456",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });

  it("should not be able possible to authenticate an user with invalid password", async () => {
    await userRepository.create({
      name: "user test",
      email: "userEmail@test.com",
      password_hash: await hash("123456", 6),
    });

    await expect(() =>
      sut.execute({
        email: "userEmail@test.com",
        password: "7891011",
      })
    ).rejects.toBeInstanceOf(InvalidCredentialsError);
  });
});
