import { useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

import { IBeatSaverMapDetail } from '../types/beatsaver'

import { useApiResult } from './use-api'

const BASE_URL = 'https://api.beatsaver.com'
const client = wretch(BASE_URL)

export const useBeatSaverMap = (hash: string | null) => {
    const {
        result: map
    } = useApiResult<IBeatSaverMapDetail>(client, `/maps/hash/${hash}`, !hash)

    return { map }
}