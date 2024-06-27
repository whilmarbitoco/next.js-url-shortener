import { NextRequest, NextResponse } from 'next/server';
import prisma from "../../../../../prisma/database"

export async function POST(request: NextRequest) {
    const { id } = await request.json()

    console.log(id)
    const link = await prisma.link.delete({ where: { id } })

    if (!link) return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })

    return NextResponse.json({ message: "Request Success" }, { status: 200 })
}