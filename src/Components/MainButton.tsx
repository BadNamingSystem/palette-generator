import type {MainButtonProps} from "../types.ts";

export default function MainButton({children, onClick}: MainButtonProps) {
    return <button onClick={onClick} className="btn-main" type="button">{children}</button>
}