import rateLimit from "express-rate-limit";

export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: "Too many authentication requests from this IP, please try again later.",
});

export const signupLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 3,
  message: "Too many signup attempts from this IP, please try again later.",
});

export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many requests from this IP, please try again later.",
});
