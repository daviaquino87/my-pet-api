import { IFindUserByEmail } from '@/modules/identification/interfaces/find-user-by-email.interface';
import { IUserProps } from '@/modules/identification/interfaces/user-props.interface';

export abstract class AbstractUsersRepository {
  abstract create(user: IUserProps): Promise<void>;
  abstract save(user: IUserProps): Promise<void>;
  abstract findUserByEmail({ email }: IFindUserByEmail): Promise<IUserProps>;
}
