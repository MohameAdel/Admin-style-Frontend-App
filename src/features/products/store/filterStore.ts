import { create } from "zustand";

export type SortOption = "price-asc" | "price-desc" | "rating-desc" | "";

interface FilterState {
    searchQuery: string;
    category: string;
    sortBy: SortOption;
    setSearchQuery: (query: string) => void;
    setCategory: (category: string) => void;
    setSortBy: (sort: SortOption) => void;
    reset: () => void;
}

export const useFilterStore = create<FilterState>()((set) => ({
    searchQuery: "",
    category: "all",
    sortBy: "",
    setSearchQuery: (query) => set({ searchQuery: query }),
    setCategory: (category) => set({ category }),
    setSortBy: (sort) => set({ sortBy: sort }),
    reset: () => set({ searchQuery: "", category: "all", sortBy: "" }),
}));
