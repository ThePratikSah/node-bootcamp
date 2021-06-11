// import {Sequelize, QueryTypes} from "sequelize";
import dash from "../helpers/logger.js";
import pkg from 'sequelize'
const { QueryTypes } = pkg;
import conn from '../db/db-connect.js'

const fetchFollowing = async (req, res) => {
  try {

    const following = await conn.query(
      "SELECT users.fullName, users.userName, users.profileImage FROM followers INNER JOIN users ON followers.following = users.id WHERE followers.userId = ?",
      {
        type: QueryTypes.SELECT,
        replacements: [req.id],
      }
    );

    res.status(201).json({
      msg: "Followed successfully",
      following,
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default fetchFollowing;
