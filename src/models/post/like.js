import sequelize from "../../db/config.js";
import { DataTypes } from "sequelize";

import postModel from "./post.js";
import userModel from "./user.js";

const likeModel = sequelize.define("Like", {
  likes: {
    type: DataTypes.INTEGER,
    defaultValue: 0, // Set a default value of 0
  },
});
userModel.hasMany(likeModel);
likeModel.belongsTo(userModel);
postModel.hasMany(likeModel);
likeModel.belongsTo(postModel);

export default likeModel;
