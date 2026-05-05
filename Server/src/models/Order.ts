import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  customerEmail: String,
  items: Array,
  totalAmount: Number,
  status: { type: String, default: "pending" },
  paymentReference: String
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);