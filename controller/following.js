import dash from "../helpers/logger.js";
import Followers from "../models/followers-model.js";

const follow = async (req, res) => {
  try {
    const { followerId } = req.body;

    if (!followerId) {
      return res.status(404).json({
        msg: "User not found",
      });
    }

    await Followers.create({
      userId: req.id,
      following: followerId,
    });

    res.status(201).json({
      msg: "Followed successfully",
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default follow;
