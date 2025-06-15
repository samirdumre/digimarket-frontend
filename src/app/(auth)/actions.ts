"use server"

import {storeAuthToken} from "@/actions/authActions";
import {redirect} from "next/navigation";

export async function handleSignup(formData: FormData) {
    const name = formData.get('name');
    const email = formData.get('email');
    const password = formData.get('password');
    const c_password = formData.get('c_password');

    const validatedData = {
        "name": name,
        "email": email,
        "password": password,
        "c_password": c_password
    };

    try {
        const res = await fetch('http://localhost/api/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(validatedData)
        });

        if(res.ok){
            const data = await res.json();
            await storeAuthToken(data.data.token);
            redirect('/products');
        }

    } catch (error) {
        // Checks if there is a redirect error thrown by redirect() and re-throws it for Nextjs to handle
        if(error.message?.includes('NEXT_REDIRECT')) {
            throw  error;
        }

        console.error("Error signing up", error);
    }
}

export async function handleSignin(formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const validatedData = {
        "email": email,
        "password": password
    };

    try {
        const res = await fetch('http://localhost/api/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(validatedData)
        });
        const data = await res.json();
        console.log(data);

        if(res.ok){
            if(data.success){
                await storeAuthToken(data.data.token);
                redirect('/products');
            }
        }

    } catch (error) {
        // Checks if there is a redirect error thrown by redirect() and re-throws it for Nextjs to handle
        if(error.message?.includes('NEXT_REDIRECT')) {
            throw  error;
        }

        console.error("Error signing in", error);
    }
}