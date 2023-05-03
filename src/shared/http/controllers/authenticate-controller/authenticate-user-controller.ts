import { Request, Response } from "express";
import { z } from "zod";
import jwt from "jsonwebtoken";

import { authenticate } from "@/modules/users/factories/make-authenticate-user-use-case";
import { InvalidCredentialsError } from "@/modules/users/errors/invalid-cretential-error";

export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const authenticateBodySchema = z.object({
      email: z.string().email(),
      password: z.string().min(6),
    });

    const { email, password } = authenticateBodySchema.parse(request.body);

    try {
      const authenticateUseCase = authenticate();

      const { user } = await authenticateUseCase.execute({
        email,
        password,
      });

      const token = jwt.sign(
        {
          sig: user.id,
        },
        process.env.JWT_PASS ?? "",
        { expiresIn: "1h" }
      );

      return response.status(200).json({
        token: token,
        user: {
          id: user.id,
          name: user.name,
        },
      });
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return response.status(404).json({ message: error.message });
      }
    }
  }
}
