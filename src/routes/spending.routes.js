const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  CreateSpendingController,
} = require("../controller/createSpencing/createSpendingController");
const { supabase } = require("../database/Supabase");

const create = new CreateSpendingController();

routes.use(express.json());

routes.post("/spending", create.createSpening);

routes.get("/reports", async (request, response) => {
  const { data: spending, error } = await supabase.from("spending").select("*");
  console.table(spending);
  return response.status(200).json(spending);
});

routes.get("/balance", async (request, response) => {
  const { data: spendings, error } = await supabase
    .from("spending")
    .select("*");

  const values = [];

  const sprice = spendings.map((spending) => {
    return values.push(spending.price);
  });

  var soma = values
    .reduce(function (soma, i) {
      return soma + i;
    }, 0)
    .toFixed(2);

  return response.status(200).json({ soma: Number(soma) });
});

module.exports = routes;
