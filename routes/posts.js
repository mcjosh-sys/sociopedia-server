import express from "express";
import {
  createPost,
  getFeedPosts,
  getUserPosts,
  likePost,
} from "../controllers/posts.js";
import { upload } from "../utils/uploadPic.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.route("/posts").post(verifyToken, upload.single("picture"), createPost);
router.route("/posts").get(verifyToken, getFeedPosts);
router.route("/posts/:userId").get(verifyToken, getUserPosts);
router.route("/posts/:id/like").patch(verifyToken, likePost);

export default router;
