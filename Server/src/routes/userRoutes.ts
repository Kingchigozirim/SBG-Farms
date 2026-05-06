import express from "express";
import { authenticateToken } from "../middleware/authMiddleware.js";
import { getMe, updateMe } from "../controllers/userController.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { updateMeSchema } from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/users/me", authenticateToken, getMe);
router.patch("/users/me", authenticateToken, validateRequest(updateMeSchema), updateMe);

export default router;
