import { describe, it, expect } from "vitest";
import { orderSchema, adminCreateUserSchema } from "./validationSchemas.js";

describe("validationSchemas", () => {
  it("accepts a valid order payload", () => {
    expect(() =>
      orderSchema.parse({
        body: {
          email: "buyer@example.com",
          items: [{ productId: "507f1f77bcf86cd799439011", quantity: 2, price: 10 }],
          totalAmount: 20,
          shippingAddress: {
            street: "123 Road",
            city: "Lagos",
            state: "LA",
            zipCode: "100001",
            country: "Nigeria",
          },
        },
      })
    ).not.toThrow();
  });

  it("rejects a weak admin-created user password", () => {
    const result = adminCreateUserSchema.safeParse({
      body: { email: "admin@example.com", password: "short" },
    });
    expect(result.success).toBe(false);
  });
});
