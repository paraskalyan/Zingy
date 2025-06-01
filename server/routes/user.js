import express from "express";
import { followUser, getUser, getUserBlogs } from "../controllers/user.js";
const router = express.Router();

router.get("/getUserBlogs/:id", getUserBlogs);
router.post("/:id/follow", followUser);
router.get("/:id", getUser);

export default router;
