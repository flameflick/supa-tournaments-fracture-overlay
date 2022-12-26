import { useEffect, useRef, useState } from 'react'

import { RelayPacketResolvers, RelayPacket, RealtimeScoreRelayPacket, SetTeamsToDisplayRelayPacket, RelayScore } from '@/types/relay'

export const useRelay = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const [team1Id, setTeam1Id] = useState<null | string>(null)
    const [team2Id, setTeam2Id] = useState<null | string>(null)

    const [userScores, setUserScores] = useState<Record<string, RelayScore>>({})

    const resolvePacket = (packetData: RelayPacket) => {
        const resolvers: RelayPacketResolvers = {
            'score': (data: RealtimeScoreRelayPacket) => {
                const newScores = { ...userScores }

                newScores[data.user.platformId] = data.score

                setUserScores(newScores)
            },

            'setTeamsToDisplay': (data: SetTeamsToDisplayRelayPacket) => {
                setTeam1Id(data.team1)
                setTeam2Id(data.team2)
            }
        }

        resolvers[packetData.type]()
    }

    const client = new WebSocket('ws://localhost:9090/')

    client.addEventListener('message', packet => {
        const data = JSON.parse(packet.data) as RelayPacket

        resolvePacket(data)
    })

    client.addEventListener('open', _ => {
        setIsConnected(true)
    })

    useEffect(() => {
        return () => {
            client.close()
            setIsConnected(false)
        }
    }, [])

    return {
        team1Id,
        team2Id,

        userScores
    }
}