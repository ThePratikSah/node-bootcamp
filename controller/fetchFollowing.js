// import {Sequelize, QueryTypes} from "sequelize";
import pkg from "sequelize";
import conn from "../db/db-connect.js";
import dash from "../helpers/logger.js";
const { QueryTypes } = pkg;

const fetchFollowing = async (req, res) => {
  try {
    const following = await conn.query(
      "SELECT users.id, users.fullName, users.userName, users.profileImage FROM followers INNER JOIN users ON followers.userId = users.id WHERE followers.following = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [req.id],
      }
    );

    res.status(201).json({
      msg: "Following fetched successfully",
      following,
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchFollowing;
