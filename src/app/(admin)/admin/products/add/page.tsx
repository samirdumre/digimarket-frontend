import AddProductForm from "@/components/admin/addProductForm.client";
import {getCategories} from "@/app/(admin)/admin/products/add/actions";

export default async function AddProduct() {
    const categories = await getCategories();
    return (
        <div>
            <h1 className="text-5xl font-semibold text-center mb-20 mt-5">Add Product</h1>
            <div>
                <AddProductForm categories={categories} />
            </div>
        </div>
    );
}