const { supabase } = require("../../database/Supabase");

class ListSpendingService {
  async listSpendingService() {
    const { data: spending, error } = await supabase
      .from("spending")
      .select("*");

    return spending;
  }
}

module.exports = { ListSpendingService };
