const express = require("express");
const app = express();
const routes = require("./routes/spending.routes");

app.use(routes);
app.use(express.json())

app.listen(process.env.PORT || 3000, () => {
  console.log("app on");
});
