import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import userModel from "./user.js";

const postModel = sequelize.define("Post", {
  //The "image" attribute in your Sequelize model is a STRING type, and it can store
  //the path or filename of the image associated with the post you can use the stored path to
  image: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  caption: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  // likes: {
  //   type: DataTypes.INTEGER,
  //   defaultValue: 0, // Set a default value of 0
  // },
});
userModel.hasMany(postModel);
postModel.belongsTo(userModel);

export default postModel;
