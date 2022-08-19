const { DeleteSpendingService } = require("./deleteSpendingService");

class DeleteSpending {
  async DeleteSpending(request, response) {
    try {
      const { id } = request.params;
      const deleteSpening = new DeleteSpendingService();
      deleteSpening.deleteSpending(id);

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
