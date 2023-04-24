import "express-async-errors";
import "dotenv/config";

import { env } from "process";
import { app } from "@/lib/express";

import { indexRoutes } from "@/shared/http/routes/index.routes";
import { validadeError } from "./middleware/validate-error";
import { verifyRouteNotFound } from "./middleware/verify-route-not-found";

app.use(indexRoutes);

app.use(verifyRouteNotFound);
app.use(validadeError);

app.listen(env.PORT, () => {
  console.log("application running 🚀");
});
