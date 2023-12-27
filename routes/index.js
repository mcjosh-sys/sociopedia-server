import express from "express";
import authRoutes from "./auth.js";
import userRoutes from "./users.js";
import postRoutes from "./posts.js"

const router = express.Router();

router.use(authRoutes);
router.use(userRoutes);
router.use(postRoutes)

export default router;
