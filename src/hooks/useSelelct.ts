"use client";

import { useCallback, useState } from "react";

export const useSelect = (initialState: boolean = false) => {
    const [resetSelectValue, setResetSelectValue] = useState(initialState);
    // const resetSelectFn = useCallback(() => setResetSelectValue(false), []);
    const resetSelectFn = () => {
        setResetSelectValue(true);
        setTimeout(() => setResetSelectValue(false), 1500);
    };

    return { resetSelectValue, resetSelectFn };
};
