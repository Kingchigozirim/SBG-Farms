import nodemailer from "nodemailer";

let cachedTransporter: nodemailer.Transporter | null = null;

const getTransporter = () => {
  if (cachedTransporter) return cachedTransporter;

  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : undefined;
  const secure = process.env.SMTP_SECURE === "true";
  const user = process.env.SMTP_USER || process.env.EMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.EMAIL_PASS;

  if (host && port && user && pass) {
    cachedTransporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    });
    return cachedTransporter;
  }

  if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
    cachedTransporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    return cachedTransporter;
  }

  throw new Error("Email transport is not configured");
};

export const sendEmail = async (to: string, subject: string, text: string, html?: string) => {
  const transporter = getTransporter();
  const from = process.env.EMAIL_FROM || process.env.SMTP_USER || process.env.EMAIL_USER;

  await transporter.sendMail({
    from,
    to,
    subject,
    text,
    html,
  });
};
