const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  CreateSpendingController,
} = require("../UseCases/CreateExpense/createSpendingController");

const {
  ListSpendingController,
} = require("../UseCases/ListExpense/listSpendingController");

const {
  BalancespendingController,
} = require("../UseCases/SeeBalance/balanceSpendingController");

const {
  DeleteSpending,
} = require("../UseCases/DeleteSpending/deleteSpendingController");

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
