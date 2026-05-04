import productJumbo from "@/assets/product-jumbo.jpg";
import productMedium from "@/assets/product-medium.jpg";
import productCrate from "@/assets/product-crate.jpg";

export interface Product {
  id: string;
  name: string;
  category: string;
  description: string;
  image: string;
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  {
    id: "jumbo",
    name: "Jumbo Eggs",
    category: "Premium Grade-A",
    description:
      "Oversized white-shell eggs hand-selected for hospitality and supermarket premium lines. Consistent 73g+ weight class with reinforced shell integrity.",
    image: productJumbo,
    specs: [
      { label: "Weight", value: "73g+" },
      { label: "Grade", value: "AA" },
      { label: "Pack", value: "30 / tray" },
    ],
  },
  {
    id: "medium",
    name: "Medium Brown Eggs",
    category: "Wholesale Standard",
    description:
      "Free-range brown eggs ideal for foodservice, retailers, and high-volume bakery accounts. Rich yolk profile, uniform sizing.",
    image: productMedium,
    specs: [
      { label: "Weight", value: "53–63g" },
      { label: "Grade", value: "A" },
      { label: "Pack", value: "30 / tray" },
    ],
  },
  {
    id: "crate",
    name: "Bulk Crate Eggs",
    category: "Distributor Pallet",
    description:
      "Mixed-size crate eggs delivered on palletized fulfillment for distributors, processors, and contract supply customers.",
    image: productCrate,
    specs: [
      { label: "Pallet", value: "360 trays" },
      { label: "Lead time", value: "24–48h" },
      { label: "Cold-chain", value: "4°C" },
    ],
  },
];
