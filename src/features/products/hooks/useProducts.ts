import { useQuery } from "@tanstack/react-query";
import { getCategories, getProducts } from "../api/getProducts";

export const productsKeys = {
    all: ["products"] as const,
    categories: ["categories"] as const,
};

export const useProducts = () => {
    return useQuery({
        queryKey: productsKeys.all,
        queryFn: getProducts,
    });
};

export const useCategories = () => {
    return useQuery({
        queryKey: productsKeys.categories,
        queryFn: getCategories,
    });
};
