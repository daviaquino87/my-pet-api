export interface IAuthenticatedUser {
  id: string;
  name: string;
  email: string;
  validateAt: Date | null;
  createdAt: Date;
}
