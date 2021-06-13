import dash from "../helpers/logger.js";
import Tweets from "../models/tweets-model.js";
import User from "../models/user-model.js";

const fetchTweet = async (req, res) => {
  const { offset } = req.body;
  try {
    User.hasMany(Tweets);
    Tweets.belongsTo(User);

    const tweets = await Tweets.findAll({
      where: {
        userId: req.id,
      },
      include: [
        {
          model: User,
          attributes: {
            exclude: ["password"],
          },
        },
      ],
      offset,
      limit: 50,
    });

    res.status(200).json({
      msg: "Your tweets",
      tweets,
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchTweet;
