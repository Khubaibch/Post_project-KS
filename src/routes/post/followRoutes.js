import { Router } from "express";

import followerController from "../../controllers/followerController.js";
import AuthenticateMiddleware from "../../middleware/middleware.js";

const followRouter = Router();

followRouter.post(
  "/:followeeId",
  AuthenticateMiddleware,
  followerController.create
);

export default followRouter;
