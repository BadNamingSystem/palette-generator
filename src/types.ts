import type {MouseEventHandler, ReactNode} from "react";

export type ColorObj = {
    hexCode: string
    isLocked: boolean
    id: string
}

export type PaletteProps = {
    colors: ColorObj[]
    toggleLock: (id: string) => void
    deleteColor: (id: string) => void
}

export type ColorBlockProps = {
    color: ColorObj
    toggleLock: (id: string) => void
    deleteColor: (id: string) => void
}

export type MainButtonProps = {
    children: ReactNode
    onClick?: MouseEventHandler<HTMLButtonElement>
    className?: string
    disabled?: boolean
}

export type BookmarksProps = {
    show: boolean
    toggle: () => void
    savedPalettes: ColorObj[][]
    onSelect: (palette: ColorObj[]) => void
    onDelete: (index: number) => void
}

export type BookmarkProps = {
    palette: ColorObj[]
    onSelect: (palette: ColorObj[]) => void
    onDelete: () => void
}

export type PaletteModalProps = {
    palette: ColorObj[]
    onClose: () => void
}

export type ModalColorBlockProps = {
    color: ColorObj
}