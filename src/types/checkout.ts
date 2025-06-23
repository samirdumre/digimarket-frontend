import { z } from "zod";

export const checkoutSchema = z.object({
  f_name: z.string().min(2, "First name must be at least 2 characters"),
  l_name: z.string().min(2, "Last name must be at least 2 characters"),
  country: z.string().min(1, "Country is required"),
  city: z.string().min(1, "City is required"),
  card_number: z
    .string()
    .min(13, "Card number must be at least 13 digits")
    .max(19, "Card number must not exceed 19 characters"),
  exp_month: z.string().min(1, "Expiration month is required"),
  exp_year: z
    .string()
    .min(4, "Expiration year is required")
    .max(4, "Year must be 4 digits"),
  cvc: z
    .string()
    .min(3, "CVC must be at least 3 digits")
    .max(4, "CVC must not exceed 4 digits"),
  product_id: z.string().min(1, "Product ID is required"),
});
