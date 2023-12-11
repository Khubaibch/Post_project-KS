// userRouter.js
import { Router } from "express";
import userController from "../../controllers/userController.js";
import userValidator from "../../validator/user/index.js";

const userRouter = Router();
userRouter.post("/register", userValidator.createUser, userController.register);
userRouter.post("/login", userController.login);
userRouter.get("/getUsers", userController.getUsers);
userRouter.delete("/deleteUser/:id", userController.deleteUser);
export default userRouter;
