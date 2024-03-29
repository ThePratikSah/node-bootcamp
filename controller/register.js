import encrypt from "bcryptjs";
import { randomBytes } from "crypto";
import dash from "../helpers/logger.js";
import sendMail from "../helpers/send-mail.js";
import User from "../models/user-model.js";

const register = async (req, res) => {
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

    const randomUserName = email.split("@")[0] + randomBytes(4).toString("hex");

    await User.create({
      userName: randomUserName,
      email,
      password: encryptedPassword,
    });

    // send an email to the user for email verification
    res.status(201).json({
      msg: "Registered successfully",
    });
  } catch (error) {
    console.log(error);
    dash.error(`Error : ${error}, Request : ${req.originalUrl}`);
  }
};

export default register;
