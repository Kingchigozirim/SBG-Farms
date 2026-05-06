import Cart from "../models/Cart.js";
import Product from "../models/Product.js";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "../middleware/authMiddleware.js";
import logger from "../utils/logger.js";

export const getCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sessionId } = req.query;

    let query: any = {};
    if (req.user?.id) {
      query.userId = req.user.id;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: "User ID or session ID required" });
    }

    let cart = await Cart.findOne(query).populate("items.productId");

    if (!cart) {
      return res.json({ items: [], total: 0 });
    }

    let total = 0;
    cart.items.forEach((item) => {
      const product = item.productId as any;
      if (product) {
        total += product.price * item.quantity;
      }
    });

    res.json({ cart, total });
  } catch (error) {
    logger.error("Error in getCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const addToCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { productId, quantity, sessionId } = req.body;

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    if (product.stock < quantity) {
      return res.status(400).json({ message: "Insufficient stock" });
    }

    let query: any = {};
    let updateData: any = {};

    if (req.user?.id) {
      query.userId = req.user.id;
      updateData.userId = req.user.id;
    } else if (sessionId) {
      query.sessionId = sessionId;
      updateData.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: "User ID or session ID required" });
    }

    let cart = await Cart.findOne(query);

    if (!cart) {
      cart = await Cart.create({
        ...updateData,
        items: [{ productId, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }

      await cart.save();
    }

    await cart.populate("items.productId");

    res.json({ message: "Item added to cart", cart });
  } catch (error) {
    logger.error("Error in addToCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const updateCartItem = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { productId, quantity, sessionId } = req.body;

    let query: any = {};
    if (req.user?.id) {
      query.userId = req.user.id;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: "User ID or session ID required" });
    }

    const cart = await Cart.findOne(query);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );

    if (itemIndex === -1) {
      return res.status(404).json({ message: "Item not found in cart" });
    }

    if (quantity <= 0) {
      cart.items.splice(itemIndex, 1);
    } else {
      cart.items[itemIndex].quantity = quantity;
    }

    await cart.save();
    await cart.populate("items.productId");

    res.json({ message: "Cart updated", cart });
  } catch (error) {
    logger.error("Error in updateCartItem:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const clearCart = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { sessionId } = req.query;

    let query: any = {};
    if (req.user?.id) {
      query.userId = req.user.id;
    } else if (sessionId) {
      query.sessionId = sessionId;
    } else {
      return res.status(400).json({ message: "User ID or session ID required" });
    }

    await Cart.findOneAndDelete(query);

    res.json({ message: "Cart cleared" });
  } catch (error) {
    logger.error("Error in clearCart:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
