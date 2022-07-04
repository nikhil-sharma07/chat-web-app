import { useCallback, useState } from "react";

export function useModalState(defaultValue = false){
    const [state, setState] = useState(defaultValue);

    const open = useCallback(() => setState(true), []);
    const close = useCallback(() => setState(false), []);

    return { state, open, close };
}