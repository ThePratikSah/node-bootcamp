import pkg from "sequelize";
import conn from "../db/db-connect.js";
import dash from "../helpers/logger.js";
const { QueryTypes } = pkg;

const fetchfollowers = async (req, res) => {
  try {
    const followers = await conn.query(
      "SELECT users.id, users.fullName, users.userName, users.profileImage FROM followers INNER JOIN users ON followers.following = users.id WHERE followers.userId = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [req.id],
      }
    );
    res.status(201).json({
      msg: "Followers fetched successfully",
      followers,
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchfollowers;
