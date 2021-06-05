import express from "express";
import conn from "./db/db-connect.js";
import dash from "./helpers/logger.js";
import authRoutes from "./routes/auth.js";

const app = express();

app.use(express.json());

app.use("/", authRoutes);

conn
  .sync()
  .then(app.listen(3000, () => console.log("Server started")))
  .catch((e) => dash.error(`Error : ${e}`));
