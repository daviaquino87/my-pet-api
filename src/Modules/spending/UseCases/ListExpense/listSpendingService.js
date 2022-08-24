const { supabase } = require("../../../../database/Supabase");

class ListSpendingService {
  async listSpendingService(uuid) {
    const { data: spending, error } = await supabase
      .from("spending")
      .select("*")
      .eq("user_id", uuid);

    console.log(error);

    return spending;
  }
}

module.exports = { ListSpendingService };
