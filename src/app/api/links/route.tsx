import { NextRequest, NextResponse } from 'next/server';
import prisma from "../../../../prisma/database"

export async function POST(request: NextRequest) {
    const { id } = await request.json()

    console.log(id)
    const allLinks = await prisma.link.findMany({ where: { userId: id } })

    if (!allLinks) return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })

    return NextResponse.json({ message: "Request Success", links: allLinks }, { status: 200 })
}