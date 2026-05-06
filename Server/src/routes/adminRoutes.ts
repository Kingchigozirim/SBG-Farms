import express from "express";
import {
  getAllOrders,
  getTransactions,
  updateOrderStatus,
  getDashboardStats,
  listUsers,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/adminController.js";
import { authenticateToken, adminOnly } from "../middleware/authMiddleware.js";
import { validateRequest } from "../middleware/validationMiddleware.js";
import { adminCreateUserSchema, adminUpdateUserSchema } from "../utils/validationSchemas.js";

const router = express.Router();

router.get("/admin/orders", authenticateToken, adminOnly, getAllOrders);
router.get("/admin/transactions", authenticateToken, adminOnly, getTransactions);
router.put("/admin/orders/:id", authenticateToken, adminOnly, updateOrderStatus);
router.get("/admin/dashboard", authenticateToken, adminOnly, getDashboardStats);
router.get("/admin/users", authenticateToken, adminOnly, listUsers);
router.post("/admin/users", authenticateToken, adminOnly, validateRequest(adminCreateUserSchema), createUser);
router.patch("/admin/users/:id", authenticateToken, adminOnly, validateRequest(adminUpdateUserSchema), updateUser);
router.delete("/admin/users/:id", authenticateToken, adminOnly, deleteUser);

export default router;
