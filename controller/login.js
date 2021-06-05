import encrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dash from "../helpers/logger.js";
import User from "../models/user-model.js";

const login = async (req, res) => {
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
    dash.error(`Error : ${error}, Request : ${req.originalUrl}`);
  }
};

export default login;
