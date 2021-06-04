import Sequelize from "sequelize";

const conn = new Sequelize("node_bootcamp", "root", "", {
  dialect: "mysql",
  hostname: "localhost",
  logging: false,
});

export default conn;
