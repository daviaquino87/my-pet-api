import { IsEmail, MinLength } from 'class-validator';

import { messagesValidations } from '@/modules/common/constants/messages';
import { IsNotBlank } from '@/modules/common/decorators/is-not-black.decorator';

export class CreateUserInputDto {
  @MinLength(6, { message: messagesValidations.minLength('nome') })
  @IsNotBlank({ message: messagesValidations.notBlank('nome') })
  name: string;

  @IsEmail({}, { message: messagesValidations.email() })
  email: string;

  @MinLength(6, { message: messagesValidations.minLength('senha') })
  @IsNotBlank({ message: messagesValidations.notBlank('senha') })
  password: string;
}
