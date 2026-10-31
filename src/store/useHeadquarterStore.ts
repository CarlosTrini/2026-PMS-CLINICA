import type { Headquarters } from '@/types/dataTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HeadquarterStore {
    currentHeadquarter: Headquarters | null;
    setCurrentHeadquarter: (headquarters: Headquarters) => void;
    clearHeadquarter: () => void;
}

export const useHeadquarterStore = create<HeadquarterStore>()(
    persist(
        (set) => ({
            currentHeadquarter: null,
            setCurrentHeadquarter: (headquarter) => set({ currentHeadquarter: headquarter }),
            clearHeadquarter: () => set({ currentHeadquarter: null }),
        }),
        { name: 'currentHeadquarter' },
    ),
);
