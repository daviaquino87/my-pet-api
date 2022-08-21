const express = require("express");
const { supabase } = require("../database/Supabase");
const routes = express.Router();

const {
  CreateUserController,
} = require("../Modules/user/UseCases/CreateUser/createUserControlle");

const {
  AutenticateUserController,
} = require("../Modules/user/UseCases/Auth/authController");

const create = new CreateUserController();
const auth = new AutenticateUserController();

routes.post("/register", create.createUser);
routes.get("/autenticate", auth.authUsuer);

module.exports = routes;
