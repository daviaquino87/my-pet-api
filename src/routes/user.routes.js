const express = require("express");
const { supabase } = require("../database/Supabase");
const {
  CreateUserController,
} = require("../Modules/user/UseCases/CreateUser/createUserControlle");
const routes = express.Router();

const create = new CreateUserController();

routes.post("/register", create.createUser);

module.exports = routes;
