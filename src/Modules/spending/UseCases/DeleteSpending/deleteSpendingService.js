const { supabase } = require("../../../../database/Supabase");

class DeleteSpendingService {
  async deleteSpending(id, uuid) {
    const { data: spending, error } = await supabase
      .from("spending")
      .delete()
      .eq("user_id", uuid)
      .match({ id });
    console.log("error", error);
    console.log("spending", spendings);

    const data = {
      spending,
      error,
    };

    return data;
  }
}

module.exports = { DeleteSpendingService };
