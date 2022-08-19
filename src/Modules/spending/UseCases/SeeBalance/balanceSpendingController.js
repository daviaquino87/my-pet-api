const { BalanceSpendingService } = require("./balanceSpendingService");

class BalancespendingController {
  async balanceSpending(request, response) {
    try {
      const balanceService = new BalanceSpendingService();

      const values = await balanceService.balanceService();

      return response.status(200).json(values);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { BalancespendingController };
