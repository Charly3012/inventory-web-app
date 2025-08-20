import ProductGrid from "../components/products/ProductGrid";
import { useState } from "react";
import { Button } from "flowbite-react";
import { CreateProductoModal } from "../components/products/CreateProductModal";

const Products = () => {
  const [showModal, setShowModal] = useState(false);
  const [reload, setReload] = useState(false);

  return (
    <div className="flex h-full w-full flex-col p-4">
      <div className="mb-4 flex flex-wrap items-center justify-between">
        <h1 className="ml-8 text-2xl font-bold">Gestión de Productos</h1>
        <Button
          onClick={() => setShowModal(true)}
          className="mr-10 px-4 py-2 text-sm md:text-base"
        >
          Agregar producto
        </Button>
      </div>

      {showModal && (
        <CreateProductoModal
          onClose={() => setShowModal(false)}
          onAdded={() => setReload(!reload)}
        />
      )}
      <ProductGrid reload={reload} />
    </div>
  );
};

export default Products;
