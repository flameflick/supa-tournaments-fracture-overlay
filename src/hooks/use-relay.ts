import { useEffect, useRef, useState } from 'react'

import { RelayPacketResolvers, RelayPacket, RealtimeScoreRelayPacket, SetTeamsToDisplayRelayPacket, RelayScore, MatchRelayPacket, RelayUser, UserRelayPacket } from '@/types/relay'

import { beatSaberLevelIdToHash } from '@/utils/beatsaver'
import { getTeamByUUID } from '@/utils/config'

const diffIdToNameMap: Record<number, string> = {
    0: 'easy',
    1: 'normal',
    2: 'hard',
    3: 'expert',
    4: 'expertplus'
}

export const useRelay = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const [team1Id, setTeam1Id] = useState<null | string>('9fec2903-3eb1-4995-8427-d0c7770337ae')
    const [team2Id, setTeam2Id] = useState<null | string>('aa2296c4-3a67-458c-bc77-89b1346b465a')

    const [userScores, setUserScores] = useState<Record<string, RelayScore>>({})
    const [users, setUsers] = useState<Record<string, RelayUser>>({})

    const [songHash, setSongHash] = useState<null | string>(null)
    const [songDiff, setSongDiff] = useState<null | string>('easy')

    const team1 = getTeamByUUID(team1Id)
    console.log(team1, team1Id)
    const team2 = getTeamByUUID(team2Id)

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
                console.log(data)
                setTeam1Id(data.team1)
                setTeam2Id(data.team2)
            },

            'match': (data: MatchRelayPacket) => {
                setSongHash(beatSaberLevelIdToHash(data.song?.id))
                setSongDiff(diffIdToNameMap[data.song?.difficulty])
            },

            'user': (data: UserRelayPacket) => {
                console.log('new user pog')
                
                const newUser = structuredClone(data.user)

                setUsers(oldUsers => ({...oldUsers, [newUser.platformId]: newUser}))
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
        team1,
        team2,

        userScores,
        users,

        songHash,
        songDiff
    }
}