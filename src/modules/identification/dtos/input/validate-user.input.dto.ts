import { MinLength } from 'class-validator';

import { messagesValidations } from '@/modules/common/constants/messages';
import { IsNotBlank } from '@/modules/common/decorators/is-not-black.decorator';

export class ValidateUserInputDto {
  @MinLength(4, { message: messagesValidations.minLength('codigo') })
  @IsNotBlank({ message: messagesValidations.notBlank('codigo') })
  code: string;
}
