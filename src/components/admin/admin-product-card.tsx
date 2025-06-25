"use client"

import Image from "next/image";
import Button from "@/components/common/button";
import {deleteProduct} from "@/app/(admin)/admin/actions";
import {useRouter} from "next/navigation";
import toast from "react-hot-toast";

export default function AdminProductCard({
                                                   id,
                                                   title,
                                                   short_description,
                                                   rating = 5,
                                                   reviews_count = 9,
                                                   price,
                                                   thumbnailUrl
                                               }) {

    const router = useRouter();

    function handleDelete() {
        const result = window.confirm(`Are you sure you want to delete "${title}"?\n\nThis action cannot be undone.`);
        if (result) {
            deleteProduct(id).then(() => {
            window.location.reload();
            });
        }
    }

    function handleEdit(){
        router.push(`/admin/${id}/edit`);
    }

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="h-80 w-80">
                <div className="h-50 w-80">
                    <Image
                        className="border border-gray-300 rounded-md p-2 shadow-xs hover:shadow-sm hover:cursor-pointer object-cover max-w-full max-h-full"
                        src={thumbnailUrl} alt={title} width={400} height={400}/>
                </div>
                <div className="mt-5 mb-3">
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <h4 className="font-medium mt-1">{short_description}</h4>
                    <p className="mt-1 flex">
                        Rating: {rating} {" "} ({reviews_count})</p>
                    <h5 className="font-semibold mt-1">${price}</h5>
                </div>
                <div className="flex justify-between">
                        <Button onClick={handleEdit} size="md" variant="outline" className="border-black w-25">Edit</Button>
                        <Button onClick={handleDelete} size="md" variant="destructive" className="border-black w-25">Delete</Button>
                </div>
            </div>
        </div>
    );
}




