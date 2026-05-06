import express from "express";
import {
  register,
  login,
  forgotPassword,
  resetPassword,
  verifyEmail,
  resendVerificationEmail,
} from "../controllers/authController.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { registerSchema, loginSchema, verifyEmailSchema, resendVerificationSchema } from "../utils/validationSchemas.js";
import { authLimiter, signupLimiter } from "../middleware/rateLimiter.js";

const router = express.Router();

router.post("/register", signupLimiter, validateRequest(registerSchema), register);
router.post("/login", authLimiter, validateRequest(loginSchema), login);
router.get("/verify-email", authLimiter, validateRequest(verifyEmailSchema), verifyEmail);
router.post("/resend-verification", signupLimiter, validateRequest(resendVerificationSchema), resendVerificationEmail);
router.post("/forgot-password", authLimiter, forgotPassword);
router.post("/reset-password", authLimiter, resetPassword);

export default router;
