import {useEffect, useState} from "react";
import {createColorObject} from "./helpers.ts";
import {Palette} from "./Components/Palette.tsx";
import MainButton from "./Components/MainButton.tsx";
import Bookmarks from "./Components/Bookmarks.tsx";
import type {ColorObj} from "./types.ts";
import PaletteModal from "./Components/PaletteModal.tsx";

const STORAGE_KEY = "palettes"

export default function App() {
    const [colors, setColors] = useState(Array.from({length: 5}, createColorObject))
    const [showBookmarks, setShowBookmarks] = useState(false)
    const [modalPalette, setModalPalette] = useState<ColorObj[] | null>(null)

    const [savedPalettes, setSavedPalettes] = useState<ColorObj[][]>(() => {
        const storedPalettes = localStorage.getItem(STORAGE_KEY)
        if (!storedPalettes) return []
        try {
            return JSON.parse(storedPalettes)
        } catch (e) {
            console.error(e)
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedPalettes))
    }, [savedPalettes])

    function handleShowBookmarks() {
        setShowBookmarks(show => !show)
    }

    function handleSavePalette() {
        setSavedPalettes(prev => [colors, ...prev])
    }

    function handleDeleteBookmark(indexToDelete: number) {
        setSavedPalettes(prev => prev.filter((_, index) => index !== indexToDelete))
    }

    function handleGeneratePalette() {
        setColors(prevColors =>
            prevColors.map(color => color.isLocked ? color : createColorObject())
        )
    }

    function handleAddColor() {
        if (colors.length === 10) return

        setColors(colors => [...colors, createColorObject()])
    }

    function toggleColorLock(id: string) {
        setColors(prevColors =>
            prevColors.map(color => color.id === id ? {...color, isLocked: !color.isLocked} : color
            ))
    }

    function handleDeleteColor(id: string) {
        if (colors.length <= 3) return

        setColors(colors => colors.filter(color => color.id !== id || color.isLocked))
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                event.preventDefault()
                handleGeneratePalette()
            }
        }
        window.addEventListener('keydown', handleKeyDown)

        // Cleanup function to remove the event listener when the component unmounts.
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, []) // The empty dependency array ensures this effect runs only once.

    return (
        <div className="app-container">
            <div className="actions flex-c">
                <MainButton onClick={handleGeneratePalette}>Generate</MainButton>
                {colors.length < 10 && <MainButton onClick={handleAddColor}>Add</MainButton>}
                <MainButton onClick={handleSavePalette}>Save</MainButton>
                {savedPalettes.length > 0 && <MainButton onClick={handleShowBookmarks}>Bookmarks</MainButton>}
            </div>
            <div className="app">
                <Palette colors={colors} toggleLock={toggleColorLock} deleteColor={handleDeleteColor}/>
                <div className={`overlay ${showBookmarks ? 'show' : ''}`} onClick={handleShowBookmarks}></div>
                <Bookmarks show={showBookmarks} toggle={handleShowBookmarks} savedPalettes={savedPalettes}
                           onSelect={setModalPalette} onDelete={handleDeleteBookmark}/>
            </div>
            {modalPalette && <PaletteModal palette={modalPalette} onClose={() => setModalPalette(null)}/>}
        </div>
    )
}