import express from "express";

import { usersRoutes } from "./user.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { spendingsRoutes } from "./spendings.routes";

import { ensureAuthenticate } from "../middleware/ensure-authenticate";

export const indexRoutes = express();

indexRoutes.use(authenticateRoutes);

indexRoutes.use(ensureAuthenticate);
indexRoutes.use("/users", usersRoutes);
indexRoutes.use("/spendings", spendingsRoutes);
