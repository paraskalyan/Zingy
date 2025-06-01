import Post from "../models/blog.js";
import User from "../models/user.js";

export const getUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      console.log(" no user");
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
    next(err);
  }
};

export const getUserBlogs = async (req, res, next) => {
  try {
    const blogs = await Post.find({ author: req.params.id });
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
