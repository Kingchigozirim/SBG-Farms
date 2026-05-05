import Order from "../models/Order";
import { initializePayment, verifyPayment } from "../services/paymentService";
import { sendEmail } from "../services/emailService";

export const createOrder = async (req, res) => {
  const { email, items, totalAmount } = req.body;

  const order = await Order.create({
    customerEmail: email,
    items,
    totalAmount
  });

  const payment = await initializePayment(email, totalAmount);

  order.paymentReference = payment.data.reference;
  await order.save();

  res.json({ paymentUrl: payment.data.authorization_url });
};

export const confirmPayment = async (req, res) => {
  const { reference } = req.query;

  const payment = await verifyPayment(reference);

  if (payment.data.status === "success") {
    const order = await Order.findOne({ paymentReference: reference });

    order.status = "paid";
    await order.save();

    await sendEmail(order.customerEmail, "Order Confirmed", "Payment successful");
  }

  res.redirect(`${process.env.FRONTEND_URL}/success`);
};