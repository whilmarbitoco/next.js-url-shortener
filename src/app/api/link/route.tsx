import { NextRequest, NextResponse } from 'next/server';
import prisma from "../../../../prisma/database"

export async function POST(request: NextRequest) {
    const { link, id } = await request.json()
    let shortened = (Math.random() + 1).toString(36).substring(7)

    const checkShort = await prisma.link.findFirst({ where: { shortenedLink: shortened } })

    if (checkShort) {
        shortened = (Math.random() + 1).toString(36).substring(7)
    }

    const newLink = await prisma.link.create({
        data: {
            shortenedLink: shortened,
            originalLink: link,
            userId: id
        }
    })

    if (newLink) {
        return NextResponse.json({ message: "Link Created", shortened }, { status: 200 })
    }

    return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })
}

export async function GET(request: NextRequest) {
    const { id } = await request.json()

    if (!id) return NextResponse.json({ message: "ID Not Found" }, { status: 500 })

    const allLinks = await prisma.link.findMany({ where: { userId: id } })

    if (!allLinks) return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })

    NextResponse.json({ message: "Request Success", allLinks }, { status: 200 })
}