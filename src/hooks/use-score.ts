import { RelayScore, RelayUser } from '../types/relay'

export const useScore = (score?: RelayScore) => {
    const acc = score?.accuracy ? (score.accuracy * 100).toFixed(2) : '0.00'
    const combo = score?.combo || 0

    const misses = 
        (score?.scoreTracker?.notesMissed ?? 0) + 
        (score?.scoreTracker?.bombHits ?? 0)

    const isFC = 
        misses === 0

    return {
        combo,
        acc,
        isFC,
        misses
    }
}