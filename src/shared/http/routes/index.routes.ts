import express from "express";

import { usersRoutes } from "./user.routes";
import { authenticateRoutes } from "./authenticate.routes";
import { spendingsRoutes } from "./spendings.routes";

import { generatePdf } from "@/lib/pdfmaker";

export const indexRoutes = express();

indexRoutes.use(authenticateRoutes);
indexRoutes.use("/users", usersRoutes);
indexRoutes.use("/spendings", spendingsRoutes);
