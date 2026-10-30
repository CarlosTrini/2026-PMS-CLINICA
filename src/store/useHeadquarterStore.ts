import type { Headquarters } from '@/types/dataTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HeadquarterStore {
    headquarters: Headquarters | null;
    setHeadquarters: (headquarters: Headquarters) => void;
    clearHeadquarters: () => void;
}

export const useHeadquarterStore = create<HeadquarterStore>()(
    persist(
        (set) => ({
            headquarters: null,
            setHeadquarters: (headquarters) => set({ headquarters }),
            clearHeadquarters: () => set({ headquarters: null }),
        }),
        { name: 'headquarter' },
    ),
);
