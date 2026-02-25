import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SelectionState {
    selectedProductIds: number[];
    toggleSelection: (id: number) => void;
    clearSelection: () => void;
}

export const useSelectionStore = create<SelectionState>()(
    persist(
        (set) => ({
            selectedProductIds: [],
            toggleSelection: (id) =>
                set((state) => {
                    const isSelected = state.selectedProductIds.includes(id);
                    return {
                        selectedProductIds: isSelected
                            ? state.selectedProductIds.filter((productId) => productId !== id)
                            : [...state.selectedProductIds, id],
                    };
                }),
            clearSelection: () => set({ selectedProductIds: [] }),
        }),
        {
            name: "selection-storage",
        }
    )
);
