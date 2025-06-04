import express from "express";
import {
  deleteUser,
  followUser,
  getUser,
  getUserBlogs,
  unfollowUser,
  updateUser,
} from "../controllers/user.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.get("/getUserBlogs/:id", getUserBlogs);
router.put("/updateuser/:id", verifyToken, updateUser);
router.delete("/deleteuser/:id", verifyToken, deleteUser);
router.post("/:id/follow", followUser);
router.post("/:id/unfollow", unfollowUser);
router.get("/:id", getUser);

export default router;
