import Order from "../models/Order.js";
import Product from "../models/Product.js";
import Cart from "../models/Cart.js";
import { initializePayment, verifyPayment } from "../services/paymentService.js";
import { sendEmail } from "../services/emailService.js";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import logger from "../utils/logger.js";

export const createOrder = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, items, totalAmount, shippingAddress, sessionId } = req.body;

    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ message: `Product ${item.productId} not found` });
      }
      if (product.stock < item.quantity) {
        return res.status(400).json({ message: `Insufficient stock for ${product.name}` });
      }
    }

    const orderItems = [];
    for (const item of items) {
      const product = await Product.findById(item.productId);
      orderItems.push({
        productId: item.productId,
        name: product!.name,
        quantity: item.quantity,
        price: item.price,
      });
    }

    const order = await Order.create({
      customerEmail: email,
      customerId: req.user?.id,
      items: orderItems,
      totalAmount,
      shippingAddress,
    });

    for (const item of items) {
      await Product.findByIdAndUpdate(item.productId, {
        $inc: { stock: -item.quantity },
      });
    }

    let query: any = {};
    if (req.user?.id) {
      query.userId = req.user.id;
    } else if (sessionId) {
      query.sessionId = sessionId;
    }
    if (Object.keys(query).length > 0) {
      await Cart.findOneAndDelete(query);
    }

    const payment = await initializePayment(email, totalAmount);

    order.paymentReference = payment.data.reference;
    await order.save();

    res.json({
      message: "Order created successfully",
      orderId: order._id,
      paymentUrl: payment.data.authorization_url,
    });
  } catch (error) {
    logger.error("Error in createOrder:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const confirmPayment = async (req: Request, res: Response) => {
  try {
    const reference =
      typeof req.query.reference === "string"
        ? req.query.reference
        : Array.isArray(req.query.reference)
          ? String(req.query.reference[0] || "")
          : "";

    if (!reference) {
      return res.status(400).json({ message: "Payment reference is required" });
    }

    const payment = await verifyPayment(reference);

    const order = await Order.findOne({ paymentReference: reference });
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (payment.data.status === "success") {
      order.status = "paid";
      order.paymentStatus = "paid";
      await order.save();

      await sendEmail(
        order.customerEmail,
        "Order Confirmed",
        `Your order #${order._id} has been confirmed and payment is successful!`
      );
    } else {
      order.paymentStatus = "failed";
      await order.save();
    }

    res.redirect(`${process.env.FRONTEND_URL}/order-success?orderId=${order._id}`);
  } catch (error) {
    logger.error("Error in confirmPayment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getOrderById = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (
      req.user?.role !== "admin" &&
      order.customerId?.toString() !== req.user?.id
    ) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(order);
  } catch (error) {
    logger.error("Error in getOrderById:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getMyOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const orders = await Order.find({ customerId: req.user.id }).sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    logger.error("Error in getMyOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
