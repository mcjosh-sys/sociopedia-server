import express from "express";
import { register, login } from "../controllers/auth.js";

import { upload } from "../utils/uploadPic.js";

const router = express.Router()
router.route('/auth/register').post(upload.single("picture"),register)
router.route('/auth/login').post(login)

export default router
