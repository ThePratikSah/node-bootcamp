import nodemailer from "nodemailer";
import dash from "./logger.js";

const sendMail = async (email, subject, msg) => {
  try {

    let testAccount = await nodemailer.createTestAccount();

    const transporter = nodemailer.createTransport({
      host: "smtp-relay.sendinblue.com",
      port: 587,
      auth: {
        user: "shivam3448@gmail.com",
        pass: "WH0NaDqYfXQ2K3rm",
      },
    });

    await transporter.sendMail({
      from: "shivam3448@gmail.com",
      to: email,
      subject,
      text: msg,
    });
  } catch (e) {
    console.log(e);
    dash.error(`Error: ${e}, while sending mail`);
  }
};

export default sendMail;
