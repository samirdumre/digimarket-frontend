"use client"

import Form from "next/form";
import {handleAddProduct, AddProductFormState} from "@/app/(admin)/admin/products/add/actions";
import {useActionState} from "react";
import {CldImage} from "next-cloudinary";

export default function AddProductForm() {
    const [state, formAction, isPending] = useActionState<AddProductFormState, FormData>(handleAddProduct, {
        success: false,
        message: "",
        errors: {},
        inputs: {}
    });

    return (
        <div>
            <Form action={formAction} className="grid grid-cols-2 px-15 gap-y-5" >
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="name" className="block text-lg font-medium text-gray-700 mb-1">
                            Product Name
                        </label>
                        <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="title" className="block text-lg font-medium text-gray-700 mb-1">
                            Title
                        </label>
                        <input type="text" id="title" name="title" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="shortDescription" className="block text-lg font-medium text-gray-700 mb-1">
                            Short Description
                        </label>
                        <input type="text" id="shortDescription" name="shortDescription" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="description" className="block text-lg font-medium text-gray-700 mb-1">
                            Description
                        </label>
                        <textarea id="description" name="description" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="price" className="block text-lg font-medium text-gray-700 mb-1">
                            Price
                        </label>
                        <input type="number" id="price" name="price" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="quantity" className="block text-lg font-medium text-gray-700 mb-1">
                            Quantity
                        </label>
                        <input type="number" id="quantity" name="quantity" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                <div className="flex justify-center">
                    <div className="flex flex-col gap-y-1 w-100">
                        <label htmlFor="category" className="block text-lg font-medium text-gray-700 mb-1">
                            Category
                        </label>
                        <input type="text" id="category" name="category" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent" required />
                    </div>
                </div>
                {/*<div className="flex justify-center">*/}
                {/*    <div className="flex flex-col gap-y-1 w-100">*/}
                {/*        <label htmlFor="thumbnail" className="block text-lg font-medium text-gray-700 mb-1">*/}
                {/*            Thumbnail*/}
                {/*        </label>*/}
                {/*        <CldImage alt={} src={}*/}
                {/*    </div>*/}
                {/*</div>*/}
            </Form>
        </div>
    );
}
