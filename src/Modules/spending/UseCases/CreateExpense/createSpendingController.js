const { jwtDecode } = require("../../../../utils/jwtDecode");

const { CreateSpendingService } = require("./createSpendingService");

class CreateSpendingController {
  async createSpending(request, response) {
    try {
      let { price, date } = request.body;

      const uuid = jwtDecode(request.headers.authorization).sub;

      if (!date) {
        date = new Date();
      }
      const serviceCreate = new CreateSpendingService();
      const data = await serviceCreate.createSpending(price, date, uuid);

      return response.status(201).json(data);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { CreateSpendingController };
