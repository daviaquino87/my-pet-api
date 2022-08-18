const express = require("express");
const app = express();
const routes = require("./routes/spending.routes");
const cors = require("cors");

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(process.env.PORT || 3000, () => {
  console.log("app on");
});
