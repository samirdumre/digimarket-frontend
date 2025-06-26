"use server"

import {redirect} from "next/navigation";
import {getCategories} from "@/app/(admin)/admin/(products)/actions";

export async function goToCheckout(formData) {
    const id = formData.get('id');
    redirect(`/checkout/${id}`);
}

export async function goToProduct(formData){
    const id = formData.get('id');
    redirect(`/product/${id}`);
}

export async function getCategoryById(id){
    const categories = await getCategories();
    return categories.find((item) => typeof item === "object" && item.id === id)?.name;
}