import express from "express";

import { CreateSpendingController } from "@/shared/http/controllers/create-spending-controller/create-spending-controller";
import { ListSpendingsController } from "../controllers/list-spendings-controller/list-spendings-use-case";
import { DeleteSpendingController } from "../controllers/delete-spending-controller/delete-spending-controller";
import { UpdateSpendingController } from "../controllers/update-spending-controller/update-spending-controller";

const createSpendingController = new CreateSpendingController();
const listSpendingsController = new ListSpendingsController();
const updateSpendingController = new UpdateSpendingController();
const deleteSpendingController = new DeleteSpendingController();

export const spendingsRoutes = express();

spendingsRoutes.post("/", createSpendingController.handle);
spendingsRoutes.get("/", listSpendingsController.handle);
spendingsRoutes.put("/update/:spendingId", updateSpendingController.handle);
spendingsRoutes.delete("/delete/:spendingId", deleteSpendingController.handle);
