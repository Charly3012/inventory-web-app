export interface CreateProductRequest {
    name: string
    SKU: string;
    quantity: number;
    price: number;
    description?: string | null;
    categoryId: number;
    imgUrl?: string | null;
}