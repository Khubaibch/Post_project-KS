import commentModel from "../models/post/comment.js";
import likeModel from "../models/post/like.js";
import postModel from "../models/post/post.js";

const postController = {
  createPost: async (req, res) => {
    try {
      const { caption } = req.body;

      const UserId = req.body.UserId;

      const image = req.file ? req.file.filename : null;

      const newPost = await postModel.create({
        image,
        caption,
        UserId,
      });

      res.json({ newPost, msg: "New post created" });
    } catch (error) {
      console.error("Error creating post:", error.message);
      res
        .status(500)
        .json({ message: "Something went wrong while creating the post." });
    }
  },

  getSingleUserPost: async (req, res) => {
    try {
      const { UserId } = req.params;
      const userPost = await postModel.findAll({
        where: { UserId },
        include: [
          {
            model: commentModel,
            attributes: ["comment"],
          },
        ],
      });
      if (userPost.length === 0) {
        res.status(404).json({ msg: "  not posted yet" });
      }
      res.json({ msg: "user posts", userPost });
    } catch (err) {
      console.log("err", err);
      res.status(500).json(err);
    }
  },
  getPosts: async (req, res) => {
    try {
      const posts = await postModel.findAll({
        include: [
          {
            model: commentModel,
            attributes: ["comment"],
          },
          {
            model: likeModel,
            attributes: ["likes"],
          },
        ],
      });
      res.json({ posts });
    } catch (err) {
      console.error("Error getting user:", err);
      res.status(500).json({ message: "Something bad happened" });
    }
  },

  deletePost: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedPost = await postModel.destroy({
        where: { id },
      });

      if (!deletedPost) {
        return res
          .status(404)
          .json({ msg: "Post not found or already deleted" });
      }

      res.json({ msg: "Post deleted successfully" });
    } catch (error) {
      console.error("Error deleting post:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

export default postController;
