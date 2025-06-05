import express from "express";
import {
  create,
  deletePost,
  getAllBlogs,
  getBlog,
  searchBlogs,
  updatePost,
} from "../controllers/blog.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/search", searchBlogs);
router.get("/getAll", getAllBlogs);
router.put("/updatepost/:postid/:userid", verifyToken, updatePost);
router.delete("/deletepost/:postid/:userid", verifyToken, deletePost);
router.get("/:id", getBlog);
export default router;
