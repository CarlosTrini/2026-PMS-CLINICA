"use client";

import { useCallback, useState } from "react";

export const useSelect = (initialState: boolean = false) => {
    const [resetSelectValue, setResetSelectValue] = useState(initialState);

    const resetSelectFn = useCallback(() => setResetSelectValue((prev) => !prev), []);

    return { resetSelectValue, resetSelectFn };
};
