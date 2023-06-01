export class InvalidEmailError extends Error {
  constructor() {
    super();
    this.message = "Email inválido.";
  }
}
