import { Palette } from "./Components/Palette.tsx"
import MainButton from "./Components/MainButton.tsx"
import Bookmarks from "./Components/Bookmarks.tsx"
import PaletteModal from "./Components/PaletteModal.tsx"
import { useColorActions, useColors, useModalPalette, useSavedPalettes, useShowBookmarks } from "./useColorStore.ts"
import { useKey } from "./hooks/useKey.ts"

export default function App() {
    const colors = useColors()
    const showBookmarks = useShowBookmarks()
    const savedPalettes = useSavedPalettes()
    const modalPalette = useModalPalette()

    const {
        generatePalette,
        addColor,
        toggleBookmarks,
        savePalette,
        toggleColorLock,
        deleteColor,
        setModalPalette,
        deleteBookmark,
    } = useColorActions()

    useKey("Space", generatePalette)

    return (
        <div className="app-container">
            <div className="actions flex-c">
                <MainButton onClick={generatePalette} className="btn-generate">
                    Generate
                </MainButton>
                <div className="sub-actions">
                    <MainButton onClick={addColor} disabled={colors.length >= 10}>
                        Add Color
                    </MainButton>
                    <MainButton onClick={savePalette}>Save Palette</MainButton>
                    {savedPalettes.length > 0 && <MainButton onClick={toggleBookmarks}>Bookmarks</MainButton>}
                </div>
            </div>
            <div className="app">
                <Palette colors={colors} toggleLock={toggleColorLock} deleteColor={deleteColor} />
                <div className={`overlay ${showBookmarks ? "show" : ""}`} onClick={toggleBookmarks}></div>
                <Bookmarks
                    show={showBookmarks}
                    toggle={toggleBookmarks}
                    savedPalettes={savedPalettes}
                    onSelect={setModalPalette}
                    onDelete={deleteBookmark}
                />
            </div>
            {modalPalette && <PaletteModal palette={modalPalette} onClose={() => setModalPalette(null)} />}
        </div>
    )
}
