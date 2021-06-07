import express from "express";
import conn from "./db/db-connect.js";
import dash from "./helpers/logger.js";
import authRoutes from "./routes/auth.js";
import tweetRoutes from "./routes/tweets.js";

const app = express();

app.use(express.json());

app.use("/auth", authRoutes);

app.use("/tweet", tweetRoutes);

conn
  .sync()
  .then(app.listen(3000, () => console.log("Server started")))
  .catch((e) => dash.error(`Error : ${e}`));
