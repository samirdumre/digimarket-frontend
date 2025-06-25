"use server"

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
    const authToken = cookieStore.get("authToken")?.value;

    // Extract images from form data
    const images: string[] = [];
    for (const [key, value] of formData.entries()) {
        if (key.startsWith("image_") && typeof value === "string") {
            images.push(value);
        }
    }

    const categories = await getCategories();

    const inputData = {
        title: formData.get("title") as string,
        description: formData.get("description") as string,
        short_description: formData.get("shortDescription") as string,
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        category: formData.get("category") as string,
        thumbnail: formData.get("thumbnailUrl") as string,
        images,
    };

    // Find category ID
    const categoryId = categories.find(
        (item) => item && typeof item === "object" && "name" in item && item.name === inputData.category
    )?.id;

    if (!categoryId) {
        return {
            success: false,
            message: "Invalid category selected",
            errors: { category: "Category not found" },
            inputs: inputData,
        };
    }

    // Handle file upload
    const myFile = formData.get("file") as File | null;
    let file_url = formData.get("file_url") as string || "";
    let file_name = formData.get("file_name") as string || "";

    if (myFile && myFile.size > 0) {
        try {
            file_url = await handleFileUpload(myFile);
            file_name = myFile.name;
        } catch (error) {
            return {
                success: false,
                message: "File upload failed, please try again",
                errors: {},
                inputs: inputData,
            };
        }
    }

    // Check if editing
    const id = formData.get("id");
    const isEditing = !!id;

    // Build data for the Laravel API
    const data = {
        title: inputData.title,
        description: inputData.description,
        short_description: inputData.short_description,
        price: inputData.price,
        quantity: inputData.quantity,
        category_id: Number(categoryId),
        thumbnail: inputData.thumbnail,
        images,
        file_url,
        file_name,
        status: "approved",
    };

    const url = isEditing
        ? `http://localhost/api/v1/products/${id}`
        : "http://localhost/api/v1/products";
    const method = isEditing ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            let errorBody;
            try {
                errorBody = await res.json();
            } catch {
                const errorText = await res.text();
                return {
                    success: false,
                    message: `Server error (${res.status}): ${errorText.substring(0, 100)}`,
                    errors: {},
                    inputs: inputData,
                };
            }

            // Handle validation errors
            if (res.status === 422 && errorBody.errors) {
                return {
                    success: false,
                    message: errorBody.message || "Validation failed",
                    errors: errorBody.errors,
                    inputs: inputData,
                };
            }

            return {
                success: false,
                message: errorBody.message || `Server error (${res.status})`,
                errors: errorBody.errors || {},
                inputs: inputData,
            };
        }

        // Success - revalidate cache
        if (isEditing) {
            revalidateTag(`products-${id}`);
        }
        revalidateTag("products");

        redirect("/admin");
    } catch (error: any) {
        if (error.message?.includes("NEXT_REDIRECT")) {
            throw error;
        }

        return {
            success: false,
            message: `Network error: ${error.message}`,
            errors: {},
            inputs: inputData,
        };
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
