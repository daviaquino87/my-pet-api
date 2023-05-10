import express from "express";

import { CreateSpendingController } from "@/shared/http/controllers/create-spending-controller/create-spending-controller";
import { ListSpendingsController } from "../controllers/list-spendings-controller/list-spendings-controller";
import { DeleteSpendingController } from "../controllers/delete-spending-controller/delete-spending-controller";
import { UpdateSpendingController } from "../controllers/update-spending-controller/update-spending-controller";
import { GenerateReportController } from "../controllers/generate-report-controller/generate-report-controller";
import { ensureAuthenticate } from "../middleware/ensure-authenticate";

const createSpendingController = new CreateSpendingController();
const listSpendingsController = new ListSpendingsController();
const updateSpendingController = new UpdateSpendingController();
const deleteSpendingController = new DeleteSpendingController();
const generateReportController = new GenerateReportController();

export const spendingsRoutes = express();

spendingsRoutes.use(ensureAuthenticate);
spendingsRoutes.post("/", createSpendingController.handle);
spendingsRoutes.get("/", listSpendingsController.handle);
spendingsRoutes.get("/report", generateReportController.handle);
spendingsRoutes.put("/update/:spendingId", updateSpendingController.handle);
spendingsRoutes.delete("/delete/:spendingId", deleteSpendingController.handle);
