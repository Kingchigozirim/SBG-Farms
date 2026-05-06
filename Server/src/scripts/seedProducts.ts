import mongoose from "mongoose";
import dotenv from "dotenv";
import Product from "../models/Product.js";

dotenv.config();

const products = [
  {
    name: "Jumbo Eggs",
    description: "Oversized white-shell eggs hand-selected for hospitality and supermarket premium lines. Consistent 73g+ weight class with reinforced shell integrity.",
    price: 12.99,
    stock: 500,
    category: "Premium Grade-A",
  },
  {
    name: "Medium Brown Eggs",
    description: "Free-range brown eggs ideal for foodservice, retailers, and high-volume bakery accounts. Rich yolk profile, uniform sizing.",
    price: 8.99,
    stock: 1000,
    category: "Wholesale Standard",
  },
  {
    name: "Bulk Crate Eggs",
    description: "Mixed-size crate eggs delivered on palletized fulfillment for distributors, processors, and contract supply customers.",
    price: 49.99,
    stock: 200,
    category: "Distributor Pallet",
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI!);
    console.log("Connected to MongoDB");

    await Product.deleteMany({});
    console.log("Cleared existing products");

    const createdProducts = await Product.create(products);
    console.log(`Seeded ${createdProducts.length} products`);

    process.exit(0);
  } catch (error) {
    console.error("Error seeding products:", error);
    process.exit(1);
  }
};

seedProducts();
