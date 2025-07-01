"use server"

import {redirect} from "next/navigation";
import {getCategories} from "@/app/(admin)/admin/(products)/actions";
import {cookies} from "next/headers";
import getApiUrl from "@/lib/api";

export async function goToCheckout(formData) {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;
    const id = formData.get('id');
    const productId = {
        'product_id': id
    }

    const res = await fetch(getApiUrl(`/v1/cart-items`),{
        method: 'POST',
        headers:{
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify(productId)
    });

    if(!res.ok) {
        console.error("Couldn't add to cart");
        return;
    }

    redirect(`/checkout/${id}`);
}

export async function getCategoryById(id){
    const categories = await getCategories();
    return categories.find((item) => typeof item === "object" && item.id === id)?.name;
}
