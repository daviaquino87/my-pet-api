const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  CreateSpendingController,
} = require("../controller/CreateExpense/createSpendingController");

const {
  ListSpendingController,
} = require("../controller/ListExpense/listSpendingController");

const {
  BalancespendingController,
} = require("../controller/SeeBalance/balanceSpendingController");

const { supabase } = require("../database/Supabase");

const create = new CreateSpendingController();
const list = new ListSpendingController();
const balance = new BalancespendingController();

routes.post("/spending", create.createSpending);

routes.get("/reports", list.listSpending);

routes.get("/balance", balance.balanceSpending);

module.exports = routes;
