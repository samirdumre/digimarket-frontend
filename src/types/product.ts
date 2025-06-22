export interface Product {
    id: number;
    title: string;
    description: string;
    short_description: string;
    price: string; // API returns as string
    download_count: number;
    quantity: number;
    thumbnail: string;
    images: string[];
    category_id: number;
    seller_id: number;
}

export interface ProductsResponse {
    success: boolean;
    data: Product[];
    message: string;
}
