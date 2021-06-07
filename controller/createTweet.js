import dash from "../helpers/logger.js";
import Tweets from "../models/tweets-model.js";
import jwt from 'jsonwebtoken'

const createTweet = async (req, res) => {
  try {
    const { token, tweet } = req.body;

    if (!token || !tweet) {
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

    await Tweets.create({
      tweet,
      userId: id,
    });

    res.status(201).json({
      msg: "Your tweet is live now",
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default createTweet;
