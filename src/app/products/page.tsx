import Navbar from "@/components/common/Navbar";
import {cookies} from "next/headers";
import {ProductCard} from "@/components/products/product-card";

async function Products() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');
    return (
        <div>
            <nav>
                <Navbar token={authToken}/>
            </nav>
            <hr className="opacity-20 mt-2 mb-15"/>
            <h1 className="text-5xl font-semibold text-center">Products</h1>
            <main className="grid grid-cols-3 h-screen w-full px-45">
                <ProductCard imageUrl={"https://framerusercontent.com/images/I39ajJaRf4ptiJHCjVZbk4V5S8.png?scale-down-to=2048"} name="Habit Tracker" price={90} rating={4} reviews_count={9} short_description="Track your life in seconds" key={"Habit Tracker"} />
                <ProductCard imageUrl={"https://framerusercontent.com/images/lNPV6cqYnY3nwFNKsOVt8TmSsAE.png"} name="Grocery List" price={90} rating={4} reviews_count={9} short_description="Track your life in seconds" key={"Grocery List"} />
                <ProductCard imageUrl={"https://framerusercontent.com/images/MBf82JIFZy6tP3DVDkAImw565o.png"} name="Project Tracker" price={90} rating={4} reviews_count={9} short_description="Track your life in seconds" key={"Project Tracker"} />
                <ProductCard imageUrl={"https://framerusercontent.com/images/XHjqY7bWbsoyHD8E8K5p0Wm8kWA.png"} name="Expense Tracker" price={90} rating={4} reviews_count={9} short_description="Track your life in seconds" key={"Expense Tracker"} />
                <ProductCard imageUrl={"https://framerusercontent.com/images/MBf82JIFZy6tP3DVDkAImw565o.png"} name="Project Tracker" price={90} rating={4} reviews_count={9} short_description="Track your life in seconds" key={"Project Tra"} />
                <ProductCard imageUrl={"https://framerusercontent.com/images/I39ajJaRf4ptiJHCjVZbk4V5S8.png?scale-down-to=2048"} name="Habit Tracker" price={90} rating={4} reviews_count={9} short_description="Track your life in seconds" key={"Habit Track"} />
            </main>
        </div>
    );
}

export default Products;