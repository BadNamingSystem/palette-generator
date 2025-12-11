import {create} from "zustand"
import {createColorObject} from "./helpers.ts"
import type {ColorObj} from "./types.ts"
import {persist, createJSONStorage} from "zustand/middleware"

type State = {
    colors: ColorObj[]
    showBookmarks: boolean
    modalPalette: null | ColorObj[]
    savedPalettes: ColorObj[][]
}

type Actions = {
    toggleBookmarks: () => void
    generatePalette: () => void
    savePalette: () => void
    deleteBookmark: (index: number) => void
    addColor: () => void
    toggleColorLock: (id: string) => void
    deleteColor: (id: string) => void
    setModalPalette: (palette: ColorObj[] | null) => void
}

const useColorStore = create<State & { actions: Actions }>()(
    persist(
        (set) => ({
            colors: Array.from({length: 5}, createColorObject),
            showBookmarks: false,
            modalPalette: null,
            savedPalettes: [],
            actions: {
                toggleBookmarks: () => set(state => ({showBookmarks: !state.showBookmarks})),
                generatePalette: () => set(state =>
                    ({colors: state.colors.map(color => color.isLocked ? color : createColorObject())})),
                savePalette: () => set(state => ({savedPalettes: [state.colors, ...state.savedPalettes]})),
                deleteBookmark: (indexToDelete) => set(state => ({
                    savedPalettes: state.savedPalettes.filter((_, index) => index !== indexToDelete)
                })),
                addColor: () => set(state => {
                    if (state.colors.length >= 10) return {}
                    return {colors: [...state.colors, createColorObject()]}
                }),
                toggleColorLock: (id) => set(state => ({
                    colors: state.colors.map(color => color.id === id ? {...color, isLocked: !color.isLocked} : color)
                })),
                deleteColor: (id) => set(state => {
                    if (state.colors.length <= 3) return {}
                    return {colors: state.colors.filter(color => color.id !== id || color.isLocked)}
                }),
                setModalPalette: (palette) => set({modalPalette: palette})
            }
        }),
        {
            name: "palettes",
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({savedPalettes: state.savedPalettes}),
        }
    )
)

export default useColorStore
