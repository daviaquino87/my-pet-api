export class UnauthorizedError extends Error {
  constructor() {
    super();
    this.message = "Sem autorização.";
  }
}
