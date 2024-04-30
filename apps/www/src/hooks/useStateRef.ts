import { LegacyRef, useCallback, useState } from "react";

export function useStateRef<T>() {

    const [ref, setRef] = useState<T | null>(null)

    const getRef = useCallback((ref: T | LegacyRef<T>) => {
        if (isRefObject(ref)) {
            setRef(ref.current);
            return
        } else {

            setRef(ref as any)
        }
    }, [])
    return [ref, getRef] as const

}

const isRefObject = <T>(ref: any): ref is React.RefObject<T> => typeof ref === 'object' && ref != null && 'current' in ref