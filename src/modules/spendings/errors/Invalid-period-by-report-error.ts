export class InvalidPeriodByReportError extends Error {
  constructor() {
    super();
    this.message = "Despesas não encontradas para o período selecionado.";;
  }
}
