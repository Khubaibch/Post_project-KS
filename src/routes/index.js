import { Router } from "express";
import userRouter from "./post/userRoute.js";
import postRouter from "./post/postRoute.js";
import commentRouter from "./post/commentRoute.js";
import likeRouter from "./post/likeRoutes.js";
import followRouter from "./post/followRoutes.js";
// import AuthenticateMiddleware from "../middleware/middleware.js";

const allRoutes = Router();
allRoutes.use("/users", userRouter);
allRoutes.use("/posts", postRouter);
allRoutes.use("/comments", commentRouter);
allRoutes.use("/likes", likeRouter);
allRoutes.use("/follows", followRouter);
export default allRoutes;
