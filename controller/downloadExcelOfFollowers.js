import excel from "exceljs";
import pkg from "sequelize";
import conn from "../db/db-connect.js";
const { QueryTypes } = pkg;

const downloadExcelOfFollowers = async (req, res) => {
  const followers = await conn.query(
    "SELECT users.id, users.fullName, users.userName, users.profileImage FROM followers INNER JOIN users ON followers.following = users.id WHERE followers.userId = ?",
    {
      type: QueryTypes.SELECT,
      replacements: [1],
    }
  );

  let workbook = new excel.Workbook();
  let worksheet = workbook.addWorksheet("Users");
  worksheet.columns = [
    {
      header: "Id",
      key: "id",
      width: 30,
    },
    {
      header: "User name",
      key: "userName",
      width: 30,
    },
  ];

  const fileName = new Date().getTime();

  worksheet.addRows(followers);

  await workbook.xlsx.writeFile(`sheets/${fileName}.xlsx`);
  res.download("sheets/" + fileName + ".xlsx");
};

export default downloadExcelOfFollowers;
