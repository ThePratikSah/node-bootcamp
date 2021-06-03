// const express = require("express");  es5

// import express from "express";  ex6

import axios from "axios";
import encrypt from "bcryptjs";
import express from "express";

const app = express();

const users = [];

app.use(express.json());

const API_KEY = "your api here";

app.get("/weather/:key/:city", async (req, res) => {
  const city = req.params.city;
  const key = req.params.key;

  if (key.toString() === "mySecretkey") {
    try {
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}`
      );

      const capital = response.data.location.region;

      res.json({
        data: response.data,
        capital,
      });
    } catch (error) {
      res.json({
        data: {},
        err: "Something went wrong",
        errMsg: error.message,
        statusCode: error.response.status,
      });
    }
  } else {
    res.status(401).json({
      msg: "Please provide an API key for this route",
    });
  }
});

app.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(404).json({
      msg: "Empty fields"
    })
  }

  const encryptedPassword = await encrypt.hash(password, 12);

  users.push({
    email,
    password: encryptedPassword,
  });

  res.status(201).json({
    msg: "Registered successfully",
  });

  console.log(users);
});

app.post("/reset-password", async (req, res) => {
  const { email, password, newPassword } = req.body;

  for (let i = 0; i < users.length; i++) {
    if (users[i].email === email) {
      if (await encrypt.compare(password, users[i].password)) {
        res.status(201).json({
          msg: "Your password was changed successfully",
        });
      } else {
        res.status(500).json({
          msg: "Your password don't match from DB",
        });
      }
    }
  }
});

app.listen(3000);
