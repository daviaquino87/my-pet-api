import express from "express";

import { authenticateRoutes } from "./authenticate.routes";
import { spendingsRoutes } from "./spendings.routes";
import { usersRoutes } from "./user.routes";

export const indexRoutes = express();

indexRoutes.use(authenticateRoutes);
indexRoutes.use("/users", usersRoutes);
indexRoutes.use("/spendings", spendingsRoutes);
