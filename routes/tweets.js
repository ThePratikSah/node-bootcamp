import express from "express";
import createTweet from "../controller/createTweet.js";
import fetchTweet from "../controller/fetchTweet.js";
import isUser from "../middleware/isAuth.js";

const router = express.Router();

router.post("/fetch-tweets/", isUser, fetchTweet);

router.post("/new-tweet", isUser, createTweet);

export default router;
