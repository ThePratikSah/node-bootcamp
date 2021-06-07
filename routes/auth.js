import express from "express";
import login from "../controller/login.js";
import register from "../controller/register.js";
import resetPassword from "../controller/resetPassword.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.patch("/reset-password", resetPassword);

export default router;
