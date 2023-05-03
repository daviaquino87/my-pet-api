import { env } from "process";
import { app } from "@/lib/express";

app.listen(env.PORT, () => {
  console.log("application running 🚀");
});
