export interface IBeatSaverMapDetail {
    description: string
    id: string

    metadata: {
        bpm: number
        duration: number
        levelAuthorName: string
        songAuthorName: string
        songName: string
        songSubName: string
    }

    name: string
    versions: IBeatSaverVersion[]
}

export interface IBeatSaverVersion {
    coverURL: string
}