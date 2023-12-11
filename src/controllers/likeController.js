import likeModel from "../models/post/like.js";
import postModel from "../models/post/post.js";

const likeController = {
  createLike: async (req, res) => {
    try {
      const { UserId, PostId } = req.body;

      const existingLike = await likeModel.findOne({
        where: { UserId, PostId },
      });

      if (existingLike) {
        return res
          .status(400)
          .json({ msg: "User has already liked this post" });
      }

      const newLike = await likeModel.create({
        UserId,
        PostId,
        likes: 1,
      });

      await postModel.increment("likes", {
        by: 1,
        where: { id: PostId },
      });

      res.json({ msg: "Post liked successfully", newLike });
    } catch (error) {
      console.error("Error liking post:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
  deleteLike: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedLike = await likeModel.findByPk(id);
      if (!deletedLike) {
        return res
          .status(404)
          .json({ msg: "Like not found or already deleted" });
      }

      const { PostId } = deletedLike;

      await postModel.decrement("likes", {
        by: 1,
        where: { id: PostId },
      });

      await likeModel.destroy({
        where: { id },
      });

      res.status(200).json({ msg: "Like deleted successfully" });
    } catch (error) {
      console.error("Error deleting like:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

export default likeController;
