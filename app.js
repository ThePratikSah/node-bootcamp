import cors from "cors";
import express from "express";
import { existsSync, mkdirSync } from "fs";
import multer from "multer";
import conn from "./db/db-connect.js";
import dash from "./helpers/logger.js";
import authRoutes from "./routes/auth.js";
import followRoutes from "./routes/follow.js";
import profileRoutes from "./routes/profile.js";
import tweetRoutes from "./routes/tweets.js";
// import cron from 'node-cron';

const app = express();

app.use(cors());

app.use(express.json());

//multer file storage
const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    let dir = `./img`;
    if (!existsSync(dir)) {
      mkdirSync(dir);
    }
    cb(null, dir);
  },
  filename: (req, file, cb) => {
    cb(
      null,
      new Date().toISOString().replace(/:/g, "-") + "-" + file.originalname
    );
  },
});

//multer file filter
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "image/jpeg"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

// multer configuration
app.use(
  multer({
    storage: fileStorage,
    fileFilter: fileFilter,
  }).single("image")
);

// cron.schedule("59 59 23 * * *", () => {

// });

app.use("/img", express.static("./img"));

app.use("/auth", authRoutes);

app.use("/tweet", tweetRoutes);

app.use("/profile", profileRoutes);

app.use("/follow", followRoutes);

conn
  .sync()
  .then(app.listen(3000, () => console.log("Server started")))
  .catch((e) => dash.error(`Error : ${e}`));
