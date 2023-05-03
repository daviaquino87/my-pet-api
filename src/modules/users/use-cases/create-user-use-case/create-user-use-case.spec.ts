import { describe, it, beforeEach, expect } from "vitest";

import { UserRepositoryInMemory } from "@/modules/users/repositories/in-memory/user-repository-in-memory";
import { CreateUserUseCase } from "./create-user-use-case";

import { InvalidEmailError } from "@/modules/users/errors/invalid-email-error";

let userRepository: UserRepositoryInMemory;
let sut: CreateUserUseCase;

describe("Create an user use case", () => {
  beforeEach(() => {
    userRepository = new UserRepositoryInMemory();
    sut = new CreateUserUseCase(userRepository);
  });
  it("should be able possible to create an user", async () => {
    const { user } = await sut.execute({
      name: "User Name",
      email: "userEmail@test.com",
      password_hash: "userPassword",
    });

    expect(userRepository.users).toHaveLength(1);
    expect(userRepository.users[0].email).toEqual(user.email);
    expect(user.id).toEqual(expect.any(String));
  });

  it("should not be able possible to create an user with email already exists", async () => {
    await sut.execute({
      name: "User Name",
      email: "userEmail@test.com",
      password_hash: "userPassword",
    });

    await expect(() =>
      sut.execute({
        name: "User Name",
        email: "userEmail@test.com",
        password_hash: "userPassword",
      })
    ).rejects.toBeInstanceOf(InvalidEmailError);
  });
});
