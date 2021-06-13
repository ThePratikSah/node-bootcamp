import dash from "../helpers/logger.js";
import Tweets from "../models/tweets-model.js";

const createTweet = async (req, res) => {
  try {
    const imageFile = req.file;
    let filePath = "";

    if (!imageFile) filePath = "";
    else filePath = imageFile.path;

    const { tweet } = req.body;

    if (!tweet) {
      return res.status(404).json({
        msg: "Empty field",
      });
    }

    await Tweets.create({
      tweet,
      imageUrl: filePath,
      userId: req.id,
    });

    res.status(201).json({
      msg: "Your tweet is live now",
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default createTweet;
