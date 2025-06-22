import Navbar from "@/components/common/Navbar";
import {cookies} from "next/headers";
import Link from "next/link";
import {Plus} from "lucide-react";
import Button from "@/components/common/button";
import AdminProductCard from "@/components/admin/admin-product-card";
import {redirect} from "next/navigation";

export default async function Admin() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');

    async function redirectAdd() {
        "use server"
        redirect('/admin/products/add');
    }

    return (
        <div className="h-screen">
            <h1 className="text-5xl font-semibold text-center mb-10 mt-5">Admin</h1>
            <div className="flex justify-between items-center w-full px-40">
                <h2 className="text-3xl font-semibold">My Products</h2>
                <div className="flex justify-center gap-x-7">
                    <form action={redirectAdd}>
                        <Button size="sm" variant="primary"
                                className="flex items-center justify-center px-2 rounded-md">
                            <Plus/>
                            {/*<p className="text-xl font-medium">*/}
                            {/*    */}
                            {/*</p>*/}
                        </Button>
                    </form>
                    <Link href="/admin/dashboard" className="font-semibold mt-0.5">Dashboard</Link>
                    <Link href="/messages" className="font-semibold mt-0.5">Messages</Link>
                    <Link href="/account" className="font-semibold mt-0.5">Account</Link>
                </div>
            </div>
            <hr className="opacity-10 mt-2"/>
            <main className="grid grid-cols-4 h-screen w-full px-35">
                <AdminProductCard imageUrl={"https://framerusercontent.com/images/lNPV6cqYnY3nwFNKsOVt8TmSsAE.png"}
                                  name="Grocery List" price={90} rating={4} reviews_count={9}
                                  short_description="Track your life in seconds" key={"Grocery List"}/>
                <AdminProductCard
                    imageUrl={"https://framerusercontent.com/images/I39ajJaRf4ptiJHCjVZbk4V5S8.png?scale-down-to=2048"}
                    name="Habit Tracker" price={90} rating={4} reviews_count={9}
                    short_description="Track your life in seconds" key={"Habit Tracker"}/>
                <AdminProductCard imageUrl={"https://framerusercontent.com/images/MBf82JIFZy6tP3DVDkAImw565o.png"}
                                  name="Project Tracker" price={90} rating={4} reviews_count={9}
                                  short_description="Track your life in seconds" key={"Project Tracker"}/>
                <AdminProductCard imageUrl={"https://framerusercontent.com/images/XHjqY7bWbsoyHD8E8K5p0Wm8kWA.png"}
                                  name="Expense Tracker" price={90} rating={4} reviews_count={9}
                                  short_description="Track your life in seconds" key={"Expense Tracker"}/>
                <AdminProductCard imageUrl={"https://framerusercontent.com/images/MBf82JIFZy6tP3DVDkAImw565o.png"}
                                  name="Project Tracker" price={90} rating={4} reviews_count={9}
                                  short_description="Track your life in seconds" key={"Project Tra"}/>
            </main>
        </div>
    );
}
