import Image from "next/image";
import Button from "@/components/common/button";
import {goToCheckout} from "@/actions/productActions";

export function ProductCard({name, short_description, rating = 5, reviews_count = 9, price, thumbnailUrl, id}) {

    return (
        <div className="flex flex-row justify-center items-center">
            <div className="h-80 w-80">
                <form className="cursor-pointer" onClick={goToProductPage}>
                    <div className="h-50 w-80">
                        <Image
                            className="border border-gray-300 rounded-md p-2 shadow-xs hover:shadow-sm object-cover max-w-full max-h-full"
                            src={thumbnailUrl} alt={name} width={400} height={400}/>
                    </div>
                    <div className="mt-5 mb-3">
                        <h3 className="text-xl font-semibold">{name}</h3>
                        <h4 className="font-medium mt-1">{short_description}</h4>
                        <p className="mt-1 flex">
                            Rating: {rating} {" "} ({reviews_count})</p>admin
                        <h5 className="font-semibold mt-1">${price}</h5>
                    </div>
                </form>
                <form action={goToCheckout}>
                    <Button type="submit" size="md" variant="outline"
                            className="w-full border-black bg-black text-white transition-colors ">Add to cart</Button>
                </form>
            </div>
        </div>
    );
}
