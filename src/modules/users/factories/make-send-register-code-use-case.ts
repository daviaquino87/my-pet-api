import { Nodemailer } from "@/lib/mail/nodemailer";

import { SendRegisterCodeUseCase } from "../use-cases/send-register-code/send-register-code-use-case";

export function makeSendRegisterCodeUseCase() {
  const emailService = new Nodemailer();
  const useCase = new SendRegisterCodeUseCase(emailService);

  return useCase;
}
