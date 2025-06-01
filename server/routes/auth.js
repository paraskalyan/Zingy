import express from "express";
import { login, Signup } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);

export default router;
