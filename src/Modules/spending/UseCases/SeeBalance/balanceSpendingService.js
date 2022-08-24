const { supabase } = require("../../../../database/Supabase");

class BalanceSpendingService {
  async balanceService(uuid) {
    const { data: spendings, error } = await supabase
      .from("spending")
      .select("*")
      .eq("user_id", uuid);

    const values = [];
    let somValues = 0;

    const sprice = spendings.map((spending) => {
      values.push(spending.price);
    });

    let sumWithvalues = values.reduce(
      (previousValue, currentValue) => previousValue + currentValue,
      somValues
    );

    return sumWithvalues;
  }
}

module.exports = { BalanceSpendingService };
