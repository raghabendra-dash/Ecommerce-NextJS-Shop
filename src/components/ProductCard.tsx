"use client";

import Image from "next/image";
import { Heart, ShoppingCart, Loader2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useState, useEffect } from "react";
import { MAPPED_CATEGORIES } from "@/lib/types";
import { useDispatch, useSelector } from "react-redux";
import {
  // addToCart,
  addToCartWithAnimation,
} from "../features/slices/cartSlice";
import {
  // toggleWishlist,
  toggleWishlistWithAnimation,
} from "../features/slices/wishlistSlice";
import { AppDispatch, RootState } from "@/store/store";
import { toast } from "@/hooks/use-toast";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useDispatch<AppDispatch>();
  const wishlist = useSelector((state: RootState) => state.wishlist);
  const isWishlisted = wishlist.items.some((item) => item.id === product.id);
  const [isAdding, setIsAdding] = useState(false);
  const [added, setAdded] = useState(false);

  const originalPrice = product.price * 1.25;
  const discount = ((originalPrice - product.price) / originalPrice) * 100;

  const handleAddToCart = async () => {
    setIsAdding(true);
    dispatch(addToCartWithAnimation(product));
    setIsAdding(false);
    setAdded(true);

    toast({
      title: "Added to Cart",
      description: `${product.title} has been added to your cart.`,
    });
    setTimeout(() => {
      setAdded(false);
    }, 1500);
  };

  const handleToggleWishlist = () => {
    dispatch(toggleWishlistWithAnimation(product));
    if (isWishlisted) {
      toast({
        title: "Removed from Wishlist",
        description: `${product.title} has been removed from your wishlist.`,
      });
    } else {
      toast({
        title: "Added to Wishlist",
        description: `${product.title} has been added to your wishlist.`,
      });
    }
  };

  const mappedCategory =
    MAPPED_CATEGORIES[
      product.category.toLowerCase() as keyof typeof MAPPED_CATEGORIES
    ] || product.category;

  return (
    <Card className="flex flex-col overflow-hidden h-full transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="p-0 relative">
        <div className="aspect-[4/3] w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            width={400}
            height={300}
            className="object-contain w-full h-full p-4 bg-white transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        <Button
          size="icon"
          variant="secondary"
          className="absolute top-2 right-2 h-8 w-8 rounded-full z-10"
          onClick={handleToggleWishlist}
        >
          <Heart
            className={cn(
              "h-4 w-4",
              isWishlisted
                ? "fill-primary text-primary"
                : "text-muted-foreground"
            )}
          />
        </Button>
      </CardHeader>
      <CardContent className="p-4 flex-grow flex flex-col">
        <Badge
          variant="outline"
          className="mb-2 w-fit capitalize text-black bg-emerald-300"
        >
          {mappedCategory.replace(/-/g, " ")}
        </Badge>
        <CardTitle className="text-base font-headline leading-snug line-clamp-2 h-12">
          {product.title}
        </CardTitle>
        <div className="flex items-center gap-2 -mt-1">
          <p className="text-2xl font-bold font-headline text-primary dark:text-white">
            ₹{product.price.toFixed(0)}
          </p>
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground line-through">
              MRP: ₹{(product.price * 1.25).toFixed(0)}
            </p>
            <p className="text-xs text-green-600 font-semibold">
              ({discount.toFixed(0)}% OFF)
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 mt-1">
          <span className="text-sm font-medium">
            {product.rating.rate.toFixed(1)}
          </span>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <svg
                key={i}
                className={`w-4 h-4 ${
                  i < Math.round(product.rating.rate)
                    ? "text-yellow-400"
                    : "text-gray-300"
                }`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
              </svg>
            ))}
          </div>
          <span className="text-sm text-muted-foreground">
            ({product.rating.count})
          </span>
        </div>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className={cn("w-full transition-all", {
            "bg-green-500 hover:bg-green-600": added,
          })}
          onClick={handleAddToCart}
          disabled={isAdding || added}
        >
          {isAdding ? (
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          ) : added ? (
            <Check className="mr-2 h-4 w-4" />
          ) : (
            <ShoppingCart className="mr-2 h-4 w-4" />
          )}
          {isAdding ? "Adding..." : added ? "Added!" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
}
