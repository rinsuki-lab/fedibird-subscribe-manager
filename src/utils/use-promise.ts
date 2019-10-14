import { useState, useRef, useEffect } from "react";

export function usePromise<Params extends unknown[], ReturnValue>(promiseGenerator: (...p: Params) => Promise<ReturnValue>, params: Params): ReturnValue | undefined {
    const [res, setRes] = useState<ReturnValue>()
    useEffect(() => {
        var unmounted = false
        setRes(undefined)
        promiseGenerator(...params).then(r => {
            if (unmounted) return
            setRes(r)
        })
        return () => {
            unmounted = true
        }
    }, [...params])
    return res
}