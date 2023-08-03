import { IsEmail, MinLength } from 'class-validator';

import { messagesValidations } from '@/modules/common/constants/messages';
import { IsNotBlank } from '@/modules/common/decorators/is-not-black.decorator';

export class AuthUserInputDto {
  @IsEmail({}, { message: messagesValidations.email() })
  email: string;

  @MinLength(6, { message: messagesValidations.minLength('codigo') })
  @IsNotBlank({ message: messagesValidations.notBlank('senha') })
  password: string;
}
