const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

routes.use(express.json())

const {
  CreateSpendingController,
} = require("../UseCases/CreateExpense/createSpendingController");

const {
  ListSpendingController,
} = require("../UseCases/ListExpense/listSpendingController");

const {
  BalancespendingController,
} = require("../UseCases/SeeBalance/balanceSpendingController");

const { supabase } = require("../database/Supabase");

const create = new CreateSpendingController();
const list = new ListSpendingController();
const balance = new BalancespendingController();

routes.post("/spending", create.createSpending);

routes.get("/reports", list.listSpending);

routes.get("/balance", balance.balanceSpending);

module.exports = routes;
