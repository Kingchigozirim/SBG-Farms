import User from "../models/User.js";
import { Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import logger from "../utils/logger.js";

export const getMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const user = await User.findById(req.user.id).select("-password -resetToken -resetTokenExpiry");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      id: user._id,
      email: user.email,
      name: user.name,
      role: user.role,
      emailVerified: user.emailVerified,
      createdAt: user.createdAt,
    });
  } catch (error) {
    logger.error("Error in getMe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateMe = async (req: AuthenticatedRequest, res: Response) => {
  try {
    if (!req.user?.id) {
      return res.status(401).json({ message: "Authentication required" });
    }

    const { name } = req.body;
    const update: any = {};
    if (typeof name === "string") update.name = name;

    const user = await User.findByIdAndUpdate(req.user.id, update, { new: true, runValidators: true }).select(
      "-password -resetToken -resetTokenExpiry"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "Profile updated",
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt,
      },
    });
  } catch (error) {
    logger.error("Error in updateMe:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
