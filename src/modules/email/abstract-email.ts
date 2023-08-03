import { ISendEmail } from '@/modules/email/interfaces/send-email.interface';

export abstract class AbstractEmail {
  abstract send(email: ISendEmail): Promise<void>;
}
