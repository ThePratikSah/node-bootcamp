import dash from "../helpers/logger.js";
import User from "../models/user-model.js";

const fetchUserDetails = async (req, res) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.id,
      },
      attributes: {
        exclude: ["password"],
      },
    });

    res.status(200).json({
      msg: "user details fetched",
      user,
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchUserDetails;
