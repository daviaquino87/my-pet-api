import { randomUUID } from 'node:crypto';

import { IUserProps } from '@/modules/identification/interfaces/user-props.interface';

export class User implements IUserProps {
  id = randomUUID();
  name = '';
  email = '';
  passwordHash = '';
  validateAt = null;
  createdAt = new Date();

  constructor(props: IUserProps) {
    Object.assign(this, props);
  }

  validate() {
    this.validateAt = new Date();
  }
}
