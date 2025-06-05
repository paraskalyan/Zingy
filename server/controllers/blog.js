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
  console.log(id);
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
  const query = req.query.search;
  console.log("inside");
  console.log(query);
  if (query) {
    try {
      const blogs = await Post.find({
        $or: [
          { title: { $regex: query, $options: "i" } },
          { content: { $regex: query, $options: "i" } },
        ],
      });
      res.status(200).json(blogs);
    } catch (err) {
      console.log(err);
    }
  } else {
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
  }
};

export const updatePost = async (req, res, next) => {
  console.log("Update Post");
  const postId = req.params.postid;
  const userId = req.params.userid;
  if (userId !== req.user.id) {
    console.log("Not authorised");
    return;
  }

  try {
    const update = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
          category: req.body.category,
        },
      },
      { new: true }
    );

    res.status(200).json({ mesage: "Updated successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deletePost = async (req, res, next) => {
  console.log("Delete Post");
  const postId = req.params.postid;
  const userId = req.params.userid;
  if (userId !== req.user.id) {
    console.log("Not authorised");
    return;
  }

  try {
    const deleted = await Post.findByIdAndDelete(postId);

    res.status(200).json({ mesage: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const searchBlogs = async (req, res, next) => {
  const query = req.query.q;
  try {
    if (!query) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const blogs = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } },
      ],
    });

    res.status(200).json(blogs);
  } catch (err) {
    console.error("Search error:", err);
    next(err);
  }
};
