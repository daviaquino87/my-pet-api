import "dotenv/config";
import "express-async-errors";
import cors from "cors";

import express from "express";

import { indexRoutes } from "@/shared/http/routes/index.routes";
import { validadeError } from "@/shared/http/middleware/validate-error";
import { verifyRouteNotFound } from "@/shared/http/middleware/verify-route-not-found";

export const app = express();
app.use(cors());
app.use(express.json());

app.use(indexRoutes);

app.use(verifyRouteNotFound);
app.use(validadeError);
