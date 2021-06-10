import express from "express";
import fetchUserDetails from "../controller/fetchUserDetails.js";
import updateUserDetails from "../controller/updateUserDetails.js";
import isUser from "../middleware/isAuth.js";

const router = express.Router();

router.get("/user-details", isUser, fetchUserDetails);

router.patch("/update-details", isUser, updateUserDetails);

export default router;
