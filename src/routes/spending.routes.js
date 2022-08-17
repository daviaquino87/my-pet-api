const express = require("express");
const routes = express.Router();
const { v4: uuidv4 } = require("uuid");

const {
  CreateSpendingController,
} = require("../controller/createSpencing/createSpendingController");
const {
  ListSpendingController,
} = require("../controller/listSpending/listSpendingController");

const {
  BalanceSpendigController,
} = require("../controller/viewBalance/balanceSpendingController");

const { supabase } = require("../database/Supabase");

const create = new CreateSpendingController();
const list = new ListSpendingController();
const balance = new BalanceSpendigController();

routes.post("/spending", create.createSpening);

routes.get("/reports", list.listSpending);

routes.get("/balance", balance.balanceSpendig);

module.exports = routes;
