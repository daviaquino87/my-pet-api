import ejs from "ejs";
import path from "path";

import { EmailContract } from "@/lib/mail/interfaces/email-contract";

interface ISendRegisterCodeUseCaseInput {
  to: string;
  code: string;
}

export class SendRegisterCodeUseCase {
  constructor(private readonly mailService: EmailContract) {}

  async execute({ to, code }: ISendRegisterCodeUseCaseInput): Promise<void> {
    const pathToTemplate = path.resolve(
      __dirname,
      "../../../../lib/mail/templates/validate-register-code.ejs"
    );

    const html = await ejs.renderFile(pathToTemplate, {
      code,
    });

    await this.mailService.sendEmail({
      to,
      subject: "Código de validação ",
      html,
    });
  }
}
