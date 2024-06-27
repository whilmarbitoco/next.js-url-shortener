import { redirect } from "next/navigation"
import prisma from "../../../prisma/database"

export default async function page({ params }: any) {

    const link = await prisma.link.findFirst({ where: { shortenedLink: params.link } })

    if (link) {
        return redirect(link.originalLink)
    }

    return (
        <div className="h-full w-full flex justify-center items-center">
            404 Not Found
        </div>
    )
}
