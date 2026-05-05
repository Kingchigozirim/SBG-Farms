import express from "express";
import { createOrder, confirmPayment } from "../controllers/orderController";

const router = express.Router();

router.post("/order", createOrder);
router.get("/verify", confirmPayment);

export default router;