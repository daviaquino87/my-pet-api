const { BalanceSpendigService } = require("./balanceSpendingService");

class BalanceSpendigController {
  async balanceSpendig(request, response) {
    try {
      const balanceService = new BalanceSpendigService();

      const values = await balanceService.balanceService();

      return response.status(200).json(values);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { BalanceSpendigController };
