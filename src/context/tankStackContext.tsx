"use client"
import { useState } from "react";
// QUERY
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// CLIENTE DEL CUERIIIII
// se maneje en un state para que no se reinicia en cada render
// const queryClient = new QueryClient();


// const TankStackContext = createContext<QueryClient | undefined>(undefined);

export default function TankStackProvider({ children }: { children: React.ReactNode }) {

    const [queryClient] = useState(() => new QueryClient({
        defaultOptions: {
            queries: {
                staleTime: 60 * 1000, // 1 minuto
                refetchOnWindowFocus: false,
                retry: 1
            },
        },
    }));


    return (
        <>
            <QueryClientProvider client={queryClient}>
                {children}
            </QueryClientProvider>
        </>
    );
}