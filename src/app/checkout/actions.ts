"use server";

import { redirect } from "next/navigation";
import { checkoutSchema } from "@/types/checkout";

export async function handleCheckout(formData: FormData) {
  const rawData = {
    f_name: formData.get("f_name"),
    l_name: formData.get("l_name"),
    country: formData.get("country"),
    city: formData.get("city"),
    card_number: formData.get("card_number"),
    exp_month: formData.get("exp_month"),
    exp_year: formData.get("exp_year"),
    cvc: formData.get("cvc"),
    product_id: formData.get("product_id"),
  };

  // Validate with Zod
  const validated = checkoutSchema.safeParse(rawData);

  if (!validated.success) {
    console.error("Validation error");
  }

  try {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    redirect("/products");
  } catch (error) {
    if (error instanceof Error && error.message?.includes("NEXT_REDIRECT")) {
      throw error;
    }

    console.error("Checkout error:", error);
  }
}
