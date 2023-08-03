import {
  registerDecorator,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';

import { messagesValidations } from '@/modules/common/constants/messages';

@ValidatorConstraint({ name: 'IsNotBlank' })
export class IsNotBlankConstraint implements ValidatorConstraintInterface {
  validate(value: any) {
    return typeof value === 'string' && value.trim().length > 0;
  }

  defaultMessage(): string {
    return messagesValidations.notBlank('$property');
  }
}

export function IsNotBlank(validationOptions?: ValidationOptions) {
  return function (object: any, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName,
      constraints: [],
      options: validationOptions,
      validator: IsNotBlankConstraint,
    });
  };
}
