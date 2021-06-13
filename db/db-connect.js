import dotenv from "dotenv";
import Sequelize from "sequelize";
dotenv.config();

const dbConnectionURL = process.env.JAWSDB_URL;

let conn;

if (process.env.NODE_ENV === "DEV") {
  conn = new Sequelize("node_bootcamp", "root", "", {
    dialect: "mysql",
    hostname: "localhost",
    logging: false,
  });
} else {
  conn = new Sequelize(dbConnectionURL, {
    dialect: "mysql",
    hostname: "localhost",
    logging: false,
  });
}

export default conn;
