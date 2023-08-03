import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { ApiUnauthorized } from '@/modules/common/exceptions/exceptions';
import { authConfig } from '@/modules/identification/constants';
import { IAuthenticatedUser } from '@/modules/identification/interfaces/authenticated-user.interface';
import { IPayloadAccessToken } from '@/modules/identification/interfaces/payload-access-token.interface';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

@Injectable()
export class JWTAuthStrategy extends PassportStrategy(
  Strategy,
  authConfig.STRATEGY_NAME,
) {
  constructor(private readonly userRepository: AbstractUsersRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authConfig.JWT_AUTH_SECRET,
    });
  }

  async validate({ email }: IPayloadAccessToken): Promise<IAuthenticatedUser> {
    const userAuth = await this.userRepository.findUserByEmail({ email });

    if (!userAuth || !userAuth.validateAt) {
      throw new ApiUnauthorized('Usuário não autorizado');
    }

    return {
      id: userAuth.id,
      name: userAuth.name,
      email: userAuth.email,
      validateAt: userAuth.validateAt,
      createdAt: userAuth.createdAt,
    };
  }
}
