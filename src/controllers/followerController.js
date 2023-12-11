import followerModel from "../models/post/follower.js";
import userModel from "../models/post/user.js";

const followerController = {
  create: async (req, res) => {
    try {
      const id = req.session.user.id;
      const { followeeId } = req.params;
      const followerUser = await userModel.findByPk(id);
      if (!followerUser) {
        return res.status(404).json({ error: "no such user exist" });
      }
      const followee = await userModel.findByPk(followeeId);
      if (!followee) {
        return res.status(404).json({ error: "no such user exist" });
      }
      const follower = await followerModel.create({
        followerId: id,
        followeeId,
      });
      return res.status(200).json({ message: "user followed" });
    } catch (error) {
      return res.status(500).json({ error });
    }
  },
};
followerModel.belongsTo(userModel, {
  foreignKey: "followerId",
  as: "follower",
});
followerModel.belongsTo(userModel, {
  foreignKey: "followeeId",
  as: "followee",
});

export default followerController;
