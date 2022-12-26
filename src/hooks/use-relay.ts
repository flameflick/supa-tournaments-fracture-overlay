import { useEffect, useRef, useState } from 'react'

import { RelayPacketResolvers, RelayPacket, RealtimeScoreRelayPacket, SetTeamsToDisplayRelayPacket, RelayScore, MatchRelayPacket } from '@/types/relay'

import { beatSaberLevelIdToHash } from '@/utils/beatsaver'

export const useRelay = () => {
    const [isConnected, setIsConnected] = useState<boolean>(false)

    const [team1Id, setTeam1Id] = useState<null | string>(null)
    const [team2Id, setTeam2Id] = useState<null | string>(null)

    const [userScores, setUserScores] = useState<Record<string, RelayScore>>({})
    const [songHash, setSongHash] = useState<null | string>(null)

    const resolvePacket = (packetData: RelayPacket) => {
        const resolvers: RelayPacketResolvers = {
            'score': (data: RealtimeScoreRelayPacket) => {
                const newScores = { ...userScores }

                console.log(newScores, data.user.platformId)

                newScores[data.user.platformId] = data.score

                setUserScores(oldScores => ({...oldScores, ...newScores}))
            },

            'setTeamsToDisplay': (data: SetTeamsToDisplayRelayPacket) => {
                setTeam1Id(data.team1)
                setTeam2Id(data.team2)
            },

            'match': (data: MatchRelayPacket) => {
                console.log(data.song.id)
                console.log(beatSaberLevelIdToHash(data.song.id))
                setSongHash(beatSaberLevelIdToHash(data.song.id))
            }
        }

        console.info(packetData);
        if (!(packetData.type in resolvers)) return;

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

        songHash
    }
}