import { useEffect, useRef, useState } from 'react'

import { RelayPacketResolvers, RelayPacket, RealtimeScoreRelayPacket, SetTeamsToDisplayRelayPacket, RelayScore, MatchRelayPacket, RelayUser, UserRelayPacket, TeamPointsPacket, RelayTeamWithPoints, UserLeftRelayPacket, AudioPlayerPacket, FinalsPointsPacket } from '@/types/relay'

import { beatSaberLevelIdToHash } from '@/utils/beatsaver'
import { getTeamByUUID } from '@/utils/config'
import structuredClone from '@ungap/structured-clone'


const diffIdToNameMap: Record<number, string> = {
    0: 'easy',
    1: 'normal',
    2: 'hard',
    3: 'expert',
    4: 'expertplus'
}

export const useRelay = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const [team1Id, setTeam1Id] = useState<null | string>('a5e2aace-ad61-4d1a-af8d-b285f2409e02')
    const [team2Id, setTeam2Id] = useState<null | string>('0f84d310-60f0-4de7-b98f-d90ee5b4bced')

    const [userScores, setUserScores] = useState<Record<string, RelayScore>>({})
    const [users, setUsers] = useState<Record<string, RelayUser>>({})

    const [songHash, setSongHash] = useState<null | string>(null)
    const [songDiff, setSongDiff] = useState<null | string>('easy')

    const team1 = getTeamByUUID(team1Id)
    const team2 = getTeamByUUID(team2Id)

    const [teamPoints, setTeamPoints] = useState<null | RelayTeamWithPoints[]>(null)
    
    const [team1FinalsPoints, setTeam1FinalsPoints] = useState<number>(0)
    const [team2FinalsPoints, setTeam2FinalsPoints] = useState<number>(0)

    const [audioPlayerIndex, setAudioPlayerIndex] = useState(0)

    const resolvePacket = (packetData: RelayPacket) => {
        const resolvers: RelayPacketResolvers = {
            'setAudioPlayer': (data: AudioPlayerPacket) => {
                setAudioPlayerIndex(data.player - 1)
            },
        
            'setTeamsToDisplay': (data: SetTeamsToDisplayRelayPacket) => {
                setTeam1Id(data.team1)
                setTeam2Id(data.team2)
            },

            'score': (data: RealtimeScoreRelayPacket) => {
                const newScores = structuredClone(userScores)
                const newUsers = structuredClone(users)

                newScores[data.user.platformId] = data.score
                newUsers[data.user.platformId] = data.user
                
                setUsers(oldUsers => ({...oldUsers, ...newUsers}))
                setUserScores(oldScores => ({...oldScores, ...newScores}))
            },

            'match': (data: MatchRelayPacket) => {
                setSongHash(beatSaberLevelIdToHash(data.song?.id))
                setSongDiff(diffIdToNameMap[data.song?.difficulty])

                setUsers(_ => {
                    const newUsers: Record<string, RelayUser> = {}

                    for (const player of data.players) {
                        newUsers[player.platformId] = player
                    }

                    return newUsers
                })
            },

            'user': (data: UserRelayPacket) => {
                const newUser = structuredClone(data.user)

                setUsers(oldUsers => ({...oldUsers, [newUser.platformId]: newUser}))
            },

            'points': (data: TeamPointsPacket) => {
                setTeamPoints(data.teams)
            },

            'setFinalsPoints': (data: FinalsPointsPacket) => {
                setTeam1FinalsPoints(data.team1)
                setTeam2FinalsPoints(data.team2)
            },

            'userLeft': (data: UserLeftRelayPacket) => {}
        }

        if (!(packetData.type in resolvers)) return
        resolvers[packetData.type](packetData)
    }

    useEffect(() => {
        const client = new WebSocket('ws://localhost:9090/')

        client.addEventListener('message', packet => {
            const data = JSON.parse(packet.data) as RelayPacket

            resolvePacket(data)
        })

        client.addEventListener('open', _ => setIsConnected(true))
        client.addEventListener('error', e => console.error(e))

        return () => {
            client.close()
            setIsConnected(false)
        }
    }, [])

    return {
        team1,
        team2,

        team1FinalsPoints,
        team2FinalsPoints,

        teamPoints,
        audioPlayerIndex,

        userScores,
        users,

        songHash,
        songDiff
    }
}