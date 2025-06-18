"use server"

import {productSchema} from "@/lib/validations";

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

    console.log(formData);
    const images : Array<string> = [];
    for(const [key,value] of formData.entries()){
        if(key.startsWith('image_') && typeof value === 'string'){
            images.push(value);
        }
    }

    const inputData = {
        name: formData.get("name"),
        title: formData.get("title"),
        shortDescription: formData.get("shortDescription"),
        description: formData.get("description"),
        price: Number(formData.get("price")),
        quantity: Number(formData.get("quantity")),
        category: formData.get("category"),
        thumbnail: formData.get("thumbnailUrl"),
        images: images
    };

    console.log(inputData);

    // Validating with Zod
    const result = productSchema.safeParse(inputData);

    if(result.error){
        return {
            success: false,
            message: "Product validation failed",
            errors: result.error,
            inputs: inputData
        }
    }
    console.log("error mate" ,result.error);

    console.log("result mate", result);
    return {
        success: true,
        message: "Product validation failed",
        errors: {},
        inputs: inputData
    }

}
