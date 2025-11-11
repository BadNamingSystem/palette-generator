import {useState} from "react";
import type {ModalColorBlockProps} from "../types.ts";

export default function ModalColorBlock({color}: ModalColorBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    const handleCopyToClipBoard = () => {
        navigator.clipboard.writeText(color.hexCode).then(() => {
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 1500);
        }).catch(error => console.error(`Failed to copy text: ${error}`));
    }

    return (
        <div className="modal-color-block" style={{backgroundColor: color.hexCode}}>
            <span onClick={handleCopyToClipBoard}>{isCopied ? "Copied!" : color.hexCode}</span>
        </div>
    )
}