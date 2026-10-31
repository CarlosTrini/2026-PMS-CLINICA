import type { RoleSystem, UserSystem } from '@/types/dataTypes';
import { persist } from 'zustand/middleware';
import { create } from 'zustand';




interface UserStore {
    userRole: RoleSystem;
    setUserRole: (userRole: RoleSystem) => void;
    userInfo: UserSystem | null;
    setUserInfo: (user: UserSystem) => void;
    token: string | null;
    setToken: (token: string) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
    clearAllSession: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set) => ({
            userRole: 'no_role',
            setUserRole: (userRole) => set({ userRole }),
            userInfo: null,
            setUserInfo: (userInfo) => set({ userInfo }),
            token: null,
            setToken: (token) => set({ token }),
            isAuthenticated: false,
            setIsAuthenticated: (isAuthenticated) => set({ isAuthenticated }),
            clearAllSession: () => {
                set({
                    userInfo: null,
                    token: null,
                    isAuthenticated: false,
                });
            }
        }),
        {
            name: 'auth-session', // Nombre de la clave
        }
    )
);
