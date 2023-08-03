import { IFindUserByEmail } from '@/modules/identification/interfaces/find-user-by-email.interface';
import { IUserProps } from '@/modules/identification/interfaces/user-props.interface';
import { AbstractUsersRepository } from '@/modules/identification/repositories/abstract.users.repository';

export class UsersRepository implements AbstractUsersRepository {
  public users: IUserProps[] = [];

  async create(user: IUserProps): Promise<void> {
    this.users.push(user);
  }

  async save(user: IUserProps): Promise<void> {
    const { id, ...data } = user;

    const existingUserIndex = this.users.findIndex(
      (item) => item.id === user.id,
    );

    if (existingUserIndex !== -1) {
      this.users[existingUserIndex] = { id, ...data };
    }
  }

  async findUserByEmail({ email }: IFindUserByEmail): Promise<IUserProps> {
    return this.users.find((user) => user.email === email);
  }
}
