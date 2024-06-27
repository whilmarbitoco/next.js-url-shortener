'use client'

import { FaX, FaClipboard } from "react-icons/fa6";


interface LinkPopupProps {
    hidden: boolean
    toggleHidden: any
    link: string,
}
const LinkPopup: React.FC<LinkPopupProps> = ({ hidden, toggleHidden, link }) => {

    const url = `${window.location.origin}\/${link}`

    return (
        <div className={`${hidden ? "hidden" : "flex"} absolute flex flex-col items-center justify-center bg-opacity-30 backdrop-blur-sm w-full h-[80vh]`}>
            <div className="relative rounded p-4 w-1/2 h-[12rem] bg-slate-600 flex items-center justify-center">
                <button onClick={toggleHidden} className="absolute top-3 right-3 hover:text-slate-400"><FaX /></button>
                <div className="m-2 flex">
                    <code className="p-2 text-center bg-white text-slate-800 rounded">{url}</code>
                    <button onClick={() => navigator.clipboard.writeText(url)} className="mx-2 p-3 border-2 rounded hover:text-slate-800 hover:bg-white ease-in duration-300"><FaClipboard /></button>
                </div>
            </div>
        </div>
    )
}

export default LinkPopup