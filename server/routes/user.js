import express from "express";
import { getUser, getUserBlogs } from "../controllers/user.js";
const router = express.Router();

router.get("/getUserBlogs/:id", getUserBlogs);
router.get("/:id", getUser);

export default router;
