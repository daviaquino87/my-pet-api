export interface ISendEmail {
  to: string;
  subject: string;
  html: any;
}

export abstract class EmailContract {
  abstract sendEmail(data: ISendEmail): Promise<any>;
}
