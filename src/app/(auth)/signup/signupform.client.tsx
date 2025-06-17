"use client"

import Button from "@/components/common/button";
import Link from "next/link";
import {handleSignup} from "@/app/(auth)/actions";
import {useActionState} from "react";
import Image from "next/image";
import { CircleCheckBig } from 'lucide-react';

export default function SignupForm() {
    const [state, formAction, isPending] = useActionState(handleSignup, {
        success: false,
        message: "",
        errors: {},
        inputs: {}
    });

    if(state.success){
        return (
            <div className="border border-gray-300 rounded-lg p-7 shadow-sm">
                <div className="flex flex-col items-center justify-center w-70">
                    <div className="flex flex-col justify-center items-center gap-y-2 mb-2">
                        <div className="flex w-full gap-x-2">
                            <CircleCheckBig />
                            <p>Check your email to confirm</p>
                        </div>
                        <div className="text-sm pr-1">
                            You&#39;ve successfully signed up. Please check your email to confirm your account before signing in to the DigiMarket dashboard. The confirmation link will expire in few minutes.
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="border border-gray-300 rounded-lg p-7 shadow-sm">
            <div className="flex flex-col items-center justify-center w-70">
                <div className="flex flex-col justify-center items-center gap-y-2 mb-2">
                    <p className="font-medium text-2xl">
                        Sign up
                    </p>
                    <p className="font-medium text-md opacity-70">
                        Sign up to create a free account
                    </p>
                </div>
                {/*<button className="cursor-pointer w-full border border-gray-300 rounded-md py-2 px-4 my-3 hover:bg-gray-50">*/}
                {/*    <div className="flex flex-row gap-x-3 items-center justify-center">*/}
                {/*        <div>*/}
                {/*            <Image src="/google-logo.png" alt={"Google logo"} width={20} height={20}/>*/}
                {/*        </div>*/}
                {/*        <div>*/}
                {/*            <p className="font-medium text-sm">Continue with Google</p>*/}
                {/*        </div>*/}
                {/*    </div>*/}
                {/*</button>*/}
                <form action={formAction}>
                    <div className="pt-2 flex flex-col gap-y-3">
                        {/*<hr className="opacity-20 mt-1 mb-2" />*/}
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="name" className="font-medium">
                                Name
                            </label>
                            <input type="text" name="name" id="name" placeholder="Full name"
                                   className="pl-4 pr-15 py-2 border-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue={state?.inputs?.name}
                                   required/>
                            {state?.errors?.name && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.name}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="email" className="font-medium">
                                Email
                            </label>
                            <input type="text" id="email" name="email" placeholder="samir@digimarket.com"
                                   className="pl-4 pr-15 py-2 border-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue={state?.inputs?.email}
                                   required/>
                            {state?.errors?.email && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.email}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="password" className="font-medium">
                                Password
                            </label>
                            <input type="password" name="password" id="password" placeholder=""
                                   className="pl-4 pr-15 py-2 border-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue={state?.inputs?.password}
                                   required/>
                            {state?.errors?.password && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.password}</p>
                            )}
                        </div>
                        <div className="flex flex-col gap-y-1">
                            <label htmlFor="c_password" className="font-medium">
                                Confirm Password
                            </label>
                            <input type="password" name="c_password" id="c_password" placeholder=""
                                   className="pl-4 pr-15 py-2 border-1/2 border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm" defaultValue={state?.inputs?.c_password}
                                   required/>
                            {state?.errors?.c_password && (
                                <p className="text-red-500 text-sm mt-1">{state.errors.c_password}</p>
                            )}
                        </div>
                    </div>
                    <Button type="submit" disabled={isPending} variant="primary" size="sm" className={`w-full mt-3 ${isPending ? 'cursor-not-allowed': ''}`}>
                        {isPending ? "Submitting..." : 'Sign up'}
                    </Button>
                </form>

                {(state?.success === false && state.message) && (
                    <div className='text-red-500 border border-red-300 rounded-sm px-2 py-1 mt-2 text-sm w-[calc(100%-8px)]'>
                        {state.message}
                    </div>
                )}

                <div className="flex w-full gap-x-2 justify-center mt-5">
                    <div>
                        <p className="text-sm font-medium">Already have an account?</p>
                    </div>
                    <Link className="text-sm font-medium underline" href="/signin">Sign in</Link>
                </div>
            </div>
        </div>
    )
}