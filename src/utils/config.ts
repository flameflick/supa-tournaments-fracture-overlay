import { default as streamLinkMap } from '@/configs/stream-links.json'
import { default as teamsConfig } from '@/configs/teams.json'

import { ITeam } from '@/types/configs'

export const getPlayerTwitchUsername = (platformId: string): string => {
    if (!(platformId in streamLinkMap)) return ''

    // @ts-expect-error
    return streamLinkMap[platformId]
}

export const getTeamByUUID = (taUUID: string | null): ITeam | null => {
    if (!taUUID) return null

    const team = teamsConfig.find(i => i.id === taUUID)
    return team || null
}