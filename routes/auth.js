import express from "express";
import login from "../controller/login.js";
import register from "../controller/register.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

export default router;
