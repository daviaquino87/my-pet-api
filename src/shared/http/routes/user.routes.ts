import express from "express";

import { FindBalanceController } from "../controllers/find-balance-controller/find-balance-controller";

const findBalanceController = new FindBalanceController();

export const usersRoutes = express();

usersRoutes.get("/balance", findBalanceController.handle);
