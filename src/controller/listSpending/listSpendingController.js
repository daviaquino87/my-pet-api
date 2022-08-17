const { ListSpendingService } = require("./listSpendingService");

class ListSpendingController {
  async listSpending(request, response) {
    try {
      const listSpendingService = new ListSpendingService();

      const spending = await listSpendingService.listSpendingService();

      return response.status(200).json(spending);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { ListSpendingController };
