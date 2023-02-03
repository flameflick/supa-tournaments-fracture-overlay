export interface ITeam {
    id: string
    name: string
    logoLink: string

    members: {
        countryCode?: string
        platformId: string
        nickname: string
    }[]
}