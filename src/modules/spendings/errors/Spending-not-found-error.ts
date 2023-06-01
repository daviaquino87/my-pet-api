export class SpendingNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Gasto não encontrado.";
  }
}
