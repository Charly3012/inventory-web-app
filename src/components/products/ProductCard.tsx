import { Card, Modal, ModalBody, Button, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { Product } from "../../models/Product.model";
import { deleteProduct } from "../../services/productService";
import { EditProductModal } from "./EditProductModal";
import { toast } from "react-toastify";

interface ProductCardProps {
  product: Product;
  onDeleted?: (id: number) => void;
  onUpdated?: () => void;
}

export default function ProductCard({
  product,
  onDeleted,
  onUpdated,
}: ProductCardProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    try {
      await deleteProduct(product.id);
      toast.success("Producto eliminado correctamente");
      if (onDeleted) {
        onDeleted(product.id);
      }
      setShowDeleteModal(false);
    } catch (error) {
      toast.error("No se ha podido eliminar el producto");
    }
  };

  return (
    <>
      <Card className="max-w-sm">
        <img
          src={product.imgUrl || "/assets/products/default-product.png"}
          alt={product.name}
          className="max-h-100 max-w-full rounded-t-lg object-contain"
        />
        <h5 className="mt-4 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
          {product.name}
        </h5>
        <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
          {product.description}
        </p>

        <div className="mt-2.5 flex items-center">
          <span className="mr-2 ml-3 rounded bg-cyan-100 px-2.5 py-0.5 text-xs font-semibold text-cyan-800 dark:bg-cyan-200 dark:text-cyan-800">
            SKU: {product.SKU}
          </span>
        </div>

        <div className="mt-4 flex items-center justify-between gap-2">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">
            ${product.price}
          </span>

          <div className="flex gap-2">
            <Button
              size="sm"
              color="cyan"
              onClick={() => setShowEditModal(true)}
            >
              Editar
            </Button>
            <Button
              size="sm"
              color="red"
              onClick={() => setShowDeleteModal(true)}
            >
              Eliminar
            </Button>
          </div>
        </div>

        <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
          Stock: {product.quantity}
        </p>
      </Card>

      <Modal
        show={showDeleteModal}
        size="md"
        popup
        onClose={() => setShowDeleteModal(false)}
      >
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <img
              src="/assets/utils/delete-icon.png"
              className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200"
            />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              ¿Estás seguro que quieres eliminar este producto?
            </h3>
            <div className="flex justify-center gap-4">
              <Button color="red" onClick={handleDelete}>
                Sí, eliminar
              </Button>
              <Button color="gray" onClick={() => setShowDeleteModal(false)}>
                Cancelar
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>

      {showEditModal && (
        <EditProductModal
          product={product}
          onClose={() => setShowEditModal(false)}
          onUpdated={onUpdated ? () => onUpdated() : () => {}}
        />
      )}
    </>
  );
}
