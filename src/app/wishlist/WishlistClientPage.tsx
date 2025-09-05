"use client";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ProductCard } from "@/components/ProductCard";
import { Gift, Eraser } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import { clearWishlist } from "../../features/slices/wishlistSlice";
import { Product } from "@/lib/types";
import { toast } from "@/hooks/use-toast";

export default function WishlistClientPage() {
  const { items: wishlist } = useSelector((state: RootState) => state.wishlist);
  const dispatch = useDispatch();

  if (wishlist.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <Gift className="w-24 h-24 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-headline font-bold mb-2">
          Your Wishlist is Empty
        </h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your wishlist yet.
        </p>
        <Link href="/">
          <Button>Discover Products</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <Gift className="w-12 h-12 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline tracking-wide">
          My Wishlist
        </h1>
        <p className="text-muted-foreground mt-2">
          Review your favorite items before purchasing.
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            dispatch(clearWishlist());
            toast({
              title: "Wishlist Cleared",
              description: "All items have been removed from your wishlist.",
            });
          }}
          className="mt-5 -mb-2 flex items-center gap-2 justify-center text-destructive-foreground shadow-md hover:opacity-90"
        >
          Clear Wishlist
          <Eraser className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {wishlist.map((product: Product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
