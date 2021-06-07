import encrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dash from "../helpers/logger.js";
import User from "../models/user-model.js";

const resetPassword = async (req, res) => {
  try {
    const { token, oldPassword, newPassword } = req.body;

    if (!token || !oldPassword || !newPassword) {
      return res.status(404).json({
        msg: "Please check for empty fields",
      });
    }

    const { email } = jwt.verify(token, "my-random-string-for-encoding");

    if (!email) {
      return res.status(404).json({
        msg: "Token invalid",
      });
    }

    const user = await User.findOne({
      where: {
        email,
      },
    });

    const isMatched = await encrypt.compare(oldPassword, user.password);

    if (!isMatched) {
      return res.status(404).json({
        msg: "Your old password is incorrect",
      });
    }

    const hashedPassword = await encrypt.hash(newPassword, 12);

    await User.update(
      {
        password: hashedPassword,
      },
      {
        where: {
          email,
        },
      }
    );

    return res.status(201).json({
      msg: "Your password was changed successfully",
    });
  } catch (error) {
    dash.error(`Error : ${error}, Request : ${req.originalUrl}`);
  }
};

export default resetPassword;
