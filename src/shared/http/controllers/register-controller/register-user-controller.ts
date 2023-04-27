import { Request, Response } from "express";
import { z } from "zod";

import { register } from "@/modules/users/factories/make-create-user-use-case";
import { InvalidEmailError } from "@/modules/users/errors/invalid-email-error";

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      name: z.string().min(6),
      email: z.string().email(),
      password: z.string().min(6),
    });
    const { name, email, password } = registerBodySchema.parse(request.body);
    try {
      const registerUseCase = register();
      await registerUseCase.execute({
        name,
        email,
        password_hash: password,
      });
      return response.status(201).send();
    } catch (error) {
      if (error instanceof InvalidEmailError) {
        return response.status(404).json({ message: error.message });
      }
    }
  }
}
