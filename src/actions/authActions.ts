"use server"

import {cookies} from "next/headers";
import {redirect} from "next/navigation";

export async function storeAuthToken(token: string) {
    const cookieStore = await cookies();

    cookieStore.set({
        name: 'authToken',
        value: token,
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 30, // 1 month
        path: '/'
    });

}

export async function logoutUser(){
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    if(!authToken){
        return ({
            "success": false,
            "message": "No active session found, please sign in first"
        })
    }

    try{
        const res = await fetch("http://localhost/api/logout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${authToken}`
            }
        });
        cookieStore.delete('authToken');

        if (!res.ok) {
          throw new Error("Logout failed");
        }
        redirect('/');
    } catch(error){
        if (
          error instanceof Error &&
          error.message?.includes("NEXT_REDIRECT")
        ) {
          throw error;
        }
        console.error("Error logging out", error);
    }

}