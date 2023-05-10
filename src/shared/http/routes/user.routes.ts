import express from "express";

import { FindBalanceController } from "../controllers/find-balance-controller/find-balance-controller";
import { ensureAuthenticate } from "../middleware/ensure-authenticate";

const findBalanceController = new FindBalanceController();

export const usersRoutes = express();
usersRoutes.use(ensureAuthenticate);
usersRoutes.get("/balance", findBalanceController.handle);
