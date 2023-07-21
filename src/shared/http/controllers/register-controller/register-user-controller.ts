import { Request, Response } from "express";
import { z } from "zod";

import { InvalidEmailError } from "@/modules/users/errors/invalid-email-error";
import { makeCreateUserUseCase } from "@/modules/users/factories/make-create-user-use-case";
import { makeSendRegisterCodeUseCase } from "@/modules/users/factories/make-send-register-code-use-case";
import { generateFirstAccessCode } from "@/utils/generate-first-access-code";

export class RegisterUserController {
  async handle(request: Request, response: Response) {
    const registerBodySchema = z.object({
      name: z.string().trim().min(6),
      email: z.string().email(),
      password: z.string().trim().min(6),
    });
    const { name, email, password } = registerBodySchema.parse(request.body);

    try {
      const registerUseCase = makeCreateUserUseCase();
      const sendCodeUseCase = makeSendRegisterCodeUseCase();

      const firstAccessCode = generateFirstAccessCode();

      await registerUseCase.execute({
        name,
        email,
        password_hash: password,
        first_access_code: firstAccessCode,
      });

      await sendCodeUseCase.execute({
        to: email,
        code: firstAccessCode,
      });

      return response.status(201).send();
    } catch (error) {
      if (error instanceof InvalidEmailError) {
        return response.status(404).json({ message: error.message });
      }
    }
  }
}
