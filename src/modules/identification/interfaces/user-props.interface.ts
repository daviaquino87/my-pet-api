export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  validateAt?: Date;
  createdAt?: Date;
}
