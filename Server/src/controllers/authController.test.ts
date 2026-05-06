import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("../models/User.js", () => {
  return {
    default: {
      findOne: vi.fn(),
      create: vi.fn(),
    },
  };
});

vi.mock("../services/emailService.js", () => {
  return {
    sendEmail: vi.fn(),
  };
});

vi.mock("bcryptjs", () => {
  return {
    default: {
      hash: vi.fn(),
      compare: vi.fn(),
    },
  };
});

import User from "../models/User.js";
import bcrypt from "bcryptjs";
import { sendEmail } from "../services/emailService.js";
import { login, register, verifyEmail } from "./authController.js";

const makeRes = () => {
  const res: any = {};
  res.status = vi.fn().mockReturnValue(res);
  res.json = vi.fn().mockReturnValue(res);
  res.redirect = vi.fn().mockReturnValue(res);
  return res;
};

describe("authController", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("blocks login when email is not verified", async () => {
    (User.findOne as any).mockResolvedValue({
      _id: "507f1f77bcf86cd799439011",
      email: "user@example.com",
      password: "hashed",
      role: "user",
      emailVerified: false,
    });
    (bcrypt as any).compare.mockResolvedValue(true);

    const req: any = { body: { email: "user@example.com", password: "Password1!" } };
    const res = makeRes();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(403);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ code: "EMAIL_NOT_VERIFIED" }));
  });

  it("register sends a verification email and does not return a JWT", async () => {
    (User.findOne as any).mockResolvedValue(null);
    (bcrypt as any).hash.mockResolvedValue("hashed");
    (User.create as any).mockImplementation(async (payload: any) => {
      return {
        _id: "507f1f77bcf86cd799439011",
        email: payload.email,
        name: payload.name,
        role: "user",
      };
    });

    const req: any = { body: { email: "new@example.com", password: "Password1!", name: "New" } };
    const res = makeRes();

    await register(req, res);

    expect(User.create).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "new@example.com",
        emailVerified: false,
        emailVerificationTokenHash: expect.any(String),
        emailVerificationTokenExpiry: expect.any(Date),
      })
    );
    expect(sendEmail).toHaveBeenCalledWith(
      "new@example.com",
      expect.any(String),
      expect.any(String),
      expect.any(String)
    );
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({ message: expect.stringContaining("verify your email") })
    );
  });

  it("verifyEmail rejects invalid token", async () => {
    (User.findOne as any).mockResolvedValue(null);

    const req: any = { query: { token: "bad" }, body: {} };
    const res = makeRes();

    await verifyEmail(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
  });
});

