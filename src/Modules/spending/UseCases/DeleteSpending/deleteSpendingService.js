const { supabase } = require("../../../../database/Supabase");

class DeleteSpendingService {
  async deleteSpending(id, uuid) {
    const { data, error } = await supabase
      .from("spending")
      .delete()
      .eq("user_id", uuid)
      .match({ id });

    return data;
  }
}

module.exports = { DeleteSpendingService };
