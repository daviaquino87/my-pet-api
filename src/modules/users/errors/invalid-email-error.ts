export class InvalidEmailError extends Error {
  constructor() {
    super();
    this.message = "Invalid Email.";
  }
}
