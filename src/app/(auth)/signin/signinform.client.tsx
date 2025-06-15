"use client"

import Image from "next/image";
import Button from "@/components/common/button";
import Link from "next/link";
import {handleSignin} from "@/app/(auth)/actions";

export default function SigninForm() {
    return (
        <div className="border border-gray-300 rounded-lg p-7 shadow-sm">
        <div className="flex flex-col items-center justify-center w-70">
            <div className="flex flex-col justify-center items-center gap-y-2 mb-2">
                <p className="font-medium text-2xl">
                    Welcome back
                </p>
                <p className="font-medium text-md opacity-70">
                    Sign in to access your account
                </p>
            </div>
            <button className="cursor-pointer w-full border border-gray-300 rounded-md py-2 px-4 my-3 hover:bg-gray-50">
                <div className="flex flex-row gap-x-3 items-center justify-center">
                    <div>
                        <Image src="/google-logo.png" alt={"Google logo"} width={20} height={20}/>
                    </div>
                    <div>
                        <p className="font-medium text-sm">Continue with Google</p>
                    </div>
                </div>
            </button>
            <form action={handleSignin}>
            <div className="pt-2 flex flex-col gap-y-3">
            <hr className="opacity-20 mt-1 mb-2" />
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="email" className="font-medium">
                        Email
                    </label>
                    <input type="text" name="email" id="email" placeholder="samir@digimarket.com" className="pl-4 pr-15 py-2 border-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" required/>
                </div>
                <div className="flex flex-col gap-y-1">
                    <label htmlFor="password" className="font-medium">
                        Password
                    </label>
                    <input type="password" name="password" id="password" placeholder="" className="pl-4 pr-15 py-2 border-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" required/>
                </div>
            </div>
            <Button variant="primary" size="sm" className="w-full mt-3">Sign in</Button>
            </form>
            <button className="cursor-pointer mt-3">
                <p className="opacity-70 text-sm font-medium hover:opacity-100">Forgot password?</p>
            </button>
            <div className="flex w-full gap-x-2 justify-center mt-5">
                <div>
                <p className="text-sm font-medium">Don&apos;t have an account yet?</p>
                </div>
                <Link className="text-sm font-medium underline" href="/signup">Sign up</Link>
            </div>
        </div>
        </div>
    )
}