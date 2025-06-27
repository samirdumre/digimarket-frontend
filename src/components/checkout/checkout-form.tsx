"use client";

import { useActionState } from "react";
import { handleCheckout } from "@/app/checkout/actions";
import {useRouter} from "next/navigation";
import Button from "@/components/common/button";

export default function CheckoutForm({ productId, cartProducts }) {
    const [state, formAction, isPending] = useActionState(handleCheckout, {
        success: false,
        message: "",
        errors: {},
        inputs: {}
    });
    const router = useRouter();

    // Calculate total price
    const totalPrice = cartProducts?.reduce((acc, curr) => {
        return acc + parseFloat(curr.product.price);
    }, 0) || 0;

    function continueShopping() {
        router.push('/products');
    }

    return (
        <div className="grid grid-cols-3 px-20 mt-10">
            <div className="col-span-2">
                <h2 className="text-xl font-semibold mb-5">Shipping Details</h2>
                <form id="checkout-form" action={formAction}>
                    <div className="grid grid-cols-2 mr-30 gap-x-20 gap-y-5">
                        <div className="flex flex-col">
                            <label htmlFor="firstName">First Name</label>
                            <input
                                type="text"
                                name="f_name"
                                className="px-2 py-1 border border-gray-500 rounded-md"
                                defaultValue={state?.inputs?.f_name || ""}
                            />
                            {state?.errors?.f_name && (
                                <p className="text-red-500 text-sm">{state.errors.f_name[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="lastName">Last Name</label>
                            <input
                                type="text"
                                name="l_name"
                                className="px-2 py-1 border border-gray-500 rounded-md"
                                defaultValue={state?.inputs?.l_name || ""}
                            />
                            {state?.errors?.l_name && (
                                <p className="text-red-500 text-sm">{state.errors.l_name[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="country">Country</label>
                            <input
                                type="text"
                                name="country"
                                className="px-2 py-1 border border-gray-500 rounded-md"
                                defaultValue={state?.inputs?.country || ""}
                            />
                            {state?.errors?.country && (
                                <p className="text-red-500 text-sm">{state.errors.country[0]}</p>
                            )}
                        </div>
                        <div className="flex flex-col">
                            <label htmlFor="city">City</label>
                            <input
                                type="text"
                                name="city"
                                className="px-2 py-1 border border-gray-500 rounded-md"
                                defaultValue={state?.inputs?.city || ""}
                            />
                            {state?.errors?.city && (
                                <p className="text-red-500 text-sm">{state.errors.city[0]}</p>
                            )}
                        </div>
                    </div>
                    <div className="mt-10 mr-30">
                        <h3 className="text-xl font-semibold mb-5">Payment Method</h3>
                        <div className="mb-5">
                            <div className="flex flex-col">
                                <label htmlFor="card">Card Number</label>
                                <input
                                    type="text"
                                    name="card_number"
                                    placeholder="1234 5678 9012 3456"
                                    className="px-2 py-1 border border-gray-500 rounded-md"
                                    defaultValue={state?.inputs?.card_number || ""}
                                />
                                {state?.errors?.card_number && (
                                    <p className="text-red-500 text-sm">{state.errors.card_number[0]}</p>
                                )}
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-x-5">
                            <div className="flex flex-col">
                                <label htmlFor="expiration" className="mb-1">Expiration</label>
                                <div className="grid grid-cols-2 gap-x-2">
                                    <select
                                        name="exp_month"
                                        className="px-2 py-1 border border-gray-500 rounded-md"
                                        defaultValue={state?.inputs?.exp_month || ""}
                                    >
                                        <option value="">Month</option>
                                        <option value="01">01</option>
                                        <option value="02">02</option>
                                        <option value="03">03</option>
                                        <option value="04">04</option>
                                        <option value="05">05</option>
                                        <option value="06">06</option>
                                        <option value="07">07</option>
                                        <option value="08">08</option>
                                        <option value="09">09</option>
                                        <option value="10">10</option>
                                        <option value="11">11</option>
                                        <option value="12">12</option>
                                    </select>
                                    <select
                                        name="exp_year"
                                        className="px-2 py-1 border border-gray-500 rounded-md"
                                        defaultValue={state?.inputs?.exp_year || ""}
                                    >
                                        <option value="">Year</option>
                                        <option value="2025">2025</option>
                                        <option value="2026">2026</option>
                                        <option value="2027">2027</option>
                                        <option value="2028">2028</option>
                                        <option value="2029">2029</option>
                                        <option value="2030">2030</option>
                                    </select>
                                </div>
                                {state?.errors?.exp_month && (
                                    <p className="text-red-500 text-sm">{state.errors.exp_month[0]}</p>
                                )}
                                {state?.errors?.exp_year && (
                                    <p className="text-red-500 text-sm">{state.errors.exp_year[0]}</p>
                                )}
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="cvc" className="mb-1">CVC</label>
                                <input
                                    type="text"
                                    id="cvc"
                                    name="cvc"
                                    placeholder="123"
                                    maxLength={4}
                                    className="px-2 py-1 border border-gray-500 rounded-md"
                                    defaultValue={state?.inputs?.cvc || ""}
                                />
                                {state?.errors?.cvc && (
                                    <p className="text-red-500 text-sm">{state.errors.cvc[0]}</p>
                                )}
                            </div>
                        </div>
                        <input type="hidden" name="product_id" value={productId} />
                    </div>
                </form>

                {state?.message && !state.success && (
                    <div className="text-red-500 border border-red-300 rounded-sm px-2 py-1 mt-4">
                        {state.message}
                    </div>
                )}
            </div>

            <div className="gap-x-20 gap-y-5">
                <Button variant="outline" size="md" className="w-70 text-lg font-medium mb-4 shadow-sm" onClick={continueShopping}>Continue Shopping</Button>
                <hr className="mb-5"/>
                <h2 className="text-xl font-semibold mb-5">Order Summary</h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                    <div className="space-y-3 mb-6">
                        {cartProducts?.map((item) => (
                            <div key={item.cart_item_id} className="space-y-2">
                                <div className="flex justify-between">
                                    <span>Title</span>
                                    <span className="font-semibold">{item.product.title}</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Price</span>
                                    <span>${parseFloat(item.product.price).toFixed(2)}</span>
                                </div>
                            </div>
                        ))}
                        <hr />
                        <div className="flex justify-between font-semibold text-lg">
                            <span>Total</span>
                            <span>${totalPrice.toFixed(2)}</span>
                        </div>
                    </div>
                    <button
                        type="submit"
                        form="checkout-form"
                        disabled={isPending}
                        className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors mb-4 cursor-pointer disabled:opacity-50"
                    >
                        {isPending ? "Processing..." : "Place Order"}
                    </button>
                </div>
            </div>
        </div>
    );
}