"use server"

import {cookies} from "next/headers";
import getApiUrl from "@/lib/api";

export async function getUserInfo(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const res = await fetch(getApiUrl(`/v1/get-user-info`),{
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if(!res.ok) {
        console.error("Couldn't fetch user data");
        return;
    }

    return await res.json();
}

export async function getPurchasedItems(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const res = await fetch(getApiUrl(`/v1/get-purchased-items`),{
        method: 'GET',
        headers:{
            'Accept': 'application/json',
            'Authorization': `Bearer ${authToken}`
        }
    });

    if(!res.ok) {
        console.error("Couldn't fetch user purchased products");
        return;
    }

    const data = await res.json();
    return data.data;
}
