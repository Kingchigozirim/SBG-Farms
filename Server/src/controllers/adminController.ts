import Order from "../models/Order.js";
import Product from "../models/Product.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import logger from "../utils/logger.js";

export const getAllOrders = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status, page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    logger.error("Error in getAllOrders:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getTransactions = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const transactions = await Order.find({ paymentStatus: "paid" }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (error) {
    logger.error("Error in getTransactions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateOrderStatus = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true, runValidators: true }
    );

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.json({ message: "Order status updated", order });
  } catch (error) {
    logger.error("Error in updateOrderStatus:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getDashboardStats = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const totalProducts = await Product.countDocuments();
    const totalOrders = await Order.countDocuments();
    const totalUsers = await User.countDocuments();
    const totalRevenue = await Order.aggregate([
      { $match: { paymentStatus: "paid" } },
      { $group: { _id: null, total: { $sum: "$totalAmount" } } },
    ]);

    const recentOrders = await Order.find().sort({ createdAt: -1 }).limit(5);

    res.json({
      totalProducts,
      totalOrders,
      totalUsers,
      totalRevenue: totalRevenue[0]?.total || 0,
      recentOrders,
    });
  } catch (error) {
    logger.error("Error in getDashboardStats:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const listUsers = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { search, role, page = 1, limit = 10 } = req.query;

    const query: any = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { email: { $regex: search, $options: "i" } },
        { name: { $regex: search, $options: "i" } },
      ];
    }

    const users = await User.find(query)
      .select("-password -resetToken -resetTokenExpiry")
      .sort({ createdAt: -1 })
      .limit(Number(limit))
      .skip((Number(page) - 1) * Number(limit));

    const total = await User.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / Number(limit)),
      currentPage: Number(page),
      total,
    });
  } catch (error) {
    logger.error("Error in listUsers:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const createUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { email, password, name, role } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      role: role === "admin" ? "admin" : "user",
    });

    res.status(201).json({
      message: "User created successfully",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error("Error in createUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, role, password } = req.body;

    const update: any = {};
    if (typeof name === "string") update.name = name;
    if (role === "admin" || role === "user") update.role = role;
    if (typeof password === "string" && password.length > 0) {
      update.password = await bcrypt.hash(password, 12);
    }

    const user = await User.findByIdAndUpdate(req.params.id, update, {
      new: true,
      runValidators: true,
    }).select("-password -resetToken -resetTokenExpiry");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User updated successfully", user });
  } catch (error) {
    logger.error("Error in updateUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const deleteUser = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted successfully" });
  } catch (error) {
    logger.error("Error in deleteUser:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
