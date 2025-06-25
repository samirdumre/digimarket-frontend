"use server"

import {cookies} from "next/headers";
import {CategoriesResponse} from "@/types/category";
import {redirect} from "next/navigation";
import {revalidateTag} from "next/cache";
import {productSchema} from "@/lib/validations";

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

    const images: Array<string> = [];
    for (const [key, value] of formData.entries()) {
        if (key.startsWith("image_") && typeof value === "string") {
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

    // Get category id from category name
    const categoryId = categories.find(
        (item) => typeof item === "object" && item.name === inputData.category
    )?.id;

    if (!categoryId) {
        return {
            success: false,
            message: "Invalid category selected",
            errors: {category: "Category not found"},
            inputs: inputData,
        };
    }

    // Handle file upload logic
    const myFile = formData.get("file") as File | null;
    let file_url = (formData.get("file_url") as string) || "";
    let file_name = (formData.get("file_name") as string) || "";

    // Only upload new file if its provided
    if (myFile && myFile.size > 0) {
        try {
            file_url = await handleFileUpload(myFile);
            file_name = myFile.name;
        } catch (error) {
            console.error("File upload failed:", error);
            return {
                success: false,
                message: "File upload failed, please try again",
                errors: {},
                inputs: inputData,
            };
        }
    }

    // Check if the user is editing the data
    const id = formData.get("id");
    const isEditing = !!id;

    // Build the data to be validated by zod
    const data = {
        ...inputData,
        status: "approved",
        category_id: categoryId,
        file_url: file_url,
        file_name: file_name,
    }

    // Validation with zod
    const result = productSchema.safeParse(data);

    if(!result.success){
        const flattened = result.error.flatten();
        return {
            success: false,
            message: flattened.formErrors.toString(),
            errors: flattened.fieldErrors,
            inputs: data
        }
    }

    const url = isEditing
        ? `http://localhost/api/v1/products/${id}`
        : "http://localhost/api/v1/products";
    const method = isEditing ? "PUT" : "POST";

    try {
        const res = await fetch(url, {
            method: method,
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`,
            },
            body: JSON.stringify(result.data),
        });

        if (!res.ok) {
                return {
                    success: false,
                    message: "Error sending data to database",
                    errors: {},
                    inputs: result.data,
                };
            }

        if (isEditing) {
            revalidateTag(`products-${id}`);
            revalidateTag("products");
        } else {
            revalidateTag("products");
        }

        redirect("/admin");
    } catch (error) {
        if (error.message?.includes("NEXT_REDIRECT")) {
            throw error;
        }
        console.error("Error sending data to backend", error);
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

    if (!file) return "";

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

        if (!res.ok) {
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
