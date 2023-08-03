export interface IUserProps {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  accessCodeHash: string;
  validateAt?: Date;
  createdAt?: Date;
}
