import { apiClient } from "@/lib/axios";
import type { authLoginData } from "../schemas/authLoginSchema";
// import type { authRegisterData } from "../schemas/authRegisterSchema";


export const AuthActionsService = {

    // async registerUserSystem(userData: authRegisterData) {
    //     const response = await apiClient.post('/auth/register', userData);
    //     return response;
    // },

    async loginUserSystem(userData: authLoginData) {
        const response = await apiClient.post('/auth/login', userData);
        return response;
    }

}
