import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import orderRoutes from "./routes/orderRoutes";
import adminRoutes from "./routes/adminRoutes";

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL
}));

app.use(express.json());

app.use("/api", authRoutes);
app.use("/api", orderRoutes);
app.use("/api", adminRoutes);

export default app;