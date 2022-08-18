const { CreateSpendingService } = require("./createSpendingService");

class CreateSpendingController {
  async createSpending(request, response) {
  try {
      let { price,date } = request.body

      if (!date) {
        date = new Date();
      }
      const serviceCreate = new CreateSpendingService();
      const data = await serviceCreate.createSpending(price, date);

      return response.status(201).json(data);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { CreateSpendingController };
