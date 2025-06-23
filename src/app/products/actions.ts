"use server"

import {cookies} from "next/headers";
import {ProductsResponse} from "@/types/product";

export async function getProductsData(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if(!authToken){
        return ({
            "success": false,
            "message": "No active session found, please sign in first"
        })
    }

    try {
        const res= await fetch("http://localhost/api/v1/products",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
            next: {
                tags: ['products'],
                revalidate: 60 * 60 * 24 * 7, // Cache for 1 week
            }
        });
        const data:ProductsResponse = await res.json();
        return data.data;
    } catch (error){
        console.error("Error getting (products) data", error);
    }
}












