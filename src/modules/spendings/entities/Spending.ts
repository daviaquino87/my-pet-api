import { randomUUID } from 'node:crypto';

import { ISpendingProps } from '@/modules/spendings/interfaces/spending-props.interface';

export class Spending implements ISpendingProps {
  id = randomUUID();
  purchaseDate = new Date();
  value = 0;
  userId = '';
  createdAt = new Date();

  constructor(props: ISpendingProps) {
    Object.assign(this, props);
  }
}
