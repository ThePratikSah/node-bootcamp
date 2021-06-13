import express from "express";
import downloadExcelOfFollowers from "../controller/downloadExcelOfFollowers.js";
import fetchfollowers from "../controller/fetchFollowers.js";
import fetchFollowing from "../controller/fetchFollowing.js";
import follow from "../controller/following.js";
import isUser from "../middleware/isAuth.js";

const router = express.Router();

router.post("/follow-user", isUser, follow);

router.get("/fetch-followers", isUser, fetchfollowers);

router.get("/fetch-following", isUser, fetchFollowing);

router.get("/download-followers", downloadExcelOfFollowers);

export default router;
