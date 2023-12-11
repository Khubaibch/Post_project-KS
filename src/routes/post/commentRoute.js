import { Router } from "express";

import commentController from "../../controllers/commentController.js";
import commentValidator from "../../validator/comment/index.js";

const commentRouter = Router();
// commentRouter.post(
//   "/post/:post_id/comment",
//   commentValidator.createComment,
//   commentController.createComment
// );
commentRouter.post(
  "/createComment",
  commentValidator.createComment,
  commentController.createComment
);
commentRouter.delete("/deleteComment/:id", commentController.deleteComment);

export default commentRouter;
