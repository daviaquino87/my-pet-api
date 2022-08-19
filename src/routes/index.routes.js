const express = require("express");

const routes = express.Router();

const routesSpendings = require("./spending.routes");
const routesUser = require("./user.routes");

routes.use(routesSpendings);
routes.use(routesUser);

module.exports = routes;
