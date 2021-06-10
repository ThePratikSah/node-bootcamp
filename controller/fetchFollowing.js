// import {Sequelize, QueryTypes} from "sequelize";
import dash from "../helpers/logger.js";

const fetchFollowing = async (req, res) => {
  try {

    // const following = await Sequelize.query(
    //   "SELECT users.fullName, users.userName, users.profileImage FROM followers INNER JOIN users ON followers.following = users.id WHERE followers.userId = ?",
    //   {
    //     type: QueryTypes.SELECT,
    //     replacements: [req.id],
    //   }
    // );

    res.status(201).json({
      msg: "Followed successfully",
      following,
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchFollowing;
