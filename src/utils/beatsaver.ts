
const BEATSABER_LEVEL_ID_RE = /^custom_level_(.*)$/

export const beatSaberLevelIdToHash = (id: string) => {
    return id.match(BEATSABER_LEVEL_ID_RE)![1]
}