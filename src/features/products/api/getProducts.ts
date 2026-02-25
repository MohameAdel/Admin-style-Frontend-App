import { api } from "@/lib/axios";
import type { Product } from "../types";

export const getProducts = async (): Promise<Product[]> => {
    return await api.get("/products");
};

export const getCategories = async (): Promise<string[]> => {
    return await api.get("/products/categories");
};
