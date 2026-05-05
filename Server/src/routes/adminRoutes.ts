import express from "express";
import { getAllOrders, getTransactions, updateOrderStatus } from "../controllers/adminController";
import { adminOnly } from "../middleware/adminMiddleware";

const router = express.Router();

router.get("/admin/orders", adminOnly, getAllOrders);
router.get("/admin/transactions", adminOnly, getTransactions);
router.put("/admin/order/:id", adminOnly, updateOrderStatus);

export default router;