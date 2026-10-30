
import { UserSession } from '@/types/dataTypes';
import { createJSONStorage, persist } from 'zustand/middleware';
import { create } from 'zustand';
import { RoleSystem } from '@/types/dataTypes';



interface UserStore {
    userRole: RoleSystem;
    setUserRole: (userRole: RoleSystem) => void;
    userInfo: UserSession | null;
    setUserInfo: (user: UserSession) => void;
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
