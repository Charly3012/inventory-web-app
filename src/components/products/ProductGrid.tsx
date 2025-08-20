import { useEffect, useState } from "react";
import { Product } from "../../models/Product.model";
import { getProducts } from "../../services/productService";
import ProductCard from "./ProductCard";
import { Pagination, TextInput } from "flowbite-react";
import { toast } from "react-toastify";

interface ProductGridProps {
    reload?: boolean;
}

const ProductGrid = ({ reload }: ProductGridProps) => {
    const [products, setProducts] = useState<Product[]>([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalItems, setTotalItems] = useState(0);
    const [itemsPerPage, setItemsPerPage] = useState(12);
    const [search, setSearch] = useState("");

    const fetchProducts = async (page: number, limit: number, searchTerm: string) => {
        try {
            const res = await getProducts(limit, page, searchTerm);
            setProducts(res.items);
            setTotalItems(res.totalItems);
        } catch (error) {
            toast.error('No se ha podido consultar los productos, intente mas tarde.')
        }
    };

    useEffect(() => {
        fetchProducts(currentPage, itemsPerPage, search);
    }, [currentPage, itemsPerPage, reload, search]);

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        if (value > 0) {
            setItemsPerPage(value);
            setCurrentPage(1);
        }
    };

    const handleDeleted = (id: number) => {
        setProducts((prev) => prev.filter((p) => p.id !== id));
    };

    const handleUpdated = () => {
        fetchProducts(currentPage, itemsPerPage, search);
    };

    return (
        <div className="flex flex-col gap-6 p-6">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-2">
            <TextInput
            placeholder="Buscar productos..."
            value={search}
            onChange={(e) => {
                setSearch(e.target.value);
                setCurrentPage(1);
            }}
            className="w-full sm:w-1/2"
            />

            <div className="flex items-center gap-2">
            <label className="text-gray-700 dark:text-gray-300">Items por página:</label>
            <input
                type="number"
                min={1}
                value={itemsPerPage}
                onChange={handleItemsPerPageChange}
                className="w-20 rounded border-gray-300 px-2 py-1 dark:bg-gray-700 dark:text-white"
            />
            </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((p) => (
            <ProductCard
                key={p.id}
                product={p}
                onDeleted={handleDeleted}
                onUpdated={handleUpdated}
            />
            ))}
        </div>

        <div className="flex justify-center">
            <Pagination
            layout="table"
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalItems={totalItems}
            onPageChange={handlePageChange}
            showIcons
            />
        </div>
        </div>
    );
};

export default ProductGrid;
