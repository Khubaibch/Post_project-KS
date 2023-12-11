import { Router } from "express";
import likeController from "../../controllers/likeController.js";

const likeRouter = Router();

likeRouter.post("/createLike", likeController.createLike);
likeRouter.delete("/deleteLike/:id", likeController.deleteLike);

export default likeRouter;
