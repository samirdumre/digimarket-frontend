import React from 'react';
import Navbar from "@/components/common/Navbar";
import {getProductById} from "@/app/(admin)/admin/(products)/actions";
import {Product} from "@/types/product";
import {notFound} from "next/navigation";
import Button from "@/components/common/button";
import {goToCheckout} from "@/actions/productActions";

async function ProductDetailsPage({params}) {
    const {id} = await params;
    const product: Product = await getProductById(id);
    if(!product){
        return notFound();
    }

    return (
        <div>
            <Navbar token={"signed in"} />
            <hr className="opacity-70 mt-2 mb-15"/>
            <main className="grid grid-cols-2">
                <section className="flex flex-col px-55 gap-y-1">
                <h1 className="text-xl font-semibold">{product.title}</h1>
                <h2 className="font-medium">{product.short_description}</h2>
                <h3 className="text-xl font-semibold">${product.price}</h3>
                </section>
                <section>
                    <form action={goToCheckout}>
                        <Button type="submit" size="md" variant="outline"
                                className="w-40 border-black bg-black text-white transition-colors ">Add to cart</Button>
                    </form>

                </section>
            </main>
        </div>
    );
}

export default ProductDetailsPage;