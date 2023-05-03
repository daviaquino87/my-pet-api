export class SpendingNotFoundError extends Error {
  constructor() {
    super();
    this.message = "Spending not found.";
  }
}
