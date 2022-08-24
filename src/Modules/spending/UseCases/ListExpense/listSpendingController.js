const { jwtDecode } = require("../../../../utils/jwtDecode");
const { ListSpendingService } = require("./listSpendingService");

class ListSpendingController {
  async listSpending(request, response) {
    try {
      const uuid = jwtDecode(request.headers.authorization).sub;

      const listSpendingService = new ListSpendingService();

      const spending = await listSpendingService.listSpendingService(uuid);

      return response.status(200).json(spending);
    } catch (err) {
      return response.status(400).json(err);
    }
  }
}

module.exports = { ListSpendingController };
