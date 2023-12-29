import express from "express";
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

router.route("/users/:id").get(verifyToken, getUser);
router.route("/users/:id/friends").get(verifyToken, getUserFriends);
router.route("/users/:id/:friendId").patch(verifyToken, addRemoveFriend);

export default router;
