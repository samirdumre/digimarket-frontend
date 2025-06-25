import {z} from "zod";

// Product schema
export const productSchema = z.object({
    title: z.string().
        min(2, "Title must be at least 2 characters").
        max(150, "Title too long (max 150 chars)"),
    short_description: z.string()
        .max(200, "Short description too long (max 200 chars)"),
    description: z.string()
        .min(5, "Description must be at least 5 characters")
        .max(2000, "Description too long (max 2000 chars)"),
    price: z.number()
        .min(0.01, "Price must be at least $0.01")
        .max(100000, "Price too high (max $100,000)"),
    quantity: z.number()
        .int("Must be whole number")
        .min(0, "Quantity cannot be negative"),
    category: z.string()
        .min(1, "Category is required"),
    category_id: z.number(),
    status: z.enum(['draft', 'pending', 'approved', 'rejected', 'inactive']),
    thumbnail: z.string(),
    images: z.array(z.string()),
    file_url: z.string(),
    file_name: z.string(),
});
