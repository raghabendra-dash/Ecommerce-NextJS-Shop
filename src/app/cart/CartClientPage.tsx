"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Minus, Plus, Trash2, ShoppingBag, Eraser } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/store/store";
import {
  incrementQuantity,
  decrementQuantity,
  removeFromCart,
  clearCart,
  selectCartItems,
  selectCartCount,
  selectTotalPrice,
} from "../../features/slices/cartSlice";
import { selectIsAuthenticated } from "../../features/slices/authSlice";

export default function CartClientPage() {
  const cart = useSelector(selectCartItems);
  const cartCount = useSelector(selectCartCount);
  const totalPrice = useSelector(selectTotalPrice);
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8 text-center min-h-[calc(100vh-12rem)] flex flex-col items-center justify-center">
        <ShoppingBag className="w-24 h-24 text-muted-foreground mb-4" />
        <h1 className="text-3xl font-headline font-semibold tracking-tight mb-2">
          Your Cart is Empty
        </h1>
        <p className="text-muted-foreground mb-6">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link href="/">
          <Button>Start Shopping</Button>
        </Link>
      </div>
    );
  }

  const handleCheckout = () => {
    if (isAuthenticated) {
      router.push("/checkout");
    } else {
      toast({
        variant: "destructive",
        title: "Authentication Required",
        description: "Please sign in to proceed to checkout.",
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <ShoppingBag className="w-12 h-12 mx-auto text-primary mb-4" />
        <h1 className="text-3xl font-bold font-headline tracking-wide">
          Shopping Bag
        </h1>
        <p className="text-muted-foreground mt-2">
          Review your items before proceeding to checkout.
        </p>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => {
            dispatch(clearCart());
            toast({
              title: "Cart Cleared",
              description: "All items have been removed from your cart.",
            });
          }}
          className="mt-5 -mb-2 flex items-center gap-2 justify-center text-destructive-foreground shadow-md hover:opacity-90"
        >
          Clear Cart
          <Eraser className="h-4 w-4" />
        </Button>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item) => (
            <Card
              key={item.id}
              className=" relative flex items-center p-4 border border-slate-500 shadow-md"
            >
              <div className="relative w-24 h-24 bg-slate-200 rounded-md overflow-hidden flex-shrink-0">
                <Image
                  src={item.image}
                  alt={item.title}
                  layout="fill"
                  objectFit="contain"
                  className="p-2"
                  priority
                />
              </div>
              <div className="ml-4 flex-grow">
                <h2 className="font-semibold line-clamp-1">{item.title}</h2>
                <p className="text-sm text-muted-foreground">
                  ₹{item.price.toFixed(2)}
                </p>
                <div className="flex items-center mt-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => dispatch(decrementQuantity(item.id))}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    readOnly
                    value={item.quantity}
                    className="w-12 h-8 text-center mx-2"
                  />
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => dispatch(incrementQuantity(item.id))}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <p className="font-bold">
                  ₹{(item.price * item.quantity).toFixed(2)}
                </p>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-muted-foreground hover:text-destructive mt-2"
                  onClick={() => {
                    dispatch(removeFromCart(item.id));
                    toast({
                      title: "Removed from Cart",
                      description: `${item.title} was removed from your cart.`,
                    });
                  }}
                >
                  <Trash2 className="!h-4.5 !w-4.5 text-rose-500" />
                </Button>
              </div>
            </Card>
          ))}
        </div>
        <div className="lg:col-span-1">
          <Card className="border border-slate-500 shadow-md">
            <CardHeader>
              <CardTitle className="font-headline">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({cartCount} items)</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <Separator className=" shadow-secondary-foreground shadow-sm" />
              <div className="flex justify-between font-bold text-lg">
                <span>Total Price</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleCheckout} className="w-full">
                Proceed to Checkout
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
