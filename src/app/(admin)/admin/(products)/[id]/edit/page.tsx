import AddProductForm from "@/components/admin/addProductForm.client";
import {getCategories, getProductById} from "@/app/(admin)/admin/(products)/actions";
import {Product} from "@/types/product";

export default async function EditProduct({params}) {
    const {id} = await params;

    const productToEdit: Product = await getProductById(id);
    const categories = await getCategories();

    return (
        <div><h1 className="text-5xl font-semibold text-center mb-20 mt-5">Edit Product</h1>
            <div>
                <AddProductForm categories={categories} inputData={productToEdit} id={id}/>
            </div>
        </div>
    );
}
