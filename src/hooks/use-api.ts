import { useEffect, useRef, useState } from 'react'
import wretch, { Wretch } from 'wretch'

export const useApiResult = <T>(client: Wretch, url: string, skip: boolean) => {
    const [result, setResult] = useState<T | null>(null)

    useEffect(() => {
        if (skip) return;

        const update = async () => {
            const data = await client.get(url).json<T>()
    
            setResult(data)
        }
    
        update()
    }, [skip, url])

    return { result }
}