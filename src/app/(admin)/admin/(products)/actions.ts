"use server"

import {productSchema} from "@/lib/validations";
import {cookies} from "next/headers";
import {CategoriesResponse} from "@/types/category";
import {redirect} from "next/navigation";
import {Product} from "@/types/product";

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

    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const images: Array<string> = [];
    for (const [key, value] of formData.entries()) {
        if (key.startsWith('image_') && typeof value === 'string') {
            images.push(value);
        }
    }
    const categories = await getCategories();

    const inputData = {
        title: formData.get("title"),
        description: formData.get("description"),
        short_description: formData.get("shortDescription"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        category: formData.get("category"),
        thumbnail: formData.get("thumbnailUrl"),
        images: images
    };
    const categoryId = categories.find(item => item.name === inputData.category)?.id;
    const data = {
        ...inputData,
        category_id: Number(categoryId),
        status: 'approved',
    }

    console.log(data);

    // Validating with Zod
    const validated = productSchema.safeParse(data);

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

        redirect('/admin');

    } catch (error) {
        if(error.message?.includes('NEXT_REDIRECT')) {
            throw  error;
        }
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

        const categories = data?.data.map((category) => ({
            id: category.id,
            name: category.name
        })) || ["Notion templates, Wordpress themes"];

        return categories;

    }catch(error){
        console.error("Error getting categories", error);
        return [];
    }
}

export async function getProductById(id: number){

    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    try{
        const res= await fetch(`http://localhost/api/v1/products/${id}`,{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error getting product by Id", error);
    }
}
