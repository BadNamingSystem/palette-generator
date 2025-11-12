import type {MainButtonProps} from "../types.ts";

export default function MainButton({children, onClick, className, disabled}: MainButtonProps) {
    return (
        <button type="button" disabled={disabled}
                onClick={onClick}
                className={`btn-main ${className || ""}`}>
            {children}
        </button>
    )
}