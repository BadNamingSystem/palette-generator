import type {BookmarksProps} from "../types.ts"
import Bookmark from "./Bookmark.tsx"

export default function Bookmarks({savedPalettes, show, toggle, onSelect, onDelete}: BookmarksProps) {
    return (
        <aside className={`bookmarks-sidebar ${show ? "show" : ""}`}>
            <div className="bookmarks-header">
                <h2>Saved Palettes</h2>
                <i className="fa-regular fa-circle-xmark" onClick={toggle}></i>
            </div>
            <div className="bookmarks-list">
                {savedPalettes.map((palette, index) =>
                    <Bookmark palette={palette} onSelect={onSelect} onDelete={() => onDelete(index)} key={index}/>)}
            </div>
        </aside>
    )
}