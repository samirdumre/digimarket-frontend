"use server"

import {storeAuthToken} from "@/actions/authActions";
import {redirect} from "next/navigation";

export async function handleSignup(prevState, formData: FormData) {
    const name: string= formData.get('name');
    const email: string= formData.get('email');
    const password: string = formData.get('password');
    const c_password: string = formData.get('c_password');

    console.log(prevState);

    const rawData = {
        "name": name,
        "email": email,
        "password": password,
        "c_password": c_password
    };

    // Client side validation
    if(!name || name.length < 2){
        return{
            success: false,
            message: "Name must be at least 2 characters long",
            errors: {
                name: "Invalid name"
            },
            inputs: rawData
        }
    }

    if(!email || !email.includes('@')){
        return {
            success: false,
            message: "Please enter a valid email address",
            errors: {
                email: "Invalid email format"
            },
            inputs: rawData
        }
    }

    if(!password || password.length < 8){
        return {
            success: false,
            message: "Password must be at least 8 characters long",
            errors: {
                password: "Too weak"
            },
            inputs: rawData
        }
    }

    if(!c_password){
        return {
            success: false,
            message: "Please enter the confirm password",
            errors: {
                c_password: "Invalid confirm password"
            },
            inputs: rawData
        }
    }

    if(c_password !== password){
        return {
            success: false,
            message: "Confirm password doesn't match",
            errors: {
                c_password: "Invalid confirm password"
            },
            inputs: rawData
        }
    }


    try {
        const res = await fetch('http://localhost/api/v1/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(rawData)
        });

        if(res.ok){
            const data = await res.json();
            await storeAuthToken(data.data.token);
            return {
                success: true,
                message: "Email verification sent successfully",
                errors: {},
                inputs: rawData
            }
        } else {
            return {
                success: false,
                message: "Error signing up!",
                errors: {},
                inputs: rawData
            }
        }

    } catch (error) {
        // Checks if there is a redirect error thrown by redirect() and re-throws it for Nextjs to handle
        if(error.message?.includes('NEXT_REDIRECT')) {
            throw  error;
        }

        console.error("Error signing up", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
            errors: {},
            inputs: rawData
        }
    }
}

export async function handleSignin(prevState, formData: FormData) {
    const email = formData.get('email');
    const password = formData.get('password');

    const rawData = {
        "email": email,
        "password": password
    };

    // Client side validation
    if(!email || !email.includes('@')){
        return {
            success: false,
            message: "Please enter a valid email address",
            errors: {
                email: "Invalid email format"
            },
            inputs: rawData
        }
    }

    if(!password || password.length < 8){
        return {
            success: false,
            message: "Password must be at least 8 characters long",
            errors: {
                password: "Password is too short"
            },
            inputs: rawData
        }
    }

    try {
        const res = await fetch('http://localhost/api/v1/signin', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
            },
            body: JSON.stringify(rawData)
        });
        const data = await res.json();
        console.log(data);

        if(res.ok){
            if(data.success){
                await storeAuthToken(data.data.token);
                redirect('/products');
            }
        } else {
            return {
                success: false,
                message: "Invalid email or password",
                errors: {},
                inputs: rawData
            }
        }

    } catch (error) {
        // Checks if there is a redirect error thrown by redirect() and re-throws it for Nextjs to handle
        if(error.message?.includes('NEXT_REDIRECT')) {
            throw  error;
        }

        console.error("Error signing in", error);
        return {
            success: false,
            message: "An unexpected error occurred. Please try again.",
            errors: {},
            inputs: rawData
        }
    }
}