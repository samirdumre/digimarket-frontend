"use server"

import {cookies} from "next/headers";

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
        const res = await fetch("http://localhost/api/v1/products",{
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            },
        });
        const data = await res.json();
        return data;
    } catch (error){
        console.error("Error getting products data", error);
    }
}












