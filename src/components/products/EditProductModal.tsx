"use client";

import { Button, Label, Modal, ModalBody, TextInput, Textarea, ModalHeader } from "flowbite-react";
import { useState, useEffect } from "react";
import { updateProduct } from "../../services/productService";
import type { UpdateProductRequest } from "../../models/DTO/products/UpdateProductRequest";
import type { Product } from "../../models/Product.model";
import { toast } from "react-toastify";

interface EditProductModalProps {
    product: Product;
    onClose: () => void;
    onUpdated: () => void; 
}

export function EditProductModal({ product, onClose, onUpdated }: EditProductModalProps) {
    const [openModal, setOpenModal] = useState(true);

    const [name, setName] = useState(product.name);
    const [sku, setSku] = useState(product.SKU);
    const [price, setPrice] = useState(product.price);
    const [quantity, setQuantity] = useState(product.quantity);
    const [description, setDescription] = useState(product.description || "");
    const [categoryId, setCategoryId] = useState(product.categoryId);
    const [imgUrl, setImgUrl] = useState(product.imgUrl || "");

    useEffect(() => {
        setName(product.name);
        setSku(product.SKU);
        setPrice(product.price);
        setQuantity(product.quantity);
        setDescription(product.description || "");
        setCategoryId(product.categoryId);
        setImgUrl(product.imgUrl || "");
    }, [product]);

    const handleUpdateProduct = async () => {
        if (!name || !sku || !price || !quantity || !categoryId) {
            toast.warn('Todos los campos obligatorios deben ser llenados');
            return;
        }

        if (price <= 0) return  toast.warn('El precio debe ser mayor a 0');
        if (quantity <= 0) return toast.warn('La cantidad debe ser mayor a 0');

        const updatedProduct: UpdateProductRequest = {
            name,
            SKU: sku,
            price: Number(price),
            quantity: Number(quantity),
            description: description || null,
            categoryId: Number(categoryId),
            imgUrl
        };

        const res = await updateProduct(product.id, updatedProduct);
        if (res === true) {
            onUpdated();
            setOpenModal(false);
            onClose();
            toast.success('Producto actualizado correctamente');
        } else {
            toast.error('No se ha podido actualizar el producto');
            res.details?.forEach((d: any) =>toast.warn(`Error en ${d.field}: ${d.message}`));
        }
    };

    return (
        <Modal show={openModal} size="md" popup onClose={() => { setOpenModal(false); onClose(); }}>
            <ModalHeader className="flex justify-between items-center">
                <span className="text-xl font-medium text-gray-900 dark:text-white mt-2">
                    Editar producto
                </span>
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Nombre</Label>
                    <TextInput id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre del producto" required />
                </div>
                <div>
                    <Label htmlFor="sku">SKU</Label>
                    <TextInput id="sku" value={sku} onChange={(e) => setSku(e.target.value)} placeholder="SKU del producto" required />
                </div>
                <div>
                    <Label htmlFor="price">Precio</Label>
                    <TextInput id="price" type="number" min={0} value={price} onChange={(e) => setPrice(Number(e.target.value))} placeholder="0" required />
                </div>
                <div>
                    <Label htmlFor="quantity">Cantidad</Label>
                    <TextInput id="quantity" type="number" min={0} value={quantity} onChange={(e) => setQuantity(Number(e.target.value))} placeholder="0" required />
                </div>
                <div>
                    <Label htmlFor="categoryId">Categoría</Label>
                    <TextInput id="categoryId" type="number" min={1} value={categoryId} onChange={(e) => setCategoryId(Number(e.target.value))} placeholder="ID de categoría" required />
                </div>
                <div>
                    <Label htmlFor="imgUrl">Imagen (URL)</Label>
                    <Textarea id="imgurl" value={imgUrl} onChange={(e) => setImgUrl(e.target.value)} placeholder="Imagen (URL)" />
                </div>
                <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Descripción del producto" />
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleUpdateProduct}>Actualizar producto</Button>
                </div>
                </div>
            </ModalBody>
        </Modal>
    );
}
