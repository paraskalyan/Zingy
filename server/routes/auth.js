import express from "express";
import { google, login, Signup } from "../controllers/auth.js";
const router = express.Router();

router.post("/signup", Signup);
router.post("/login", login);
router.post("/google", google);

export default router;
