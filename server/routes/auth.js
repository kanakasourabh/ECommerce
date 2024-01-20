import express from "express";
import {
  adminController,
  authController,
  loginController,
} from "../controllers/authController.js";
import { isAdmin, requireSignIn } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", authController);
router.post("/login", loginController);

router.post("/admin", requireSignIn, isAdmin, adminController);

export default router;
