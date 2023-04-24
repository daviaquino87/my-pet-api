import express from "express";

import { RegisterUserController } from "@/shared/http/controllers/register-controller/register-user-controller";
import { AuthenticateUserController } from "@/shared/http/controllers/authenticate-controller/authenticate-user-controller";

const registerUserController = new RegisterUserController();
const authenticateUserController = new AuthenticateUserController();

export const authenticateRoutes = express();

authenticateRoutes.post("/register", registerUserController.handle);
authenticateRoutes.post("/session", authenticateUserController.handle);
