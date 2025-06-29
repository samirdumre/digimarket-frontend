import {getProductById} from "@/app/(admin)/admin/(products)/actions";
import {Product} from "@/types/product";
import {getProductsFromCart} from "@/app/checkout/actions";
import CheckoutForm from "@/components/checkout/checkout-form";

export default async function Checkout({params}) {
    const {id} = await params;
    const product: Product = await getProductById(id);
    const cartProducts = await getProductsFromCart();

    return (
        <div>
            <h1 className="text-3xl font-bold text-center mt-5">Checkout</h1>
            <CheckoutForm
                productId={product.id}
                productTitle={product.title}
                cartProducts={cartProducts || []}
            />
        </div>
    );
}