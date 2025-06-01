import Post from "../models/blog.js";

export const create = async (req, res, next) => {
  try {
    const post = await Post.create({
      ...req.body,
      author: req.user.id,
    });
    await post.save();

    res.status(200).json({ message: "Post saved successfully", post: post });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getBlog = async (req, res, next) => {
  const { id } = req.params;
  try {
    const post = await Post.findById(id);
    if (!post) {
      console.log("Blog not found");
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const getAllBlogs = async (req, res, next) => {
  try {
    const post = await Post.find().sort({ createdAt: -1 });
    if (!post) {
      console.log("No blogs");
    }
    res.status(200).json(post);
  } catch (error) {
    console.log(error);
    next(error);
  }
};
