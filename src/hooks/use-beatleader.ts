import { useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

import { IBeatLeaderUser } from '../types/beatleader'

import { useApiResult } from './use-api'

const BASE_URL = 'https://api.beatleader.xyz'
const client = wretch(BASE_URL)

export const useBeatLeaderPlayer = (id: string | null) => {
    const {
        result: player
    } = useApiResult<IBeatLeaderUser>(client, `/player/${id}`, !id)

    return { player }
}