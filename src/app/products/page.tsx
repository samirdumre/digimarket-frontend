import {logoutUser} from "@/actions/authActions";
import Button from "@/components/common/button";

function Products() {
    return (
        <div>
            <form action={logoutUser}>
            <Button type="submit" size="sm" variant="destructive">Logout</Button>
            </form>
        </div>
    );
}

export default Products;