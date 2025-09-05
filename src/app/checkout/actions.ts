"use server";

import { z } from "zod";

const checkoutSchema = z.object({
  name: z.string().min(1, "Name is required."),
  email: z.string().min(1, "Email is required."),
  address: z.string().min(1, "Address is required."),
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;

export type CheckoutFormState = {
  message: string;
  estimatedDeliveryDate?: string;
  confidenceLevel?: string;
  errors?: {
    name?: string[];
    email?: string[];
    address?: string[];
  };
};

export async function submitCheckout(
  data: CheckoutFormValues
): Promise<CheckoutFormState> {
  const validatedFields = checkoutSchema.safeParse(data);

  if (!validatedFields.success) {
    return {
      message: "Validation failed.",
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  try {
    return {
      message: "Order placed successfully!",
      estimatedDeliveryDate: `Your order will be delivered in next 2-4 business days.`,
      confidenceLevel: `You will receive a tracking details via email.`,
    };
  } catch (error) {
    console.error("Error during checkout:", error);
    let errorMessage = "An unexpected error occurred. Please try again.";
    if (error instanceof Error) {
      errorMessage = error.message;
    }
    return {
      message: errorMessage,
    };
  }
}
