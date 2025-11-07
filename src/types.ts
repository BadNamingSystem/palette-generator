export type ColorObj = {
    hexCode: string
    isLocked: boolean
    id: string
}

export type PaletteProps = {
    colors: ColorObj[]
    toggleLock: (id: string) => void
}

export type ColorBlockProps = {
    color: ColorObj
    toggleLock: (id: string) => void
}