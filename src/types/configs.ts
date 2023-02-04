export interface ITeam {
    id: string
    name: string
    shortName?: string
    logoLink: string

    members: {
        countryCode?: string
        platformId: string
        nickname: string
    }[]
}