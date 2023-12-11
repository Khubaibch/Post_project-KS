import commentModel from "../models/post/comment.js";
import followerModel from "../models/post/follower.js";
import likeModel from "../models/post/like.js";
import postModel from "../models/post/post.js";

import userModel from "../models/post/user.js";
const dbInit = async () => {
  await userModel.sync({
    alter: true,
    force: false,
  });
  await followerModel.sync({
    alter: true,
    force: false,
  });
  await postModel.sync({
    alter: true,
    force: false,
  });
  await commentModel.sync({
    alter: true,
    force: false,
  });
  await likeModel.sync({
    alter: true,
    force: false,
  });
};
export default dbInit;
