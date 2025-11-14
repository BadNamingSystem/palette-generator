import type {ColorBlockProps} from "../types.ts";
import {type CSSProperties, useState} from "react";
import {getContrastColor, handleCopyToClipboard} from "../helpers.ts";

export default function ColorBlock({color, toggleLock, deleteColor}: ColorBlockProps) {
    const {hexCode, isLocked, id} = color
    const [isCopied, setIsCopied] = useState(false)

    const textColor = getContrastColor(hexCode)
    const blockStyle = {
        backgroundColor: hexCode,
        '--contrast-color': textColor
    } as CSSProperties
    
    return (
        <li className="color-block" style={blockStyle}>
            <div className="color-block-content">
                <p className="hex-code" onClick={() => handleCopyToClipboard(setIsCopied, hexCode)}>{isCopied ? "Copied!" : hexCode}</p>
                <div className="flex-c">
                    <i className={`fa-solid ${isLocked ? 'fa-lock' : 'fa-lock-open'}`}
                       onClick={() => toggleLock(id)}></i>
                    <i className="fa-regular fa-circle-xmark" onClick={() => deleteColor(id)}></i>
                </div>
            </div>
        </li>
    )
}