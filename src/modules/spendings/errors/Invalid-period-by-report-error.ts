export class InvalidPeriodByReportError extends Error {
  constructor() {
    super();
    this.message = "Expenses not found for the selected period.";
  }
}
