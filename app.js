// const express = require("express");  es5

// import express from "express";  ex6

import axios from "axios";
import dotenv from "dotenv";
import express from "express";

const app = express();
dotenv.config();

app.use(express.json());
app.use((req, res, next) => {
  console.log("Checking the key");
});

app.get("/weather/:key/:city", async (req, res) => {
  const city = req.params.city;

  axios
    .get(
      `http://api.weatherapi.com/v1/current.json?key=${process.env.API_KEY}&q=${city}`
    )
    .then((response) =>
      res.json({
        data: response.data,
      })
    );
});

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  res.send(`${email} and ${password}`);
});

app.listen(3000);
