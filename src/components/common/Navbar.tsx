"use client"


import Link from "next/link";

function Navbar({token}) {
    return (
        <nav className="flex justify-around gap-x-50 mt-2">
            <div className="flex justify-center gap-x-10">
                <h1 className="text-4xl font-bold pr-10">
                    <Link href="#">DigiMarket</Link>
                </h1>
                <Link href="/products" className="font-semibold pt-2">Products</Link>
                <Link href="/bestsellers" className="font-semibold pt-2">Bestsellers</Link>
                <Link href="/offers" className="font-semibold pt-2">Offers</Link>
            </div>
            <div className="flex justify-center gap-x-10 pt-2 pl-10">
                {token ? (
                    <>
                        <Link href="/account" className="font-semibold">Account</Link>
                        <Link href="/messages" className="font-semibold">Messages</Link>
                    </>
                ) : (
                    <>
                        <Link href="/about" className="font-semibold">About</Link>
                        <Link href="/signin" className="font-semibold">Sign in</Link>
                    </>
                )}
            </div>
        </nav>
    );
}

export default Navbar;