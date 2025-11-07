import {useState, useEffect} from "react";
import {generatePalette, getContrastColor} from "./helpers.ts";

export default function App() {
    const [colors, setColors] = useState(generatePalette)

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.code === 'Space') {
                // Prevent the default spacebar action (like scrolling).
                event.preventDefault()
                setColors(generatePalette())
            }
        }

        window.addEventListener('keydown', handleKeyDown)

        // Cleanup function to remove the event listener when the component unmounts.
        return () => window.removeEventListener('keydown', handleKeyDown)
    }, []) // The empty dependency array ensures this effect runs only once.

    return (
        <div className="app-container">
            <button onClick={() => setColors(generatePalette)} className="btn-generator" type="button">Generate</button>
            <div className="app">
                <Palette colors={colors}/>
            </div>
        </div>
    )
}

function Palette({colors}: { colors: string[] }) {
    return (
        <ul className="palette-list">
            {colors.map((color, index) => <Color color={color} key={index}/>)}
        </ul>
    )
}

function Color({color}: { color: string }) {
    const textColor = getContrastColor(color)

    return (
        <li className="color-block" style={{backgroundColor: color}}>
            <p style={{color: textColor}}>{color}</p>
        </li>
    )
}