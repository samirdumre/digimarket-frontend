import {cookies} from "next/headers";
import Navbar from "@/components/common/Navbar";


export default async function Home() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');
    return <div className={"h-screen"}>
        <nav>
            <Navbar token={authToken}/>
        </nav>
        <hr className="opacity-20 mt-2" />
    </div>;
}
