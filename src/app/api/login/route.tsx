import { NextResponse, NextRequest } from 'next/server';
import prisma from "../../../../prisma/database"
import bcrypt from "bcrypt"
import { uuid } from 'uuidv4';
import { cookies } from 'next/headers';

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()
    const ipAddress = request.headers.get('x-forwarded-for') as string
    const userAgent = request.headers.get('user-agent') as string

    const checkUser = await prisma.user.findFirst({ where: { email } })
    if (!checkUser) return NextResponse.json({ message: "User Not Found" }, { status: 403 })

    const checkPass: boolean = await bcrypt.compare(password, checkUser.password)
    if (!checkPass) return NextResponse.json({ message: "Invalid Username or Password" }, { status: 403 })

    const sessionKey = cookies().get('session-key')
    if (sessionKey) {
        const key = sessionKey.value
        const checkSession = await prisma.session.findFirst({ where: { key } })

        if (checkSession) {
            if (checkSession.email == checkUser.email && checkSession.ipAddress == ipAddress && checkSession.userAgent == userAgent) {
                return NextResponse.json({ message: "Login Success", user: checkUser }, { status: 200 })
            }
        }
    }

    const checkSession = await prisma.session.findMany({ where: { userId: checkUser.id } })

    if (checkSession) {
        await prisma.session.deleteMany({ where: { userId: checkUser.id } })
    }

    const key = await uuid().replace(/-/g, '') as string
    const newSession = await prisma.session.create({
        data: {
            email: checkUser.email,
            ipAddress,
            userAgent,
            key,
            userId: checkUser.id
        }
    })

    if (!newSession) return NextResponse.json({ message: "Something Went Wrong" }, { status: 500 })
    cookies().set('session-key', key)

    return NextResponse.json({ message: "Login Success", user: checkUser }, { status: 200 })
}