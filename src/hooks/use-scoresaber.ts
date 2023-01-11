import { useEffect, useRef, useState } from 'react'
import wretch from 'wretch'

import { IScoreSaberBasicPlayer } from '../types/scoresaber'
import { useApiResult } from './use-api'

const BASE_URL = 'https://scoresaber.com/api'
const client = wretch(BASE_URL)

export const useScoreSaberPlayer = (id: string | null) => {
    const {
        result: player
    } = useApiResult<IScoreSaberBasicPlayer>(client, `/player/${id}/basic`, !id)

    return { player }
}