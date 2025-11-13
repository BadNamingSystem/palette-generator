import type {Dispatch, SetStateAction} from "react";

const generateHex = () => {
    const hexString = "0123456789ABCDEF".split("")
    let output = "#"

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * hexString.length)
        output += hexString[randomIndex]
    }
    return output
}

export const createColorObject = () => {
    return {hexCode: generateHex(), isLocked: false, id: crypto.randomUUID()}
}

export const handleCopyToClipboard = (setState: Dispatch<SetStateAction<boolean>>, text: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setState(true)

            // Reset the "Copied!" message after 1.5 seconds.
            setTimeout(() => setState(false), 1500)
        }).catch(error => console.error(`Failed to copy text: ${error}`))
    }

/**
 * Calculates the contrasting color (black or white) for a given hex color.
 * @param hexColor - The hex color string (e.g., "#RRGGBB").
 * @returns Returns "#000000" (black) for light colors and "#FFFFFF" (white) for dark colors.
 */
export const getContrastColor = (hexColor: string): string => {
    // If the hex color is invalid, default to black.
    if (!hexColor || hexColor.length < 7) return "#000000"

    // Convert hex to RGB
    const r = parseInt(hexColor.substring(1, 3), 16)
    const g = parseInt(hexColor.substring(3, 5), 16)
    const b = parseInt(hexColor.substring(5, 7), 16)

    // Calculate luminance using the standard formula
    const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255

    return luminance > 0.5 ? "#000000" : "#FFFFFF"
}