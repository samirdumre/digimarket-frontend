import {cookies} from "next/headers";
import Link from "next/link";
import {Plus} from "lucide-react";
import Button from "@/components/common/button";
import AdminProductCard from "@/components/admin/admin-product-card";
import {redirect} from "next/navigation";
import {getAdminProductsData} from "@/app/(admin)/admin/actions";
import {Product} from "@/types/product";

export default async function Admin() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken')?.value;

    const adminProducts: Array<Product> = await getAdminProductsData();

    async function redirectAdd() {
        "use server"
        redirect('/admin/add');
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
                        </Button>
                    </form>
                    <Link href="/admin/dashboard" className="font-semibold mt-0.5">Dashboard</Link>
                    <Link href="/messages" className="font-semibold mt-0.5">Messages</Link>
                    <Link href="/account" className="font-semibold mt-0.5">Account</Link>
                </div>
            </div>
            <hr className="opacity-10 mt-2 mb-15"/>
            <main className="grid grid-cols-4 w-full gap-y-30 px-30">
                {adminProducts?.map((product) => (
                    <AdminProductCard id={product.id} thumbnailUrl={product.thumbnail} reviews_count={Math.round(Math.random()* 100)} rating={(Math.random() + 4).toFixed(2)} short_description={product.short_description} title={product.title} price={product.price} key={product.id} />
                ))}
            </main>
        </div>
    );
}
