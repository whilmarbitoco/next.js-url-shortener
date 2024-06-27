import { NextResponse } from 'next/server';
import prisma from "../../../prisma/database"

export async function GET() {
    const findUsers = await prisma.user.findMany()

    return NextResponse.json(findUsers);
}