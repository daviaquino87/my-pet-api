const { jwtDecode } = require("../../../../utils/jwtDecode");
const { DeleteSpendingService } = require("./deleteSpendingService");

class DeleteSpending {
  async DeleteSpending(request, response) {
    try {
      const { id } = request.params;
      const uuid = jwtDecode(request.headers.authorization).sub;

      const deleteSpening = new DeleteSpendingService();

      if (isNaN(id)) {
        return response.status(400).json({ msg: "purchase not found!" });
      }

      const data = await deleteSpening.deleteSpending(id, uuid);

      if (!data.length || data == null) {
        return response.status(400).json({ msg: "purchase not found!" });
      }

      return response.status(201).json({ msg: "Deletede sucefull" });
    } catch {
      (err) => {
        console.log(err);
        return response.status(400).json({ msg: err });
      };
    }
  }
}

module.exports = { DeleteSpending };
