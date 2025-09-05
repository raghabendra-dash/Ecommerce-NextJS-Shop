export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

export type Category =
  | "electronics"
  | "jewelery"
  | "men's clothing"
  | "women's clothing"
  | "grocery"
  | "beauty"
  | "furniture";

export const MAPPED_CATEGORIES: { [key: string]: string } = {
  smartphones: "Electronics",
  laptops: "Electronics",
  jewelery: "Jewellery",
  "mens-shirts": "Clothing",
  "mens-shoes": "Clothing",
  "mens-watches": "Clothing",
  tops: "Clothing",
  "womens-dresses": "Clothing",
  "womens-shoes": "Clothing",
  "womens-watches": "Clothing",
  "womens-bags": "Clothing",
  "womens-jewellery": "Jewellery",
  skincare: "Beauty",
  fragrances: "Beauty",
  groceries: "Groceries",
  furniture: "Furniture",
};
