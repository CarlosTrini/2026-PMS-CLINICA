"use client";

import { useCallback, useState } from "react";

export const useSelect = (initialState: boolean = false) => {
    const [resetSelectValue, setResetSelectValue] = useState(initialState);
    const resetSelectFn = useCallback(() => {
        setResetSelectValue(true);
        setResetSelectValue(false);// se regresa a false para que al resetear otravez, lo haga
    }, []);

    return { resetSelectValue, resetSelectFn };
};
