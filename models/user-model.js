import Sequelize from "sequelize";
import conn from "../db/db-connect.js";

const User = conn.define("user", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  fullName: {
    type: Sequelize.STRING,
    allowNull: true,
  },
  userName: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  password: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  profileImage: {
    type: Sequelize.TEXT,
    allowNull: true,
  },
});

export default User;
