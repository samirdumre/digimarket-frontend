"use server"

import {productSchema} from "@/lib/validations";
import {cookies} from "next/headers";
import {CategoriesResponse} from "@/types/category";

export type AddProductFormState = {
    success: boolean;
    message: string;
    errors?: any;
    inputs: Record<string, any>;
}

export async function handleAddProduct(
    prevState: AddProductFormState,
    formData: FormData
): Promise<AddProductFormState> {

    const images: Array<string> = [];
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('image_') && typeof value === 'string') {
            images.push(value);
        }
    }

    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const inputData = {
        title: formData.get("title"),
        short_description: formData.get("shortDescription"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        category: formData.get("category"),
        thumbnail: formData.get("thumbnailUrl"),
        images: images
    };

    console.log(inputData);

    // Validating with Zod
    const validated = productSchema.safeParse(inputData);

    if (validated.error) {
        return {
            success: false,
            message: "Product validation failed",
            errors: validated.error,
            inputs: inputData
        }
    }

    // Send data to Laravel backend using APIs
    try {
        const res = await fetch('http://localhost/api/v1/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(validated.data)
        });

        if(!res.ok){
            return {
                success: false,
                message: "Couldn't save the product to database",
                errors: {},
                inputs: inputData
            }
        }

    } catch (error) {
        console.error("Error sending data to backend", error);
        return {
            success: false,
            message: "Error saving product to database",
            errors: {},
            inputs: inputData
        }
    }
}


// Get categories form backend
export async function getCategories(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    try {
        const res = await fetch('http://localhost/api/v1/categories', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        const data: CategoriesResponse = await res.json();

        if (!data || !data.data || !Array.isArray(data.data)) {
            console.error("Invalid response structure:", data);
            return [];
        }

        const categories = data?.data.map((category) => category.name) || ["Notion templates, Wordpress themes"];
        return categories;

    }catch(error){
        console.error("Error getting categories", error);
        return [];
    }
}
