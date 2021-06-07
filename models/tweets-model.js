import Sequelize from "sequelize";
import conn from "../db/db-connect.js";
import User from "./user-model.js";

const Tweets = conn.define("tweet", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  tweet: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  mediaUrl: {
    type: Sequelize.TEXT,
    allowNull: true,
  },  
  userId: {
    type: Sequelize.INTEGER,
    references: {
      model: User,
      key: "id",
    },
  },
});

export default Tweets;
