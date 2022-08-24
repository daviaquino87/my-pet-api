const { supabase } = require("../../../../database/Supabase");

class CreateSpendingService {
  async createSpending(price, date, user_id) {
    const data = await supabase.from("spending").insert({
      price,
      date,
      user_id,
    });
    return data;
  }
}

module.exports = { CreateSpendingService };
