const { supabase } = require("../../database/Supabase");

class BalanceSpendigService {
  async balanceService() {
    const { data: spendings, error } = await supabase
      .from("spending")
      .select("*");

    const values = [];

    const sprice = spendings.map((spending) => {
      values.push(spending.price);
    });

    var soma = values
      .reduce(function (soma, i) {
        return soma + i;
      }, 0)
      .toFixed(2);

    return soma;
  }
}

module.exports = { BalanceSpendigService };
