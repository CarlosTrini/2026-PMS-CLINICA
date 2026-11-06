'use client'

import { useState, useEffect } from "react";
export const useIsMobile = (sizeWindow: number = 800) => {

    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < sizeWindow);
        };
        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [sizeWindow]);

    return { isMobile };
}