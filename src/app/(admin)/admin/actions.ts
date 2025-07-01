"use server"

import {cookies} from "next/headers";
import {ProductsResponse} from "@/types/product";
import getApiUrl from "@/lib/api";

export async function getAdminProductsData(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    try {
        const res= await fetch(getApiUrl("/v1/user-products"),{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        const data:ProductsResponse = await res.json();
        return data;
    } catch (error){
        console.error("Error getting (products) data", error);
    }
}

export async function deleteProduct(id: number){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    try {
        const res= await fetch(getApiUrl(`/v1/products/${id}`),{
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });

        if(!res.ok){
            console.error("Product deletion failed");
        }
        console.log("Product deleted successfully");
    } catch (error){
        console.error("Error getting (products) data", error);
    }
}
