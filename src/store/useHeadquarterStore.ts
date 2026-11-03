import type { Headquarters, Personal } from '@/types/dataTypes';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface HeadquarterStore {
    currentHeadquarter: Headquarters | null; // almacena la información completa de la sede seleccionada por el usuario
    setCurrentHeadquarter: (headquarters: Headquarters) => void;
    allHeadquarters: Personal['locationAssignments'] | null; // guarda la información parcial de las sedes a las que pertenece el usuario
    setAllHeadquarters: (headquarters: Personal['locationAssignments']) => void;
    showOverlay: boolean; // controla la visibilidad del overlay de selección de sede para el caso de que el usuario tenga más de una sede asignada
    setShowOverlay: (show: boolean) => void;
    clearHeadquarter: () => void;
}

export const useHeadquarterStore = create<HeadquarterStore>()(
    persist(
        (set) => ({
            currentHeadquarter: null,
            setCurrentHeadquarter: (headquarter) => set({ currentHeadquarter: headquarter }),
            allHeadquarters: null,
            setAllHeadquarters: (headquarters) => set({ allHeadquarters: headquarters }),
            clearHeadquarter: () => set({ currentHeadquarter: null, allHeadquarters: null, showOverlay: false }),
            showOverlay: false,
            setShowOverlay: (show) => set({ showOverlay: show }),
        }),
        { name: 'currentHeadquarter' },
    ),
);
