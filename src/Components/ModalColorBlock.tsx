import type { ModalColorBlockProps } from "../types/types.ts"
import { useClipboard } from "../hooks/useClipboard.ts"

export default function ModalColorBlock({ color }: ModalColorBlockProps) {
    const { isCopied, copy } = useClipboard()

    return (
        <div className="modal-color-block" style={{ backgroundColor: color.hexCode }}>
            <span onClick={() => copy(color.hexCode)}>{isCopied ? "Copied!" : color.hexCode}</span>
        </div>
    )
}
