import { useEffect, useRef } from 'react'

export const usePrevious = <T>(value: T) => {
    const prevRef = useRef<null | T>(null)
    
    useEffect(() => {
        prevRef.current = value
    }, [ value ])

    return prevRef.current
}