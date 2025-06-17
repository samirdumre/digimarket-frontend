import {cookies} from "next/headers";
import Navbar from "@/components/common/Navbar";
import {logoutUser} from "@/actions/authActions";
import Button from "@/components/common/button";


export default async function Home() {
    const cookieStore = await cookies();
    const authToken = cookieStore.get('authToken');
    return <div className="h-screen">
        <nav>
            <Navbar token={authToken}/>
        </nav>
        <hr className="opacity-10 mt-2" />
        {/*<form action={logoutUser}>*/}
        {/*    <Button type="submit" size="sm" variant="destructive">Logout</Button>*/}
        {/*</form>*/}
    </div>;
}
