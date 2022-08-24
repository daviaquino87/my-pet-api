const express = require("express");
const { supabase } = require("../database/Supabase");
const { Autorization } = require("../middleware/autorization");
const routes = express.Router();

const {
  CreateUserController,
} = require("../Modules/user/UseCases/CreateUser/createUserControlle");

const {
  AutenticateUserController,
} = require("../Modules/user/UseCases/Auth/authController");

const {
  LogoutUserControll,
} = require("../Modules/user/UseCases/logout/logoutUserControll");

const create = new CreateUserController();
const auth = new AutenticateUserController();
const logout = new LogoutUserControll();

routes.post("/register", create.createUser);
routes.post("/autenticate", auth.authUsuer);
routes.post("/logout", Autorization, logout.logoutUser);

module.exports = routes;
