import { FaTrash } from "react-icons/fa6";

type propType = {
    link: {
        id: number,
        shortenedLink: string,
        originalLink: string,
        userId: number
    },
    btnEvt: (id: number) => void
}



const LinkComp: React.FC<propType> = ({ link, btnEvt }) => {
    return (
        <div className="my-2 rounded p-3 bg-white text-slate-800 w-full flex items-center justify-between">
            <div className="flex-1 min-w-0">
                <h3>{link.shortenedLink}</h3>
                <p className="text-wrap break-words">{link.originalLink}</p>
            </div>
            <button onClick={() => btnEvt(link.id)} className="text-red-600 text-[1.5rem]"><FaTrash /></button>
        </div>

    )
}

export default LinkComp