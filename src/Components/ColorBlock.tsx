import type {ColorBlockProps} from "../types.ts";
import {type CSSProperties} from "react";
import {getContrastColor} from "../helpers.ts";
import {useClipboard} from "../useClipboard.ts"

export function ColorBlock({color, toggleLock, deleteColor}: ColorBlockProps) {
    const {hexCode, isLocked, id} = color
    const {isCopied, copy} = useClipboard()

    const textColor = getContrastColor(hexCode)
    const blockStyle = {
        backgroundColor: hexCode,
        '--contrast-color': textColor
    } as CSSProperties
    
    return (
        <li className="color-block" style={blockStyle}>
            <div className="color-block-content">
                <p className="hex-code" onClick={() => copy(hexCode)}>{isCopied ? "Copied!" : hexCode}</p>
                <div className="flex-c">
                    <i className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}`}
                       onClick={() => toggleLock(id)}></i>
                    <i className="fa-regular fa-circle-xmark" onClick={() => deleteColor(id)}></i>
                </div>
            </div>
        </li>
    )
}