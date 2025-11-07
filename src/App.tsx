import {useEffect, useState} from "react";
import {createColorObject, generatePalette, getContrastColor} from "./helpers.ts";
import type {ColorBlockProps, PaletteProps} from "./types.ts";

export default function App() {
    const [colors, setColors] = useState(generatePalette)

    function toggleColorLock(id: string) {
        setColors(prevColors =>
            prevColors.map(color => color.id === id ? {...color, isLocked: !color.isLocked} : color
        ))
    }

    function handleGeneratePalette() {
        setColors(prevColors =>
            prevColors.map(color => color.isLocked ? color : createColorObject())
        )
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
            <button onClick={handleGeneratePalette} className="btn-generator" type="button">Generate</button>
            <div className="app">
                <Palette colors={colors} toggleLock={toggleColorLock}/>
            </div>
        </div>
    )
}

function Palette({colors, toggleLock}: PaletteProps) {
    return (
        <ul className="palette-list">
            {colors.map(color =>
                <ColorBlock color={color} toggleLock={toggleLock} key={color.id}/>)}
        </ul>
    )
}

function ColorBlock({color, toggleLock}: ColorBlockProps) {
    const {hexCode, isLocked, id} = color
    const textColor = getContrastColor(hexCode)

    return (
        <li className="color-block" style={{backgroundColor: hexCode}}>
            <p style={{color: textColor}}>{hexCode}</p>
            <i className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}`}
               onClick={() => toggleLock(id)}
               style={{color: textColor}}></i>
        </li>
    )
}