import User from "../models/User";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken";
import { sendEmail } from "../services/emailService";

export const register = async (req, res) => {
  const { email, password } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const user = await User.create({ email, password: hashed });

  res.json(user);
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ message: "User not found" });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(400).json({ message: "Invalid credentials" });

  res.json({ token: generateToken(user) });
};

export const forgotPassword = async (req, res) => {
  const user = await User.findOne({ email: req.body.email });

  const token = crypto.randomBytes(32).toString("hex");

  user.resetToken = token;
  user.resetTokenExpiry = Date.now() + 3600000;

  await user.save();

  await sendEmail(user.email, "Reset Password", `Token: ${token}`);

  res.json({ message: "Email sent" });
};

export const resetPassword = async (req, res) => {
  const user = await User.findOne({
    resetToken: req.body.token,
    resetTokenExpiry: { $gt: Date.now() }
  });

  user.password = await bcrypt.hash(req.body.password, 10);
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();

  res.json({ message: "Password reset" });
};