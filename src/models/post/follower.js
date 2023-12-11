import { DataTypes } from "sequelize";
import sequelize from "../../db/config.js";
import userModel from "./user.js";
const followerModel = sequelize.define("follower", {
  followerId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
  followeeId: {
    type: DataTypes.INTEGER,
    references: {
      model: userModel,
      key: "id",
    },
  },
});

export default followerModel;
