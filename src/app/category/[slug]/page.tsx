import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/types";
import { getProducts } from "@/lib/api";
import { Shirt, Sparkles, ShoppingBasket, Sofa, Laptop2 } from "lucide-react";

interface CategoryPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  return [
    { slug: "clothing" },
    { slug: "electronics" },
    { slug: "beauty" },
    { slug: "groceries" },
    { slug: "furniture" },
  ];
}

const formatCategoryName = (name: string) => {
  if (!name) return "";
  return name
    .replace(/-/g, " ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getApiCategoriesFromSlug = (slug: string): string[] => {
  const slugMap: { [key: string]: string[] } = {
    clothing: [
      "mens-shirts",
      "mens-shoes",
      "mens-watches",
      "tops",
      "womens-dresses",
      "womens-shoes",
      "womens-watches",
      "womens-bags",
    ],
    electronics: ["smartphones", "laptops"],
    beauty: ["skincare", "fragrances"],
    groceries: ["groceries"],
    furniture: ["furniture"],
  };
  return slugMap[slug] || [slug];
};

const getIconForCategory = (slug: string) => {
  switch (slug) {
    case "clothing":
      return <Shirt className="h-12 w-12 text-primary" />;
    case "electronics":
      return <Laptop2 className="h-12 w-12 text-primary" />;
    case "beauty":
      return <Sparkles className="h-12 w-12 text-primary" />;
    case "groceries":
      return <ShoppingBasket className="h-12 w-12 text-primary" />;
    case "furniture":
      return <Sofa className="h-12 w-12 text-primary" />;
    default:
      return null;
  }
};

const getQuoteForCategory = (slug: string) => {
  const quotes: { [key: string]: string } = {
    clothing:
      '"Style is a way to say who you are without having to speak." – Rachel Zoe',
    electronics:
      '"Technology is best when it brings people together." – Matt Mullenweg',
    beauty:
      '"Nurture your inner beauty to brighter than outside." – Coco Chanel',
    groceries:
      '"One cannot sleep well, if he has not dined well." – Virginia Woolf',
    furniture:
      '"Design summons comfort, comfort summons pleasure." – Terence Conran',
  };
  return quotes[slug] || "";
};

const getProductsWithTimeout = async (category: string): Promise<Product[]> => {
  const timeout = new Promise<Product[]>((_, reject) =>
    setTimeout(() => reject(new Error("Timeout")), 10000)
  );

  return Promise.race([getProducts(category), timeout]);
};

export default async function CategoryPage({ params }: CategoryPageProps) {
 // const params = await props.params;
  const { slug } = params;

  const categoryName = formatCategoryName(slug);
  const apiCategories = getApiCategoriesFromSlug(slug);
  const categoryQuote = getQuoteForCategory(slug);

  let products: Product[] = [];
  try {
    const productPromises = apiCategories.map((category) =>
      getProductsWithTimeout(category)
    );
    const productArrays = await Promise.all(productPromises);
    products = productArrays.flat();
  } catch (error) {
    console.error("Failed to fetch products:", error);
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="text-center mb-8">
        <div className="flex justify-center items-center mb-4">
          {getIconForCategory(slug)}
        </div>
        <h1 className="text-3xl font-bold font-headline mb-9 pt-0 tracking-wider">
          {categoryName}
        </h1>
        {categoryQuote && (
          <blockquote className="-mt-7 pb-2 text-sm text-muted-foreground">
            {categoryQuote}
          </blockquote>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mt-6">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}
