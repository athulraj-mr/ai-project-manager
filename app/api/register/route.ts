import bcrypt from "bcryptjs"
import { NextResponse } from "next/server"

import { prisma } from "@/lib/prisma"
import { registerSchema } from "@/lib/validations/auth"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const parsed = registerSchema.safeParse(body)

    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid input",
        },
        {
          status: 400,
        }
      )
    }

    const { name, email, password } = parsed.data

    const existingUser =
      await prisma.user.findUnique({
        where: {
          email,
        },
      })

    if (existingUser) {
      return NextResponse.json(
        {
          success: false,
          error: "Email already exists",
        },
        {
          status: 409,
        }
      )
    }

    const hashedPassword =
      await bcrypt.hash(password, 12)

    const user =
      await prisma.user.create({
        data: {
          name,
          email,
          password: hashedPassword,
        },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
        },
      })

    return NextResponse.json(
      {
        success: true,
        user,
      },
      {
        status: 201,
      }
    )
  } catch (error) {
    console.error("Register Error:", error)

    return NextResponse.json(
      {
        success: false,
        error: "Internal server error",
      },
      {
        status: 500,
      }
    )
  }
}