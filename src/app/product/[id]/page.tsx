import React from 'react';
import Navbar from "@/components/common/Navbar";
import {getProductById} from "@/app/(admin)/admin/(products)/actions";
import {Product} from "@/types/product";
import {notFound} from "next/navigation";
import Button from "@/components/common/button";
import {getCategoryById, goToCheckout} from "@/actions/productActions";
import StarRating from "@/components/common/StarRating";
import Image from "next/image";

async function ProductDetailsPage({params}) {
    const {id} = await params;
    const product: Product = await getProductById(id);
    if (!product) {
        return notFound();
    }
    const category = await getCategoryById(product.category_id);
    const dateString = product.updated_at;
    const date = new Date(dateString);

    const productUpdatedDate = {
        year: date.getFullYear(),
        month: date.getMonth() + 1, // getMonth() is 0 based
        day: date.getDate()
    }

    return (
        <div>
            <Navbar token={"signed in"}/>
            <hr className="opacity-70 mt-2 mb-15"/>
            <main className="grid grid-cols-2">
                <section className="flex flex-col px-55 gap-y-1">
                    <h1 className="text-xl font-semibold">{product.title}</h1>
                    <h2 className="font-medium">{product.short_description}</h2>
                    <h3 className="text-xl font-semibold">${product.price}</h3>
                </section>
                <section className="flex flex-col gap-y-2 ml-49 mb-15 items-center">
                    <form action={goToCheckout}>
                        <input type="hidden" name="id" value={id}/>
                        <Button type="submit" size="md" variant="outline"
                                className="w-70 border-black bg-black text-white transition-colors ">Add to
                            cart</Button>
                    </form>
                    <div className="flex gap-x-1">
                        <StarRating starValue={4}/>
                        <p className="font-semibold">{product.quantity} Reviews</p>
                    </div>
                </section>
                <section className="grid-col-2 w-210 h-210 mx-120">
                    <Image src={product.thumbnail} alt={"Product image"} width={1000} height={1000} className="rounded-xs shadow-md" />
                    <article className="flex flex-col mt-10 gap-y-1">
                        <h4 className="text-2xl font-medium">About {product.title}</h4>
                        <h5>{product.description}</h5>
                        <div className="flex mt-3 justify-between">
                            <div>
                                <p className="text-lg font-medium">Category</p>
                            <h6 className="text-lg font-semibold">{category}</h6>
                            </div>
                            <div className="flex flex-col items-end">
                            <p className="text-lg font-medium">Last updated:</p>
                                <p className="text-lg font-semibold">{productUpdatedDate.year}-{productUpdatedDate.month}-{productUpdatedDate.day}</p>
                            </div>
                        </div>
                    </article>
                </section>
            </main>
        </div>
    );
}

export default ProductDetailsPage;