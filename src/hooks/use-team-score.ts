import { RelayScore } from "@/types/relay";

const TEAM_SIZE = 3

export const useTeamScore = (scores: RelayScore[] | null) => {
    const composedScore = {
        combinedAcc: '0',
        combinedScore: 0,
        fullComboCount: 0
    }

    if (!scores) return composedScore

    composedScore.combinedAcc = ((scores.reduce(
        (a, b) => a + (b ? b.accuracy! : 0)
    , 0) / TEAM_SIZE) * 100).toFixed(2)
    
    composedScore.combinedScore = scores.reduce(
        (a, b) => a + (b ? b.score! : 0)
    , 0)
    
    composedScore.fullComboCount = scores.filter(
        i => i ? (i.scoreTracker?.notesMissed! + i.scoreTracker?.bombHits!) === 0 : false
    ).length

    return composedScore
}