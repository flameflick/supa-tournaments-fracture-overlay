import { default as streamLinkMap } from '@/configs/stream-links.json'

export const getPlayerTwitchUsername = (platformId: number) => {
    if (!(platformId in streamLinkMap)) return ''

    // @ts-expect-error
    return streamLinkMap[platformId]
}