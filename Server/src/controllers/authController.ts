import User from "../models/User.js";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import { generateToken } from "../utils/generateToken.js";
import { sendEmail } from "../services/emailService.js";
import { Request, Response } from "express";
import logger from "../utils/logger.js";

const createEmailVerificationToken = () => {
  const token = crypto.randomBytes(32).toString("hex");
  const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000);
  return { token, tokenHash, expiresAt };
};

const buildVerifyEmailHtml = (verifyUrl: string) => {
  return `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Verify your email</title>
  </head>
  <body style="margin:0;padding:0;background:#ffffff;font-family:Arial,Helvetica,sans-serif;color:#111111;">
    <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="background:#ffffff;">
      <tr>
        <td style="padding:24px;">
          <table role="presentation" cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;border:1px solid #e5e7eb;">
            <tr>
              <td style="padding:24px 24px 0 24px;">
                <div style="font-size:12px;letter-spacing:0.18em;text-transform:uppercase;color:#6b7280;font-weight:700;">
                  SBGFARMS
                </div>
                <h1 style="margin:14px 0 0 0;font-size:26px;line-height:1.2;font-weight:600;">
                  Verify your email
                </h1>
                <p style="margin:12px 0 0 0;font-size:14px;line-height:1.6;color:#374151;">
                  Confirm your email to activate your account. This link expires in 24 hours.
                </p>
              </td>
            </tr>
            <tr>
              <td style="padding:20px 24px 24px 24px;">
                <a href="${verifyUrl}" style="display:inline-block;background:#111827;color:#ffffff;text-decoration:none;padding:12px 18px;font-size:14px;font-weight:600;">
                  Verify Email
                </a>
                <p style="margin:16px 0 0 0;font-size:12px;line-height:1.6;color:#6b7280;">
                  If the button doesn’t work, copy and paste this URL into your browser:<br/>
                  <span style="word-break:break-all;">${verifyUrl}</span>
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;
};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, name } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const { token, tokenHash, expiresAt } = createEmailVerificationToken();

    const user = await User.create({
      email,
      password: hashedPassword,
      name,
      emailVerified: false,
      emailVerificationTokenHash: tokenHash,
      emailVerificationTokenExpiry: expiresAt,
    });

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
    const verifyUrl = `${frontendUrl.replace(/\/$/, "")}/verify-email?token=${token}`;
    const text = `Verify your email: ${verifyUrl}\nThis link expires in 24 hours.`;
    const html = buildVerifyEmailHtml(verifyUrl);

    await sendEmail(user.email, "Verify your email", text, html);

    res.status(201).json({ message: "Registration successful. Please verify your email to sign in." });
  } catch (error) {
    logger.error("Error in register:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    if (!user.emailVerified) {
      return res.status(403).json({ message: "Email not verified", code: "EMAIL_NOT_VERIFIED" });
    }

    const token = generateToken(user);

    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    });
  } catch (error) {
    logger.error("Error in login:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const verifyEmail = async (req: Request, res: Response) => {
  try {
    const token =
      typeof req.query.token === "string"
        ? req.query.token
        : typeof req.body?.token === "string"
          ? req.body.token
          : "";

    if (!token) {
      return res.status(400).json({ message: "Verification token is required" });
    }

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const user = await User.findOne({
      emailVerificationTokenHash: tokenHash,
      emailVerificationTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired verification token" });
    }

    user.emailVerified = true;
    user.emailVerificationTokenHash = undefined;
    user.emailVerificationTokenExpiry = undefined;
    await user.save();

    res.json({ message: "Email verified successfully. You can now sign in." });
  } catch (error) {
    logger.error("Error in verifyEmail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resendVerificationEmail = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({ message: "If an account exists for this email, a verification link has been sent." });
    }

    if (user.emailVerified) {
      return res.json({ message: "Email is already verified." });
    }

    const { token, tokenHash, expiresAt } = createEmailVerificationToken();
    user.emailVerificationTokenHash = tokenHash;
    user.emailVerificationTokenExpiry = expiresAt;
    await user.save();

    const frontendUrl = process.env.FRONTEND_URL || "http://localhost:8080";
    const verifyUrl = `${frontendUrl.replace(/\/$/, "")}/verify-email?token=${token}`;
    const text = `Verify your email: ${verifyUrl}\nThis link expires in 24 hours.`;
    const html = buildVerifyEmailHtml(verifyUrl);

    await sendEmail(user.email, "Verify your email", text, html);

    res.json({ message: "Verification email sent." });
  } catch (error) {
    logger.error("Error in resendVerificationEmail:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const forgotPassword = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const resetToken = crypto.randomBytes(32).toString("hex");

    user.resetToken = resetToken;
    user.resetTokenExpiry = new Date(Date.now() + 3600000);

    await user.save();

    await sendEmail(
      user.email,
      "Password Reset Request",
      `Your password reset token is: ${resetToken}\nThis token expires in 1 hour.`
    );

    res.json({ message: "Password reset email sent" });
  } catch (error) {
    logger.error("Error in forgotPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const resetPassword = async (req: Request, res: Response) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(400).json({ message: "Invalid or expired reset token" });
    }

    user.password = await bcrypt.hash(password, 12);
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;

    await user.save();

    res.json({ message: "Password reset successfully" });
  } catch (error) {
    logger.error("Error in resetPassword:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
