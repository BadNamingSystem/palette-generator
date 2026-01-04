import {useState} from "react"

export function useClipboard() {
    const [isCopied, setIsCopied] = useState(false)

    function copy(text: string) {
        navigator.clipboard.writeText(text).then(() => {
            setIsCopied(true)
            setTimeout(() => setIsCopied(false), 1500)
        }).catch(error => console.error(`Failed to copy text: ${error.message}`))
    }

    return {isCopied, copy}
}

