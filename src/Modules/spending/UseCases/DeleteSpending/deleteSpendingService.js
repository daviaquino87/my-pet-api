const { supabase } = require("../../../../database/Supabase");

class DeleteSpendingService {
  async deleteSpending(id) {
    const { data: spending, error } = await supabase
      .from("spending")
      .delete()
      .match({ id });

    console.log(spending);
    return spending;
  }
}

module.exports = { DeleteSpendingService };
