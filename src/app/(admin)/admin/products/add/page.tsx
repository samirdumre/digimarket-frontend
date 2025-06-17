import AddProductForm from "@/app/(admin)/admin/products/add/addProductForm.client";

export default function AddProduct() {
    return (
        <div>
            <h1 className="text-5xl font-semibold text-center mb-20 mt-5">Add Product</h1>
            <div>
                <AddProductForm />
            </div>
        </div>
    );
}