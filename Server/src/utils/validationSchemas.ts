import { z } from "zod";

const strongPassword = z
  .string()
  .min(8)
  .max(72)
  .refine((v) => /[a-z]/.test(v), "Password must include a lowercase letter")
  .refine((v) => /[A-Z]/.test(v), "Password must include an uppercase letter")
  .refine((v) => /\d/.test(v), "Password must include a number")
  .refine((v) => /[^A-Za-z0-9]/.test(v), "Password must include a special character");

export const registerSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: strongPassword,
    name: z.string().optional(),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string().min(1),
  }),
});

export const verifyEmailSchema = z.object({
  query: z.object({
    token: z.string().min(1),
  }),
});

export const resendVerificationSchema = z.object({
  body: z.object({
    email: z.string().email(),
  }),
});

export const productSchema = z.object({
  body: z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    price: z.number().positive(),
    stock: z.number().int().nonnegative(),
    category: z.string().optional(),
    imageUrl: z.string().url().optional(),
  }),
});

export const orderSchema = z.object({
  body: z.object({
    email: z.string().email(),
    items: z.array(
      z.object({
        productId: z.string(),
        quantity: z.number().int().positive(),
        price: z.number().positive(),
      })
    ),
    totalAmount: z.number().positive(),
    shippingAddress: z.object({
      street: z.string(),
      city: z.string(),
      state: z.string(),
      zipCode: z.string(),
      country: z.string(),
    }).optional(),
  }),
});

export const updateMeSchema = z.object({
  body: z.object({
    name: z.string().trim().min(1).max(100).optional(),
  }),
});

export const adminCreateUserSchema = z.object({
  body: z.object({
    email: z.string().trim().email(),
    password: strongPassword,
    name: z.string().trim().max(100).optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
});

export const adminUpdateUserSchema = z.object({
  body: z.object({
    name: z.string().trim().max(100).optional(),
    password: strongPassword.optional(),
    role: z.enum(["user", "admin"]).optional(),
  }),
  params: z.object({
    id: z.string().min(1),
  }),
});
