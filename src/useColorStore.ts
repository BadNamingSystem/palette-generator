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

// State selectors
export const useColors = () => useColorStore(state => state.colors)
export const useShowBookmarks = () => useColorStore(state => state.showBookmarks)
export const useModalPalette = () => useColorStore(state => state.modalPalette)
export const useSavedPalettes = () => useColorStore(state => state.savedPalettes)

// Action selectors
/*
export const useGeneratePalette = () => useColorStore(state => state.actions.generatePalette)
export const useToggleBookmarks = () => useColorStore(state => state.actions.toggleBookmarks)
export const useSavePalette = () => useColorStore(state => state.actions.savePalette)
export const useDeleteBookmark = () => useColorStore(state => state.actions.deleteBookmark)
export const useAddColor = () => useColorStore(state => state.actions.addColor)
export const useToggleColorLock = () => useColorStore(state => state.actions.toggleColorLock)
export const useDeleteColor = () => useColorStore(state => state.actions.deleteColor)
export const useSetModalPalette = () => useColorStore(state => state.actions.setModalPalette)
*/

export const useColorActions = () => useColorStore(state => state.actions)

export default useColorStore
