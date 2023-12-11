import { Router } from "express";

import postController from "../../controllers/postController.js";
import upload from "../../multerConfig.js";

const postRouter = Router();

postRouter.post(
  "/createPost",
  upload.single("file"), //upload middleware
  postController.createPost
);
postRouter.get("/getSingleUserPost/:UserId", postController.getSingleUserPost);
postRouter.get("/getPosts", postController.getPosts);
postRouter.delete("/deletePost/:id", postController.deletePost);

export default postRouter;
