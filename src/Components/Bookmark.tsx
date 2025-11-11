import type {BookmarkProps} from "../types.ts";
import {type MouseEvent} from "react";

export default function Bookmark({palette, onSelect, onDelete}: BookmarkProps) {
    const handleDeleteClick = (e: MouseEvent) => {
        e.stopPropagation()
        onDelete()
    }

    return (
        <div className="bookmark-item" onClick={() => onSelect(palette)}>
            <div className="bookmark-preview">
                {palette.map(color =>
                    <div style={{backgroundColor: color.hexCode}} key={color.id}></div>)}
            </div>
            <i className="fa-regular fa-circle-xmark" onClick={handleDeleteClick}></i>
        </div>
    )
}