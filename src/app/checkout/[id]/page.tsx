import {getProductById} from "@/app/(admin)/admin/(products)/actions";
import {Product} from "@/types/product";
import {getProductsFromCart, handleCheckout} from "@/app/checkout/actions";
import Button from "@/components/common/button";
import {redirect} from "next/navigation";

export default async function Page({params}) {
    const {id} = await params;
    const product: Product = await getProductById(id);
    const cartProducts = await getProductsFromCart();
    const totalPrice = cartProducts?.reduce((acc,curr) => acc + (parseFloat(curr.product.price)),0);

    async function continueShopping() {
        "use server"
        redirect('/products');
    }

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-5">Checkout</h1>
            <div className="grid grid-cols-3 px-20 mt-10">
                <div className="col-span-2">
                    <h2 className="text-xl font-semibold mb-5">Shipping Details</h2>
                    <form id="checkout-form" action={handleCheckout}>
                        <div className="grid grid-cols-2 mr-30 gap-x-20 gap-y-5">
                            <div className="flex flex-col">
                                <label htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    name="f_name"
                                    className="px-2 py-1 border border-gray-500 rounded-md"
                                />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    name="l_name"
                                    className="px-2 py-1 border border-gray-500 rounded-md"
                                />
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="country">Country</label>
                                    <input
                                        type="text"
                                        name="country"
                                        className="px-2 py-1 border border-gray-500 rounded-md"
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-col">
                                    <label htmlFor="city">City</label>
                                    <input
                                        type="text"
                                        name="city"
                                        className="px-2 py-1 border border-gray-500 rounded-md"
                                    />
                                </div>
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
                                    />
                                </div>
                            </div>
                            <div>
                                <div className="grid grid-cols-2 gap-x-5">
                                    <div className="flex flex-col">
                                        <label htmlFor="expiration" className="mb-1">
                                            Expiration
                                        </label>
                                        <div className="grid grid-cols-2 gap-x-2">
                                            <select
                                                name="exp_month"
                                                className="px-2 py-1 border border-gray-500 rounded-md"
                                            >
                                                <option value="">MM</option>
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
                                            >
                                                <option value="">YYYY</option>
                                                <option value="2024">2024</option>
                                                <option value="2025">2025</option>
                                                <option value="2026">2026</option>
                                                <option value="2027">2027</option>
                                                <option value="2028">2028</option>
                                                <option value="2029">2029</option>
                                                <option value="2030">2030</option>
                                                <option value="2031">2031</option>
                                                <option value="2032">2032</option>
                                                <option value="2033">2033</option>
                                                <option value="2034">2034</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col">
                                            <label htmlFor="cvc" className="mb-1">
                                                CVC
                                            </label>
                                            <input
                                                type="text"
                                                id="cvc"
                                                name="cvc"
                                                placeholder="123"
                                                maxLength="4"
                                                className="px-2 py-1 border border-gray-500 rounded-md"
                                            />
                                        </div>
                                    </div>
                                    <input type="hidden" name="product_id" value={product.id}/>
                                    <input type="hidden" name="product_name" value={product.title}/>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
                <div className="gap-x-20 gap-y-5">
                    <form action={continueShopping}>
                        <Button variant="outline" size="md" className="w-70 font-semibold text-lg mb-4 border-black">Continue
                            Shopping</Button>
                    </form>
                    <hr className="mb-5"/>
                    <h2 className="text-xl font-semibold mb-5">Order Summary</h2>
                    <div className="bg-gray-50 p-6 rounded-lg">
                        <div className="space-y-3 mb-6">

                            {cartProducts?.map((item) => (
                                <div key={item.cart_item_id}>
                                    <div key={item.cart_item_id} className="flex justify-between">
                                        <span>Title</span>
                                        <span className="font-semibold">{item.product.title}</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Subtotal</span>
                                        <span>${product.price}</span>
                                    </div>
                                </div>
                            ))}

                            <hr className="border-gray-300"/>
                            <div className="flex justify-between font-semibold text-lg">
                                <span>Total</span>
                                <span>${totalPrice}</span>
                            </div>
                        </div>
                        <button
                            type="submit"
                            form="checkout-form"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md font-semibold hover:bg-blue-700 transition-colors mb-4 cursor-pointer"
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}