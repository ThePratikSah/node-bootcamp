import express from "express";
import createTweet from "../controller/createTweet.js";
import fetchTweet from "../controller/fetchTweet.js";

const router = express.Router();

router.post("/fetch-tweets", fetchTweet);

router.post("/new-tweet", createTweet);

export default router;
