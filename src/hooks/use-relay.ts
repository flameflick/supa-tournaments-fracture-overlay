import { useEffect, useRef, useState } from 'react'

import { RelayPacketResolvers, RelayPacket, RealtimeScoreRelayPacket, SetTeamsToDisplayRelayPacket, RelayScore, MatchRelayPacket, RelayUser } from '@/types/relay'

import { beatSaberLevelIdToHash } from '@/utils/beatsaver'

const diffIdToNameMap: Record<number, string> = {
    0: 'easy',
    1: 'normal',
    2: 'hard',
    3: 'expert',
    4: 'expertplus'
}

export const useRelay = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const [team1Id, setTeam1Id] = useState<null | string>(null)
    const [team2Id, setTeam2Id] = useState<null | string>(null)

    const [userScores, setUserScores] = useState<Record<string, RelayScore>>({})
    const [users, setUsers] = useState<Record<string, RelayUser>>({})

    const [songHash, setSongHash] = useState<null | string>(null)
    const [songDiff, setSongDiff] = useState<null | string>('easy')

    const resolvePacket = (packetData: RelayPacket) => {
        const resolvers: RelayPacketResolvers = {
            'score': (data: RealtimeScoreRelayPacket) => {
                const newScores = structuredClone(userScores)
                const newUsers = structuredClone(users)

                newScores[data.user.platformId] = data.score
                newUsers[data.user.platformId] = data.user
                
                setUsers(oldUsers => ({...oldUsers, ...newUsers}))
                setUserScores(oldScores => ({...oldScores, ...newScores}))
            },

            'setTeamsToDisplay': (data: SetTeamsToDisplayRelayPacket) => {
                setTeam1Id(data.team1)
                setTeam2Id(data.team2)
            },

            'match': (data: MatchRelayPacket) => {
                setSongHash(beatSaberLevelIdToHash(data.song?.id))
                setSongDiff(diffIdToNameMap[data.song?.difficulty])
            }
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
        team1Id,
        team2Id,

        userScores,
        users,

        songHash,
        songDiff
    }
}