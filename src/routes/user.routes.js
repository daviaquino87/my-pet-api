const express = require("express");
const { supabase } = require("../database/Supabase");
const routes = express.Router();

routes.post("/user", async (request, response) => {
  const { email, pass } = request.body;

  let { user, error } = await supabase.auth.signUp({
    email: email,
    password: pass,
  });

  response.json({
    status: "ok",
    user,
    error,
  });
});

module.exports = routes;
