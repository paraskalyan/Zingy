import express from "express";
import { create, getAllBlogs, getBlog } from "../controllers/blog.js";
import { verifyToken } from "../middlewares/verifyToken.js";
const router = express.Router();

router.post("/create", verifyToken, create);
router.get("/getAll", getAllBlogs);
router.get("/:id", getBlog);
export default router;
