import { useMemo } from "react";
import { useProducts } from "../hooks/useProducts";
import { useFilterStore } from "../store/filterStore";
import { useSelectionStore } from "../store/selectionStore";
import { ProductCard } from "../components/ProductCard";
import { ProductFilters } from "../components/ProductFilters";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export const ProductsPage = () => {
    const { data: products = [], isLoading, error, refetch } = useProducts();
    const { searchQuery, category, sortBy } = useFilterStore();
    const { selectedProductIds } = useSelectionStore();

    // Derived filtered & sorted data using useMemo to prevent unnecessary recalculations
    const filteredAndSortedProducts = useMemo(() => {
        let result = [...products];

        // 1. Filter by search query (case-insensitive)
        if (searchQuery.trim()) {
            const lowerQuery = searchQuery.toLowerCase();
            result = result.filter((p) =>
                p.title.toLowerCase().includes(lowerQuery)
            );
        }

        // 2. Filter by category
        if (category !== "all") {
            result = result.filter((p) => p.category === category);
        }

        // 3. Sort
        if (sortBy === "price-asc") {
            result = [...result].sort((a, b) => a.price - b.price);
        } else if (sortBy === "price-desc") {
            result = [...result].sort((a, b) => b.price - a.price);
        } else if (sortBy === "rating-desc") {
            result = [...result].sort((a, b) => b.rating.rate - a.rating.rate);
        }

        return result;
    }, [products, searchQuery, category, sortBy]);

    if (error) {
        return (
            <div className="flex flex-col items-center justify-center h-64 space-y-4">
                <p className="text-red-500 font-medium">Failed to load products.</p>
                <Button onClick={() => refetch()} variant="outline">
                    Try Again
                </Button>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border">
                <h2 className="text-xl font-bold text-gray-800">Products Catalog</h2>
                <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600 font-medium">Cart:</span>
                    <span className="bg-primary text-primary-foreground text-xs font-bold px-2 py-1 rounded-full">
                        {selectedProductIds.length}
                    </span>
                </div>
            </div>

            <ProductFilters />

            {isLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col space-y-3">
                            <Skeleton className="h-[250px] w-full rounded-xl" />
                            <div className="space-y-2">
                                <Skeleton className="h-4 w-[250px]" />
                                <Skeleton className="h-4 w-[200px]" />
                            </div>
                        </div>
                    ))}
                </div>
            ) : filteredAndSortedProducts.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-lg border border-dashed">
                    <p className="text-gray-500">No products match your filters.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAndSortedProducts.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};
