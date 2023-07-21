export class PendingValidationError extends Error {
  constructor() {
    super();
    this.message = "Validação inicial pendente";
  }
}
