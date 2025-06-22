import {z} from "zod";

// Product schema
export const productSchema = z.object({
    name: z.string().
        min(1, "Product name is required").
        max(100, "Product name is too long (Max 100 characters)"),
    title: z.string().
        min(10, "Title must be at least 10 characters").
        max(150, "Title too long (max 150 chars)"),
    shortDescription: z.string()
        .max(200, "Short description too long (max 200 chars)"),
    description: z.string()
        .min(50, "Description must be at least 50 characters")
        .max(2000, "Description too long (max 2000 chars)"),
    price: z.number()
        .min(0.01, "Price must be at least $0.01")
        .max(100000, "Price too high (max $100,000)"),
    quantity: z.number()
        .int("Must be whole number")
        .min(0, "Quantity cannot be negative"),
    category: z.string()
        .min(1, "Category is required"),
    thumbnail: z.string(),
    images: z.array(z.string())
});

// Exports the Typescript type for product
export type User = z.infer<typeof productSchema>;