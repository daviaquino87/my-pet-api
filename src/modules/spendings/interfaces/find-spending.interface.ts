export interface IFindSpending {
  userId: string;
  page: number;
  take: number;
}

export interface IFindOneSpending {
  userId: string;
  spendingId: string;
}
