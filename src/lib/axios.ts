'use client'
import axios from 'axios';

// Crear URL base dinámicamente
const API_BASE_URL =
    (typeof window !== 'undefined' && window.location.hostname === 'localhost')
        ? 'http://localhost:3000/api/v1'
        : `/api/v1`;


export const apiClient = axios.create({

    baseURL: API_BASE_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Interceptor para agregar el token de autenticación a todas las peticiones
// apiClient.interceptors.request.use(
//     (config) => {
//         const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

//         if (token) {
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );