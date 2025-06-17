"use server"

export interface AddProductFormState {
    success: boolean;
    message: string;
    errors?: Record<string, string[] | undefined>;
    inputs: Record<string, any>;
}

export async function handleAddProduct(
    prevState: AddProductFormState,
    formData: FormData
): Promise<AddProductFormState> {
    // TODO: Implement product creation logic
    console.log("prevState", prevState);
    console.log("formData", formData);

    const name = formData.get("name") as string || "";
    const title = formData.get("title") as string || "";
    const shortDescription = formData.get("shortDescription") as string || "";
    const description = formData.get("description") as string || "";
    const price = Number(formData.get("price"));
    const quantity = Number(formData.get("quantity"));
    const category = formData.get("category") as string || "";

    // Example: Basic validation (replace with more robust validation)
    if (!name) {
        return {
            ...prevState,
            success: false,
            message: "Product name is required.",
            errors: { name: ["Product name cannot be empty."] },
            inputs: { ...prevState.inputs, name, title, shortDescription, description, price, quantity, category },
        };
    }

    // If successful (placeholder):
    // await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async operation

    console.log("Product data:", { name, title, shortDescription, description, price, quantity, category });

    return {
        success: true,
        message: "Product added successfully! (Placeholder)",
        errors: {},
        inputs: { name, title, shortDescription, description, price, quantity, category },
    };
}
