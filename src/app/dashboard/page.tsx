'use client'

import useUserStore from "@/store"
import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import LinkComp from "@/components/LinkComp"

type linkType = {
    id: number,
    shortenedLink: string,
    originalLink: string,
    userId: number
}

function DashboardPage() {
    const router = useRouter()

    const user = useUserStore((state) => state.user)
    const [links, setLinks] = useState<linkType[]>([])

    function checkAuth() {
        if (user.id === 0 && user.name === "" && user.email === "") {
            router.push('/login')
        }
    }

    async function fetchLinks() {
        const response = await fetch('/api/links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id: user.id }),
        })

        const data = await response.json()
        setLinks(data.links)
    }

    async function handleBtn(id: number) {
        setLinks(prevLinks => prevLinks.filter(link => link.id !== id))

        const response = await fetch("/api/link/delete", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ id }),
        })
        const data = await response.json()
        console.log(data)
    }


    useEffect(() => {
        async function effectFunc() {
            checkAuth()
            await fetchLinks()
        }

        effectFunc()
    }, [user])

    return (
        <div className="h-full mx-[15rem] py-5">
            <Link href="/" className="text-lg font-bold">Shortener</Link>
            <div className="flex flex-row items-center justify-between">
                <h3 className="m-4">My Links</h3>
                <button className="py-1 px-3 border-2 rounded text-slate-800 bg-white hover:bg-transparent hover:text-white ease-in duration-400" onClick={() => router.push('/')}>New</button>
            </div>
            <div className="flex flex-col items-center">
                {links.map(link => (
                    <LinkComp key={link.id} link={link} btnEvt={handleBtn} />
                ))}
            </div>
        </div>
    )
}

export default DashboardPage
