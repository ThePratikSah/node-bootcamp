// const express = require("express");  es5

// import express from "express";  ex6

import encrypt from "bcryptjs";
import express from "express";
import jwt from "jsonwebtoken";
import conn from "./db/db-connect.js";
import User from "./models/user-model.js";

const app = express();

app.use(express.json());

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({
      msg: "Empty fields",
    });
  }

  try {
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (user)
      return res.status(400).json({
        msg: "This email is already in use, please use another email",
      });

    const encryptedPassword = await encrypt.hash(password, 12);

    await User.create({
      email,
      password: encryptedPassword,
    });

    // send an email to the user for email verification
    res.status(201).json({
      msg: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    // check if the user exists in db or not
    const user = await User.findOne({
      where: {
        email,
      },
    });

    if (!user)
      return res.status(400).json({
        msg: "No user found",
      });

    // if exists, match the password and if valid, return a token
    const passwordFromDb = user.password;
    const profileImg = user.profileImage;

    const isPasswordMatched = await encrypt.compare(password, passwordFromDb);

    if (!isPasswordMatched)
      return res.status(400).json({
        msg: "Wrong password",
      });

    const token = jwt.sign(
      {
        email,
        profileImg,
      },
      "my-random-string-for-encoding",
      {
        expiresIn: "30000",
      }
    );

    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
  }
});

conn
  .sync()
  .then(app.listen(3000, () => console.log("Server started")))
  .catch((e) => console.log(e));
