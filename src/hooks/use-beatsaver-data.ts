import { useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

import { IBeatSaverMapDetail } from '../types/beatsaver'

import { useApiResult } from './use-api'
import { intervalToDuration, addSeconds, format } from 'date-fns'

const BASE_URL = 'https://api.beatsaver.com'
const client = wretch(BASE_URL)

export const useBeatSaverMap = (hash: string | null) => {
    const {
        result: map
    } = useApiResult<IBeatSaverMapDetail>(client, `/maps/hash/${hash}`, !hash)

    const previewImage = map?.versions[0].coverURL
    const mapDuration = map ? format(addSeconds(new Date(0), map.metadata.duration), 'm:ss') : ''

    return { map, previewImage, mapDuration }
}