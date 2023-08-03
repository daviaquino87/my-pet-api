import { SetMetadata } from '@nestjs/common';

export const RoutePublic = () => SetMetadata('isPublic', true);
