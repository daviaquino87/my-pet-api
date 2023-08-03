import { HttpException, HttpStatus } from '@nestjs/common';

import { messagesHttpStatus } from '@/modules/common/constants/messages';

export interface ApiExceptionParams {
  message: string;
  status: HttpStatus;
}

export class ApiException extends HttpException {
  constructor(params: ApiExceptionParams) {
    super(
      {
        message: params.message,
        status: params.status,
      },
      params.status,
    );
  }
}

export class ApiUnauthorized extends ApiException {
  constructor(message = messagesHttpStatus.UNAUTHORIZED) {
    super({
      message,
      status: HttpStatus.UNAUTHORIZED,
    });
  }
}

export class ApiForbidden extends ApiException {
  constructor(message = messagesHttpStatus.FORBIDDEN) {
    super({
      message,
      status: HttpStatus.FORBIDDEN,
    });
  }
}

export class ApiNotfound extends ApiException {
  constructor(message = messagesHttpStatus.NOT_FOUND) {
    super({
      message,
      status: HttpStatus.NOT_FOUND,
    });
  }
}

export class ApiBadRequest extends ApiException {
  constructor(message = messagesHttpStatus.BAD_REQUEST) {
    super({
      message,
      status: HttpStatus.BAD_REQUEST,
    });
  }
}

export class ApiConflict extends ApiException {
  constructor(message = messagesHttpStatus.CONFLICT) {
    super({
      message,
      status: HttpStatus.CONFLICT,
    });
  }
}
