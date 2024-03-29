import jwt from "jsonwebtoken";
import dash from "../helpers/logger.js";
import User from "../models/user-model.js";

const isUser = async (req, res, next) => {
  const authHeader = req.get("authorization");

  try {
    if (!authHeader) {
      return res.status(401).json({
        msg: "Not authorized",
      });
    }

    const token = authHeader.split(" ")[1];

    let tokenData;

    try {
      tokenData = jwt.verify(token, "my-random-string-for-encoding");
    } catch (error) {
      return res.status(401).json({
        msg: "Token expired",
      });
    }

    const { id } = tokenData;

    if (!id) {
      return res.status(401).json({
        msg: "Invalid token",
      });
    }

    const user = await User.findOne({
      where: {
        id,
      },
    });

    if (!user) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    req.id = user.id;
    req.email = user.email;

    next();
  } catch (error) {
    dash.error(error.message);
  }
};

export default isUser;
