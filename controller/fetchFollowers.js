import dash from "../helpers/logger.js";
import Followers from "../models/followers-model.js";

const fetchfollowers = async (req, res) => {
  try {
    
    res.status(201).json({
      msg: "Followed successfully",
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchfollowers;
