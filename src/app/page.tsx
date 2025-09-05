import Image from "next/image";
import Link from "next/link";
import { ProductCard } from "@/components/ProductCard";
import { getProducts, getCategories } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight } from "lucide-react";
import { MAPPED_CATEGORIES } from "@/lib/types";

const CategoryCard = ({
  category,
  imageUrl,
  hint,
}: {
  category: { slug: string; name: string };
  imageUrl: string;
  hint: string;
}) => {
  const categoryId = category.slug;

  return (
    <Link href={`/category/${categoryId}`}>
      <Card className="group relative overflow-hidden rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
        <div className="h-auto w-auto bg-zinc-300">
          <Image
            src={imageUrl}
            alt={category.name}
            width={400}
            height={300}
            data-ai-hint={hint}
            className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" />
        <CardContent className="absolute inset-0 flex items-center justify-center p-6">
          <h3 className="text-2xl font-bold font-headline text-slate-100 text-center">
            {category.name}
          </h3>
        </CardContent>
      </Card>
    </Link>
  );
};

export default async function HomePage() {
  const products = await getProducts();

  const navCategories = [
    {
      name: "Fashion",
      slug: "clothing",
      quote:
        '"Style is a way to say who you are without having to speak." – Rachel Zoe',
    },
    {
      name: "Electronics",
      slug: "electronics",
      quote:
        '"Technology is best when it brings people together." – Matt Mullenweg',
    },
    {
      name: "Beauty",
      slug: "beauty",
      quote:
        '"Fabricate your inner beauty to outshine the surface." – Coco Chanel',
    },
    {
      name: "Groceries",
      slug: "groceries",
      quote:
        '"One cannot sleep well, if he has not dined well." – Virginia Woolf',
    },
    {
      name: "Furniture",
      slug: "furniture",
      quote:
        '"Design summons comfort, comfort summons pleasure." – Terence Conran',
    },
  ];

  // This maps the display name from navCategories to the internal name used for filtering.
  // E.g. "Fashion" in nav needs to match "Clothing" from MAPPED_CATEGORIES
  const categoryNameToInternalName: { [key: string]: string } = {
    Fashion: "Clothing",
    Electronics: "Electronics",
    Beauty: "Beauty",
    Groceries: "Groceries",
    Furniture: "Furniture",
  };

  return (
    <div>
      <section className="relative h-[80vh] min-h-[500px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=2070&auto=format&fit=crop"
            alt="Modern storefront with clothes on display"
            data-ai-hint="fashion store"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/30" />
        </div>
        <div className="relative container mx-auto px-4 z-10 text-center">
          <div className="max-w-3xl mx-auto pt-1">
            <h1 className="text-4xl md:text-5xl flex justify-self-center font-bold font-headline tracking-tight">
              <span className="mr-4">Discover</span>
              <span className="mr-4">Your</span>
              <span className="text-amber-400">Perfect Style</span>
            </h1>
            <p className="mt-4 text-2xl md:text-xl text-slate-100">
              Shop the latest trends in fashion, electronics and lifestyle
              products. Quality meets affordability in our curated collection.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Button
                size="lg"
                asChild
                className="bg-orange-500 hover:bg-orange-600 text-slate-100 text-sm font-semibold"
              >
                <Link href="#clothing">Shop Now</Link>
              </Button>
              <Button
                size="lg"
                asChild
                variant="outline"
                className="bg-white/20 backdrop-blur-sm border-white/50 text-slate-100 hover:bg-transparent hover:text-accent"
              >
                <Link href="#categories">Explore Categories</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section id="categories" className="py-20 md:py-40 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-4xl font-['Times_New_Roman'] font-extrabold tracking-normal">
              Shop by Category
            </h2>
            <p
              className="mt-5 text-2xl font-medium text-muted-foreground tracking-wider"
              style={{ fontFamily: "Baskerville, serif" }}
            >
              Discover our wide range of products across different categories.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-1">
            {navCategories.map((category) => {
              const internalCategoryName =
                categoryNameToInternalName[category.name] || category.name;
              const categoryProducts = products.filter(
                (p) =>
                  (MAPPED_CATEGORIES[
                    p.category.toLowerCase() as keyof typeof MAPPED_CATEGORIES
                  ] || p.category) === internalCategoryName
              );
              const imageUrl =
                categoryProducts.length > 0
                  ? categoryProducts[0].image
                  : `https://picsum.photos/400/300?${category.name}`;
              const hint =
                categoryProducts.length > 0
                  ? categoryProducts[0].category
                  : typeof category.name === "string"
                  ? category.name.toLowerCase()
                  : "";
              return (
                <CategoryCard
                  key={category.name}
                  category={category}
                  imageUrl={imageUrl}
                  hint={hint}
                />
              );
            })}
          </div>
        </div>
      </section>

      {navCategories.map((category) => {
        const internalCategoryName =
          categoryNameToInternalName[category.name] || category.name;
        const categoryProducts = products.filter(
          (p) =>
            (MAPPED_CATEGORIES[
              p.category.toLowerCase() as keyof typeof MAPPED_CATEGORIES
            ] || p.category) === internalCategoryName
        );
        if (categoryProducts.length === 0) return null;

        return (
          <section
            key={category.name}
            id={category.slug}
            className="py-16 md:py-24 border-t"
          >
            <div className="container mx-auto my-auto px-4 mt-3">
              <div className="grid grid-cols-3 items-center mb-8">
                <div />
                <div className="text-center">
                  <h2 className="text-4xl font-category font-medium tracking-widest">
                    {category.name}
                  </h2>
                  <p className="-pt-2 text-center">➖</p>

                  <blockquote className="realtive mt-1 pb-5 text-xl text-pretty text-center font-medium font-[Roboto] italic text-muted-foreground">
                    {category.quote}
                  </blockquote>
                </div>
                <Link
                  href={`/category/${category.slug}`}
                  className="justify-self-end"
                >
                  <Button
                    variant="ghost"
                    className="hover:bg-amber-600 hover:text-white"
                  >
                    View all <ArrowRight className=" h-7 w-7" />
                  </Button>
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {categoryProducts.slice(0, 4).map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
