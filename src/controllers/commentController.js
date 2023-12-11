import commentModel from "../models/post/comment.js";

const commentController = {
  createComment: async (req, res) => {
    try {
      const { comment } = req.body;

      const UserId = req.body.UserId;

      // const PostId = req.body.PostId; //params
      const PostId = req.params.PostId;

      const newComment = await commentModel.create({
        comment,
        UserId, //req.session.user?.id
        PostId,
      });

      res.json({ newComment, msg: "new comment created" });
    } catch (error) {
      console.error("Error creating comment:", error.message);
      res
        .status(500)
        .json({ message: "Something went wrong while creating the post." });
    }
  },

  deleteComment: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedComment = await commentModel.destroy({
        where: { id },
      });

      if (!deletedComment) {
        return res
          .status(404)
          .json({ msg: "Comment not found or already deleted" });
      }

      res.json({ msg: "Comment deleted successfully" });
    } catch (error) {
      console.error("Error deleting Comment:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

export default commentController;
