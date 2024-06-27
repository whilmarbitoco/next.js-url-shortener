import { NextResponse, NextRequest } from 'next/server';
import prisma from "../../../../prisma/database"
import bcrypt from "bcrypt"

export async function POST(request: NextRequest) {
    const { email, name, password } = await request.json()


    const checkUser = await prisma.user.findFirst({ where: { email } })

    if (checkUser) return NextResponse.json({ message: "Email Already Exist" })

    const hashPass = await bcrypt.hash(password, 9);
    const newUser = await prisma.user.create({
        data: {
            name,
            email,
            password: hashPass
        }
    })

    if (newUser) {
        return NextResponse.json({ message: "User Created" })
    }
    return NextResponse.json({ message: "Something Went Wrong" })

}