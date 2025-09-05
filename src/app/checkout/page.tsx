"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  submitCheckout,
  CheckoutFormState,
  CheckoutFormValues,
} from "./actions";
// import { useCart } from "@/context/CartProvider";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import { Loader2, CheckCircle, Info, ShieldCheck } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Terminal } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { clearCart } from "../../features/slices/cartSlice";
import { RootState } from "@/store/store";
import { useSelector, useDispatch } from "react-redux";

const checkoutSchema = z.object({
  name: z.string().min(3, "Name is required with 2 characters."),
  email: z.string().email("Please enter a valid email address."),
  address: z.string().min(4, "Address is required with 4 characters."),
});

export default function CheckoutPage() {
  const [formState, setFormState] = useState<CheckoutFormState | null>(null);
  const cart = useSelector((state: RootState) => state.cart.items);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm<z.infer<typeof checkoutSchema>>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      name: "",
      email: "",
      address: "",
    },
    mode: "onChange",
  });

  const { isSubmitting } = form.formState;

  useEffect(() => {
    if (cart.length === 0 && !formState?.estimatedDeliveryDate) {
      router.push("/cart");
    }
  }, [cart, formState, router]);

  async function onSubmit(values: CheckoutFormValues) {
    const result = await submitCheckout(values);
    setFormState(result);

    if (result.estimatedDeliveryDate) {
      toast({
        title: "Order Placed!",
        description: `We've received your order.`,
      });
      dispatch(clearCart());
    } else if (result.errors) {
      toast({
        variant: "destructive",
        title: "Oops! Something went wrong.",
        description: "Please check the form for errors.",
      });
      if (result.errors.name)
        form.setError("name", {
          type: "manual",
          message: result.errors.name.join(", "),
        });
      if (result.errors.email)
        form.setError("email", {
          type: "manual",
          message: result.errors.email.join(", "),
        });
      if (result.errors.address)
        form.setError("address", {
          type: "manual",
          message: result.errors.address.join(", "),
        });
    } else if (result.message) {
      toast({
        variant: "destructive",
        title: "An error occurred.",
        description: result.message,
      });
    }
  }

  if (formState?.estimatedDeliveryDate) {
    return (
      <div className="container mx-auto flex items-center justify-center min-h-[calc(100vh-8rem)]">
        <Card className="w-full max-w-md text-center">
          <CardHeader>
            <div className="mx-auto bg-green-100 dark:bg-green-900 rounded-full h-16 w-16 flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-500 dark:text-green-400" />
            </div>
            <CardTitle className="mt-4 font-headline text-2xl">
              Thank you for your order!
            </CardTitle>
          </CardHeader>
          <CardContent>
            <CardDescription className="text-lg">
              {formState.message}
            </CardDescription>
            <div className="mt-4 p-4 bg-muted rounded-lg">
              <p className="font-semibold text-lg">
                {formState.estimatedDeliveryDate}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {formState.confidenceLevel}
              </p>
            </div>
            <Button onClick={() => router.push("/")} className="mt-6 w-full">
              Continue Shopping
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto flex justify-center py-12">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <div className="flex justify-center items-center mb-4">
            <ShieldCheck className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="font-headline text-2xl">Checkout</CardTitle>
          <CardDescription>Please enter your shipping details.</CardDescription>
        </CardHeader>
        <CardContent>
          {formState?.message &&
            formState.message.includes("Generative Language API") && (
              <Alert variant="destructive" className="mb-4">
                <Terminal className="h-4 w-4" />
                <AlertTitle>Action Required: Enable API</AlertTitle>
                <AlertDescription>{formState.message}</AlertDescription>
              </Alert>
            )}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Raghav" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input
                        type="email"
                        placeholder="r@gmail.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="123 Main St, Anytown, IN"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {formState?.message &&
                !formState.errors &&
                !formState.estimatedDeliveryDate && (
                  <div className="flex items-center p-3 text-sm text-destructive bg-destructive/10 rounded-md">
                    <Info className="h-4 w-4 mr-2" />
                    {formState.message}
                  </div>
                )}
              <Button type="submit" className="w-full" disabled={isSubmitting}>
                {isSubmitting ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : null}
                Place Order
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
