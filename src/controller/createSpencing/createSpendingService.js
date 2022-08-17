const { supabase } = require("../../database/Supabase");

class CreateSpendingService {
  async createSpening(price, date) {
    const data = await supabase.from("spending").insert({
      price,
      date,
    });
    return data;
  }
}

module.exports = { CreateSpendingService };
