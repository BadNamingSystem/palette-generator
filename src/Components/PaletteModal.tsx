import type {PaletteModalProps} from "../types.ts"
import ModalColorBlock from "./ModalColorBlock.tsx"

export default function PaletteModal({palette, onClose}: PaletteModalProps) {
    return (
        <div className="palette-modal-overlay" onClick={onClose}>
            <div className="palette-modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h3>Palette Preview</h3>
                    <i className="fa-regular fa-circle-xmark" onClick={onClose}></i>
                </div>
                <div className="modal-palette-view">
                    {palette.map(color => <ModalColorBlock color={color} key={color.id}/>)}
                </div>
            </div>
        </div>
    )
}