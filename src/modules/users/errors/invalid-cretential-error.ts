export class InvalidCredentialsError extends Error {
  constructor() {
    super();
    this.message = "Credenciais inválidas";
  }
}
