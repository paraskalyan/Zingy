import express from "express";
import {
  followUser,
  getUser,
  getUserBlogs,
  unfollowUser,
} from "../controllers/user.js";
const router = express.Router();

router.get("/getUserBlogs/:id", getUserBlogs);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);
router.get("/:id", getUser);

export default router;
