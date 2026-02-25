import { useFilterStore, type SortOption } from "../store/filterStore";
import { useCategories } from "../hooks/useProducts";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const ProductFilters = () => {
    const { searchQuery, category, sortBy, setSearchQuery, setCategory, setSortBy, reset } = useFilterStore();
    const { data: categories = [], isLoading: categoriesLoading } = useCategories();

    return (
        <div className="bg-white p-4 rounded-lg shadow-sm border mb-6 space-y-4 sm:space-y-0 sm:flex sm:items-end sm:space-x-4">
            <div className="flex-1 space-y-1.5">
                <Label htmlFor="search">Search Products</Label>
                <Input
                    id="search"
                    placeholder="e.g. SSD, Jacket..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                />
            </div>

            <div className="w-full sm:w-48 space-y-1.5">
                <Label htmlFor="category">Category</Label>
                <select
                    id="category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="all">All Categories</option>
                    {!categoriesLoading && categories.map((cat) => (
                        <option key={cat} value={cat}>
                            {cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </option>
                    ))}
                </select>
            </div>

            <div className="w-full sm:w-48 space-y-1.5">
                <Label htmlFor="sort">Sort By</Label>
                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value as SortOption)}
                    className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                >
                    <option value="">Default</option>
                    <option value="price-asc">Price: Low to High</option>
                    <option value="price-desc">Price: High to Low</option>
                    <option value="rating-desc">Highest Rated</option>
                </select>
            </div>

            <div className="pb-0.5">
                <button
                    onClick={reset}
                    className="h-9 px-4 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
                >
                    Clear
                </button>
            </div>
        </div>
    );
};
