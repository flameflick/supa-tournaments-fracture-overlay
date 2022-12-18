import { useEffect, useRef, useState } from 'react';
import wretch from 'wretch'

import { IBeatSaverMapDetail } from '../types/beatsaver'

const BASE_URL = 'https://api.beatsaver.com'
const client = wretch(BASE_URL)

export const useBeatSaverMap = (hash: string | null) => {
    const [map, setMap] = useState<IBeatSaverMapDetail | null>(null)

    useEffect(() => {
        if (!hash) return;

        const updateMap = async () => {
            const data = await client.get(`/maps/hash/${hash}`).json<IBeatSaverMapDetail>()
    
            setMap(data)
        }
    
        updateMap()
    }, [hash])

    return { map }
}