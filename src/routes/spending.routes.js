const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  CreateSpendingController,
} = require("../Modules/spending/UseCases/CreateExpense/createSpendingController");

const {
  ListSpendingController,
} = require("../Modules/spending/UseCases/ListExpense/listSpendingController");

const {
  BalancespendingController,
} = require("../Modules/spending/UseCases/SeeBalance/balanceSpendingController");

const {
  DeleteSpending,
} = require("../Modules/spending/UseCases/DeleteSpending/deleteSpendingController");

const { supabase } = require("../database/Supabase");
const { Router } = require("express");

const create = new CreateSpendingController();
const list = new ListSpendingController();
const balance = new BalancespendingController();
const deletes = new DeleteSpending();

routes.post("/spending", create.createSpending);

routes.get("/reports", list.listSpending);

routes.get("/balance", balance.balanceSpending);

routes.delete("/spending/:id", deletes.DeleteSpending);

module.exports = routes;
