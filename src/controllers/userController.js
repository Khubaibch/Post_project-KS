import postModel from "../models/post/post.js";
import userModel from "../models/post/user.js";
import jwt from "jsonwebtoken";
import { hash, compare } from "bcrypt";
const userController = {
  register: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      const user = await userModel.findOne({
        where: {
          email,
        },
      });
      if (user !== null) {
        return res
          .status(400)
          .json({ error: "An account with this email already exists" });
      }
      const hPassword = await hash(password, 10);
      const userData = await userModel.create({
        name,
        email,
        password: hPassword,
      });
      return res.status(201).json(userData);
    } catch (error) {
      console.error("Error during registration:", error);
      return res.status(500).json({ msg: "Something went wrong" });
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await userModel.findOne({
        where: {
          email,
        },
      });
      if (!user) {
        return res
          .status(400)
          .json({ msg: "Account with this email doesnot exist" });
      }
      const cPass = compare(password, user.password);
      if (!cPass) {
        return res.status(400).json({ msg: "Invalid Credentials" });
      }
      const payload = {
        id: user.id,
        email: user.email,
      };
      const token = await jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "14d",
      });
      req.session.token = token;
      req.session.user = payload;
      req.session.save();
      console.log(req.session);
      return res.status(200).json({
        payload,
        token,
        msg: "User login successfuly",
      });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ error: "Something went wrong" });
    }
  },
  getUsers: async (req, res) => {
    try {
      const users = await userModel.findAll({
        include: [
          {
            model: postModel,
            attributes: ["image", "caption"],
          },
        ],
      });
      res.json({ users });
    } catch (err) {
      console.error("Error getting user:", err);
      res.status(500).json({ message: "Something bad happened" });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;

      const deletedUser = await userModel.destroy({
        where: { id },
      });

      if (!deletedUser) {
        return res
          .status(404)
          .json({ msg: "User not found or already deleted" });
      }

      res.json({ msg: "User deleted successfully" });
    } catch (error) {
      console.error("Error deleting User:", error);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

export default userController;
