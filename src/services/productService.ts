import axios from "axios";
import type { PaginatedResult } from "../models/DTO/utils/PaginatedResult";
import { Product } from "../models/Product.model";
import type { CreateProductRequest } from "../models/DTO/products/CreateProductRequest";
import type { UpdateProductRequest } from "../models/DTO/products/UpdateProductRequest";

const API_URL = window._env_.VITE_API_URL;

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const getProducts = async (limit: number = 10, page: number = 1, search: string = ""): Promise<PaginatedResult<Product>> => {
    try {
        const response = await api.get<PaginatedResult<Product>>(`/v1/product/?limit=${limit}&page=${page}&search=${search}`);
        return response.data;
    } catch (error) {
        throw new Error('Error fetching products');
    }
}

export const createProduct = async (request: CreateProductRequest): Promise<any> => {
    try {
        const res = await axios.post(`${API_URL}/v1/product`, request);
        if (res.status === 201) {
            return true;
        }
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data;
        }
        throw new Error('Error creating product');
    }
}

export const updateProduct = async (id: number, request: UpdateProductRequest): Promise<any> => {
    try {
        const res = await axios.put(`${API_URL}/v1/product/${id}`, request);
        if (res.status === 200) {
            return true;
        }
    } catch (error: any) {
        if (error.response?.data) {
            return error.response.data;
        }
        throw new Error('Error updating product');
    }
}

export const deleteProduct = async (id: number): Promise<boolean> => {
    try {
        const res = await axios.delete(`${API_URL}/v1/product/${id}`);
        if (res.status === 204) {
            return true;
        }

        return false;
    } catch (error) {
        throw new Error('Error deleting product');
    }
}