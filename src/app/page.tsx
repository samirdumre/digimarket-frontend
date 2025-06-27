import {cookies} from "next/headers";
import Navbar from "@/components/common/Navbar";
import Link from "next/link";

export default async function Home() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');

    return <div className="h-screen">
        <nav>
            <Navbar token={authToken}/>
        </nav>
        <hr className="opacity-30 mt-2" />
        <div className="flex flex-col h-screen gap-y-10 justify-center items-center">
            <h2 className="text-3xl font-semibold">An Online Marketplace for Digital Products</h2>
            <Link href={'/products'} className="border border-black px-5 py-2 text-lg font-semibold rounded-md bg-gray-100 hover:opacity-90 transition-colors">Go to Products</Link>
        </div>
    </div>;
}
