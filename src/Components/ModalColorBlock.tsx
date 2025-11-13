import {useState} from "react";
import type {ModalColorBlockProps} from "../types.ts";
import {handleCopyToClipboard} from "../helpers.ts";

export default function ModalColorBlock({color}: ModalColorBlockProps) {
    const [isCopied, setIsCopied] = useState(false)

    return (
        <div className="modal-color-block" style={{backgroundColor: color.hexCode}}>
            <span onClick={() => handleCopyToClipboard(setIsCopied, color.hexCode)}>
                {isCopied ? "Copied!" : color.hexCode}
            </span>
        </div>
    )
}