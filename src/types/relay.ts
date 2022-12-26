import { Packets, Models } from 'tournament-assistant-client'

export type RelayUser = {
    guid: string
    name: string

    team: {
        id: string
        name: string
    }

    platformId: string
    downloaded: Models.User.DownloadStates
    playState: Models.User.PlayStates
}

export type RelaySong = {
    difficulty: number
    id: string
    name: string
}

export type RelayScore = Packets.Push.RealtimeScore['toObject']

export type RealtimeScoreRelayPacket = {
    type: 'score'

    score: RelayScore
    user: RelayUser
}

export type MatchRelayPacket = {
    type: 'match'

    coordinator: string

    players: RelayUser[]
    song: RelaySong
}

export type SetTeamsToDisplayRelayPacket = {
    type: 'setTeamsToDisplay'

    team1: string
    team2: string
}

export type RelayPacket = RealtimeScoreRelayPacket | SetTeamsToDisplayRelayPacket | MatchRelayPacket

export type RelayPacketResolvers = Record<RelayPacket['type'], Function>