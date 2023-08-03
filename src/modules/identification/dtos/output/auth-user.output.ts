export class AuthUserOutputDto {
  user: {
    id: string;
    name: string;
    email: string;
  };
  accessToken: string;
}
