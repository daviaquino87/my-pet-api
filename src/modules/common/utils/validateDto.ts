import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { ValidationError, validate } from 'class-validator';

type DTOType<T> = { new (): T };

const getMessageError = (errors: ValidationError[]): string => {
  const [firstError] = errors;
  const hasNestedErrors = firstError?.children?.length > 0;

  if (hasNestedErrors) {
    const [nestedError] = firstError.children;
    const [nestedMessageError] = Object.values(nestedError.constraints);

    return nestedMessageError;
  }

  const [messageError] = Object.values(firstError.constraints);

  return messageError;
};

export const validateDTO = async <T>(
  DTOClass: DTOType<T>,
  dtoObject: T,
): Promise<BadRequestException | void> => {
  const dto = plainToInstance(DTOClass, dtoObject);

  const errors = await validate(dto as object, {
    stopAtFirstError: true,
    whitelist: true,
    forbidNonWhitelisted: true,
  });

  const hasErrors = errors.length > 0;

  if (hasErrors) {
    const messageError = getMessageError(errors);
    throw new BadRequestException(messageError);
  }
};
