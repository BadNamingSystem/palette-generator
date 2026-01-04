import type {PaletteProps} from "../types.ts"
import ColorBlock from "./ColorBlock.tsx"

export function Palette({colors, toggleLock, deleteColor}: PaletteProps) {
    return (
        <ul className="palette-list">
            {colors.map(color =>
                <ColorBlock color={color} toggleLock={toggleLock} deleteColor={deleteColor} key={color.id}/>)}
        </ul>
    )
}