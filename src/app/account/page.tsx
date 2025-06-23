import Link from "next/link";

export default function Account() {
    return (
        <div>
            <Link href="/admin" className="border border-gray-400 p-2">Admin</Link>
        </div>
    );
}
