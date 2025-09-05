import { Product } from "./types";
import { MAPPED_CATEGORIES } from "./types";

const DUMMY_JSON_URL = "https://dummyjson.com";

export interface CategoryInfo {
  slug: string;
  name: string;
  url: string;
}

export const getProducts = async (category?: string): Promise<Product[]> => {
    const url = category
      ? `${DUMMY_JSON_URL}/products/category/${category}`
      : `${DUMMY_JSON_URL}/products?limit=0`;

    try {
      const res = await fetch(url);
      if (!res.ok) {
        console.error(`Failed to fetch products from ${url}`);
        return [];
      }
      const data = await res.json();
      const products = data.products.map((p: any) => ({
        id: p.id,
        title: p.title,
        price: Math.round(p.price * 60),
        description: p.description,
        category: p.category,
        image: p.images[0] || p.thumbnail,
        rating: {
          rate: parseFloat((3.6 + Math.random() * 1.4).toFixed(1)),
          count: Math.floor(Math.random() * 250) + 1,
        },
      }));
      return products;
    } catch (error) {
      console.error("Error fetching products:", error);
      return [];
    }
  }


export const getCategories = async (): Promise<CategoryInfo[]> => {
  try {
    const res = await fetch(`${DUMMY_JSON_URL}/products/categories`);

    if (!res.ok) {
      throw new Error("Failed to fetch categories");
    }
    
    const allCategories: string[] = await res.json();
    return allCategories.map((slug) => ({
      slug,
      name: MAPPED_CATEGORIES[slug] || slug,
      url: "",
    }));
  } catch (error) {
    console.error("Error fetching categories:", error);
    // Fallbacks if API failure
    return Object.entries(MAPPED_CATEGORIES).map(([slug, name]) => ({
      slug,
      name,
      url: "",
    }));
  }
};
