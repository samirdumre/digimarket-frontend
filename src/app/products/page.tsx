import Navbar from "@/components/common/Navbar";
import {cookies} from "next/headers";
import {ProductCard} from "@/components/products/product-card";
import {getProductsData} from "@/app/products/actions";
import {Product} from "@/types/product";

async function Products() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');

    const products: Array<Product> = await getProductsData();

    return (
        <div>
            <nav>
                <Navbar token={authToken}/>
            </nav>
            <hr className="opacity-20 mt-2 mb-15"/>
            <h1 className="text-5xl font-semibold text-center">Products</h1>
            <main className="grid grid-cols-3 h-screen w-full px-45 gap-y-30">
                {products?.map((product) => (
                    <ProductCard thumbnailUrl={product.thumbnail} key={product.id} name={product.title} price={product.price} rating={(Math.random() + 4).toFixed(2)} reviews_count={Math.round(Math.random()* 100)} short_description={product.short_description} />
                ))}
            </main>
        </div>
    );
}

export default Products;