import { IDeleteSpending } from '@/modules/spendings/interfaces/delete-spending.interface';
import { IFindOneSpending, IFindSpending } from '@/modules/spendings/interfaces/find-spending.interface';
import { ISpendingProps } from '@/modules/spendings/interfaces/spending-props.interface';

export abstract class AbstractSpendingsRepository {
  abstract create(spending: ISpendingProps): Promise<void>;
  abstract find(data: IFindSpending): Promise<ISpendingProps[]>;
  abstract findOne(data: IFindOneSpending): Promise<ISpendingProps>;
  abstract save(spending: ISpendingProps): Promise<void>;
  abstract delete({ spendingId }: IDeleteSpending): Promise<void>;
}
