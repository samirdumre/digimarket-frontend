"use server"

import {productSchema} from "@/lib/validations";
import {cookies} from "next/headers";
import {CategoriesResponse} from "@/types/category";
import {redirect} from "next/navigation";
import {revalidateTag} from "next/cache";

export type AddProductFormState = {
    success: boolean;
    message: string;
    errors?: unknown;
    inputs: Record<string, unknown>;
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
        images: images,
    };
    const categoryId = categories.find(
        (item) => typeof item === "object" && item.name === inputData.category
    )?.id;

    // For uploading file to backend
    const myFile = formData.get("file") as File | null;
    let file_url = "";
    let file_name = "";

    if(myFile && myFile.size > 0){
        try{
            file_url = await handleFileUpload(myFile);
            file_name = myFile.name;
        } catch (error) {
            console.error("File upload failed, please try again", error);
            return {
                success: false,
                message: "File upload failed, please try again",
                errors: {},
                inputs: inputData
            }
        }
    }

    const data = {
        ...inputData,
        category_id: Number(categoryId),
        status: "approved",
        file_url: file_url,
        file_name: file_name
    };

    // Validating with Zod
    const validated = productSchema.safeParse(data);
    if (!validated.success) {
        // Format zod errors to show specific errors in the form
        const fieldErrors: Record<string, string> = {};
        validated.error.issues.forEach((issue) => {
            const fieldName = issue.path[0] as string;
            fieldErrors[fieldName] = issue.message;
        });

        console.log("Validation errors:", fieldErrors);

        return {
            success: false,
            message: "Product validation failed",
            errors: fieldErrors,
            inputs: inputData
        };
    }

    // Check whether the function is expected to add or edit the product by 'id'. If 'id' is present then, the function should edit the product otherwise, add it
    const id = formData.get("id");

    const isEditing = !!id;
    const url = isEditing
        ? `http://localhost/api/v1/products/${id}`
        : 'http://localhost/api/v1/products';
    const method = isEditing ? 'PUT' : 'POST';
    const tag = isEditing ? `product-${id}` : 'products';

    // Send data to Laravel backend using APIs
    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(validated.data)
        });

        if (!res.ok) {
            const errorBody = await res.json();
            console.error("Backend error:", errorBody);
            return {
                success: false,
                message: "Couldn't save the product to database. " + (errorBody.message || ""),
                errors: {},
                inputs: inputData
            }
        }

        revalidateTag(tag); // Removes the stale data and fetches fresh data from db
        if (isEditing) {
            revalidateTag('products');
        }
        redirect('/admin');

    } catch (error) {
        if (error.message?.includes('NEXT_REDIRECT')) {
            throw error;
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
export async function getCategories() {

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

        return data?.data.map((category) => ({
            id: category.id,
            name: category.name
        })) || ["Notion templates, Wordpress themes"];

    } catch (error) {
        console.error("Error getting categories", error);
        return [];
    }
}

export async function getProductById(id: number) {

    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    try {
        const res = await fetch(`http://localhost/api/v1/products/${id}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            next: {
                tags: [`product-${id}`],
                revalidate: 60 * 60 * 24 * 7, // Cache for 1 week
            }
        });
        const data = await res.json();
        return data.data;
    } catch (error) {
        console.error("Error getting product by Id", error);
    }
}

export async function handleFileUpload(file: File) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if(!file) return "";

    const formData = new FormData();
    formData.append('file', file);

    try {
        const res = await fetch('http://localhost/api/v1/file-upload', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`,
            },
            body: formData
        })

        if(!res.ok) {
            console.error("Upload failed: ", res.status, res.statusText);
            return "";
        }

        const data = await res.json();
        console.log("file url", data);
        return data.url || "";

    } catch (error) {
        console.error("Error uploading file", error);
        return "";
    }
}
