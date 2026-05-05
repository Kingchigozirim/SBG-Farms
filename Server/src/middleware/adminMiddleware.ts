import jwt from "jsonwebtoken";

export const adminOnly = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  const decoded: any = jwt.verify(token, process.env.JWT_SECRET!);

  if (decoded.role !== "admin") {
    return res.status(403).json({ message: "Admin only" });
  }

  next();
};