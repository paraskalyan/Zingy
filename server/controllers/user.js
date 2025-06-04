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

export const followUser = async (req, res, next) => {
  const targetId = req.params.id;
  const currentUserId = req.body.currentUser;
  console.log(targetId, currentUserId);

  if (targetId === currentUserId) {
    return res.status(400).json({ message: "You can't follow yourself" });
  }
  try {
    await User.findByIdAndUpdate(targetId, {
      $addToSet: { followers: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $addToSet: { following: targetId },
    });
    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const unfollowUser = async (req, res, next) => {
  const targetId = req.params.id;
  const currentUserId = req.body.currentUser;
  console.log(targetId, currentUserId);

  if (targetId === currentUserId) {
    return res.status(400).json({ message: "You can't unfollow yourself" });
  }
  try {
    await User.findByIdAndUpdate(targetId, {
      $pull: { followers: currentUserId },
    });

    await User.findByIdAndUpdate(currentUserId, {
      $pull: { following: targetId },
    });
    res.status(200).json({ message: "Followed successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateUser = async (req, res, next) => {
  console.log("Update user");
  const userId = req.params.id;
  if (userId !== req.user.id) {
    console.log("Not authorised");
    return;
  }

  try {
    const update = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          username: req.body.username,
          fullName: req.body.fullName,
          email: req.body.email,
          bio: req.body.bio,
        },
      },
      { new: true }
    );

    res.status(200).json({ mesage: "Updated successfully", user: update });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  console.log("Delete user");
  const userId = req.params.id;
  if (userId !== req.user.id) {
    console.log("Not authorised");
    return;
  }

  try {
    const deleted = await User.findByIdAndDelete(userId);
    const deletePosts = await Post.deleteMany({ author: userId });

    res.status(200).json({ mesage: "Deleted successfully" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};
