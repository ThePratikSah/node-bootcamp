import jwt from "jsonwebtoken";
import dash from "../helpers/logger.js";
import Tweets from "../models/tweets-model.js";
import User from "../models/user-model.js";

const fetchTweet = async (req, res) => {
  try {
    const { token } = req.body;

    if (!token) {
      return res.status(404).json({
        msg: "Empty fields",
      });
    }

    const { id } = jwt.verify(token, "my-random-string-for-encoding");

    if (!id) {
      return res.status(404).json({
        msg: "Token invalid",
      });
    }

    User.hasMany(Tweets);
    Tweets.belongsTo(User);

    const tweets = await Tweets.findAll({
      where: {
        userId: id,
      },
      include: [User],
    });

    res.status(200).json({
      msg: "Your tweets",
      tweets,
    });
  } catch (error) {
    dash.error(error);
  }
};

export default fetchTweet;
