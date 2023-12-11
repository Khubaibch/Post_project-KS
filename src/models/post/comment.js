import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";
import userModel from "./user.js";
import postModel from "./post.js";
const commentModel = sequelize.define("Comment", {
  comment: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
userModel.hasMany(commentModel);
commentModel.belongsTo(userModel);

postModel.hasMany(commentModel);
commentModel.belongsTo(postModel);
export default commentModel;
