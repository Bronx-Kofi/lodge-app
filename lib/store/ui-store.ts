import { create } from 'zustand';

interface UIState {
    isResilienceOpen: boolean;
    openResilience: () => void;
    closeResilience: () => void;
    toggleResilience: () => void;
}

export const useUIStore = create<UIState>((set) => ({
    isResilienceOpen: false,
    openResilience: () => set({ isResilienceOpen: true }),
    closeResilience: () => set({ isResilienceOpen: false }),
    toggleResilience: () => set((state) => ({ isResilienceOpen: !state.isResilienceOpen })),
}));
