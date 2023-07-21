import nodemailer from "nodemailer";
import { env } from "process";

import { EmailContract, ISendEmail } from "./interfaces/email-contract";

export class Nodemailer implements EmailContract {
  async sendEmail({ to, subject, html }: ISendEmail): Promise<any> {
    const mailOptions = {
      from: "no-reply@mypet.com.br",
      to: to,
      subject: subject,
      html: html,
    };

    const transporter = nodemailer.createTransport({
      host: env.NODEMAILER_HOST,
      port: Number(env.NODEMAILER_PORT),
      secure: false,
      auth: {
        user: env.NODEMAILER_USER,
        pass: env.NODEMAILER_PASS,
      },
      tls: { rejectUnauthorized: false },
    });

    try {
      await transporter.sendMail(mailOptions);

      console.log("E-mail enviado com sucesso!");
    } catch (error) {
      return error;
    }
  }
}
