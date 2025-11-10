import {useEffect, useState} from "react";
import {createColorObject, getContrastColor} from "./helpers.ts";
import type {ColorBlockProps, PaletteProps} from "./types.ts";

export default function App() {
    const [colors, setColors] = useState(Array.from({length: 5}, createColorObject))

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
                <button onClick={handleGeneratePalette} className="btn-main" type="button">Generate</button>
                <button onClick={handleAddColor} className="btn-main" type="button">Add</button>
            </div>
            <div className="app">
                <Palette colors={colors} toggleLock={toggleColorLock} deleteColor={handleDeleteColor}/>
            </div>
        </div>
    )
}

function Palette({colors, toggleLock, deleteColor}: PaletteProps) {
    return (
        <ul className="palette-list">
            {colors.map(color =>
                <ColorBlock color={color} toggleLock={toggleLock} deleteColor={deleteColor} key={color.id}/>)}
        </ul>
    )
}

function ColorBlock({color, toggleLock, deleteColor}: ColorBlockProps) {
    const {hexCode, isLocked, id} = color
    const textColor = getContrastColor(hexCode)

    return (
        <li className="color-block" style={{backgroundColor: hexCode}}>
            <div className="color-block-content">
                <p style={{color: textColor}}>{hexCode}</p>
                <i className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}`}
                   onClick={() => toggleLock(id)}
                   style={{color: textColor}}></i>
                <i className="fa-regular fa-circle-xmark" onClick={() => deleteColor(id)}
                   style={{color: textColor}}></i>
            </div>
        </li>
    )
}