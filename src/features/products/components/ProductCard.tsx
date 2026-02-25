import type { Product } from "../types";
import { useSelectionStore } from "../store/selectionStore";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { memo } from "react";

interface ProductCardProps {
    product: Product;
}

export const ProductCard = memo(({ product }: ProductCardProps) => {
    const { selectedProductIds, toggleSelection } = useSelectionStore();
    const isSelected = selectedProductIds.includes(product.id);

    return (
        <Card className={`flex flex-col h-full overflow-hidden transition-all duration-200 hover:shadow-lg ${isSelected ? 'ring-2 ring-primary ring-offset-2' : ''}`}>
            <div className="bg-white p-6 justify-center flex h-64 border-b">
                <img
                    src={product.image}
                    alt={product.title}
                    className="object-contain h-full max-w-full drop-shadow-sm transition-transform duration-300 hover:scale-105"
                />
            </div>
            <CardHeader className="flex-none pb-2">
                <div className="flex justify-between items-start gap-2 mb-2">
                    <Badge variant="secondary" className="truncate shrink-0">
                        {product.category}
                    </Badge>
                    <div className="flex items-center text-sm font-medium text-amber-500 shrink-0 bg-amber-50 px-2 py-0.5 rounded-full">
                        <span className="mr-1">★</span>
                        {product.rating.rate} <span className="text-gray-400 text-xs ml-1">({product.rating.count})</span>
                    </div>
                </div>
                <CardTitle className="text-lg line-clamp-2 leading-tight" title={product.title}>
                    {product.title}
                </CardTitle>
            </CardHeader>
            <CardContent className="flex-grow">
                <CardDescription className="line-clamp-3 text-sm">
                    {product.description}
                </CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center mt-auto pt-4 border-t bg-gray-50/50">
                <span className="text-xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                <Button
                    variant={isSelected ? "destructive" : "default"}
                    onClick={() => toggleSelection(product.id)}
                    className="transition-colors w-28"
                >
                    {isSelected ? "Remove" : "Add to Cart"}
                </Button>
            </CardFooter>
        </Card>
    );
});

ProductCard.displayName = "ProductCard";
