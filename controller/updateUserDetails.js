import dash from "../helpers/logger.js";
import User from "../models/user-model.js";

const updateUserDetails = async (req, res) => {
  try {
    const imageFile = req.file;
    let filePath = "";

    if (!imageFile) {
      return res.status(404).json({
        msg: "Please choose a valid file",
      });
    }

    filePath = imageFile.path;

    const { fullName, userName } = req.body;

    if (!fullName || !userName) {
      return res.status(400).json({
        msg: "Empty fields",
      });
    }

    const user = await User.findOne({
      where: {
        userName,
      },
    });

    if (user) {
      return res.status(402).json({
        msg: "Username taken, please choose another username",
      });
    }

    let newUserName = userName.replace(/\s/g, "");

    await User.update(
      {
        fullName,
        userName: newUserName,
        profileImage: filePath,
      },
      {
        where: {
          id: req.id,
        },
      }
    );

    res.status(201).json({
      msg: "user updated successfully",
    });
  } catch (error) {
    dash.error(error.message);
  }
};

export default updateUserDetails;
