import Navbar from "@/components/common/Navbar";
import {getPurchasedItems, getUserInfo} from "@/app/account/actions";

async function Account() {
    const userInfo = await getUserInfo();
    const dateString = new Date(userInfo.created_at);
    console.log(dateString);
    const year = dateString.getFullYear();
    const month = dateString.getMonth() + 1 ; // getMonth is based on 0 as starting index
    const day = dateString.getDate();

    function toTitleCase(word: string) {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    }

    // const purchasedProducts = await getPurchasedItems();

    return (
        <div>
            <Navbar token="validated" />
            <h1 className="text-4xl font-semibold text-center mt-10">My Account</h1>
            <section className="px-55 mt-15">
                <h2 className="text-2xl font-semibold">User Information</h2>
                <div className="text-lg font-medium">
                    <p>Name: {userInfo.name}</p>
                    <p>Email: {userInfo.email}</p>
                    <p>Created at: {year}-{month}-{day}</p>
                    <p>Role: {toTitleCase(userInfo.roles[0]?.name)}</p>
                </div>
            </section>
            <section className="px-55 mt-15">
                <h3 className="text-xl font-semibold">My Purchases</h3>
                <p>Show the items that user have purchased</p>
            </section>
        </div>
    );
}

export default Account;