"use client";

import { Button, Label, Modal, ModalBody, TextInput, Textarea, ModalHeader } from "flowbite-react";
import { useRef, useState } from "react";
import { createProduct } from "../../services/productService";
import type { CreateProductRequest } from "../../models/DTO/products/CreateProductRequest";
import { toast } from "react-toastify";

interface ProductModalProps {
    onClose: () => void;
    onAdded: () => void;
}

export function CreateProductoModal({ onClose, onAdded }: ProductModalProps) {
    const [openModal, setOpenModal] = useState(true);

    const nameRef = useRef<HTMLInputElement>(null);
    const skuRef = useRef<HTMLInputElement>(null);
    const priceRef = useRef<HTMLInputElement>(null);
    const quantityRef = useRef<HTMLInputElement>(null);
    const categoryRef = useRef<HTMLInputElement>(null);
    const descRef = useRef<HTMLTextAreaElement>(null);
    const imgUrlRef = useRef<HTMLTextAreaElement>(null);

    const handleAddProduct = async () => {
        if (!nameRef.current?.value.trim()) return toast.warn("El nombre es obligatorio");
        if (!skuRef.current?.value.trim()) return toast.warn("El SKU es obligatorio");
        if (!priceRef.current?.value || Number(priceRef.current.value) <= 0) return toast.warn("El precio debe ser mayor a 0");
        if (!quantityRef.current?.value || Number(quantityRef.current.value) <= 0) return toast.warn("La cantidad debe ser mayor a 0");
        if (!categoryRef.current?.value.trim()) return toast.warn("La categoría es obligatoria");

        const newProduct: CreateProductRequest = {
            name: nameRef.current.value,
            SKU: skuRef.current.value,
            price: Number(priceRef.current.value),
            quantity: Number(quantityRef.current.value),
            categoryId: Number(categoryRef.current.value),
            description: descRef.current?.value,
            imgUrl: imgUrlRef.current?.value
        };

        try {
            const res = await createProduct(newProduct);
            if(res === true){
                onAdded();
                setOpenModal(false);
                onClose();
                toast.success('Producto agregado correctamente');
            }else {
                toast.error('No se ha podido crear el producto');
                res.details?.forEach((d: any) => toast.warn(`Error en ${d.field}: ${d.message}`));
            }

        } catch (error: any) {
            toast.error("Error al crear el producto");
        }
        
    };

    return (
        <Modal show={openModal} size="md" popup onClose={() => { setOpenModal(false); onClose(); }}>
            <ModalHeader className="flex justify-between items-center">
                <span className="text-xl font-medium text-gray-900 dark:text-white mt-2">
                    Agregar producto
                </span>
            </ModalHeader>
            <ModalBody>
                <div className="space-y-4">
                <div>
                    <Label htmlFor="name">Nombre</Label>
                    <TextInput id="name" ref={nameRef} placeholder="Nombre del producto" required />
                </div>
                <div>
                    <Label htmlFor="sku">SKU</Label>
                    <TextInput id="sku" ref={skuRef} placeholder="SKU del producto" required />
                </div>
                <div>
                    <Label htmlFor="price">Precio</Label>
                    <TextInput id="price" ref={priceRef} type="number" min={0} placeholder="0" required />
                </div>
                <div>
                    <Label htmlFor="quantity">Cantidad</Label>
                    <TextInput id="quantity" ref={quantityRef} type="number" min={0} placeholder="0" required />
                </div>
                <div>
                    <Label htmlFor="categoryId">Categoría</Label>
                    <TextInput id="categoryId" ref={categoryRef} type="number" min={1} placeholder="ID de categoría" required />
                </div>
                <div>
                    <Label htmlFor="imgUrl">Imagen (URL)</Label>
                    <Textarea id="imgurl" ref={imgUrlRef} placeholder="Imagen (URL)" />
                </div>
                <div>
                    <Label htmlFor="description">Descripción</Label>
                    <Textarea id="description" ref={descRef} placeholder="Descripción del producto" />
                </div>
                <div className="flex justify-end">
                    <Button onClick={handleAddProduct}>Agregar producto</Button>
                </div>
                </div>
            </ModalBody>
        </Modal>

    );
}
