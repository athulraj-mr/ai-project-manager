import { NextResponse } from "next/server"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

export async function POST(req: Request) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const {
      title,
      description,
      priority,
      projectId,
    } = await req.json()

    const project =
      await prisma.project.findFirst({
        where: {
          id: projectId,
          workspace: {
            owner: {
              email:
                session.user.email,
            },
          },
        },
      })

    if (!project) {
      return NextResponse.json(
        { error: "Project not found" },
        { status: 404 }
      )
    }

    const task =
      await prisma.task.create({
        data: {
          title,
          description,
          priority,
          projectId,
        },
      })

    return NextResponse.json(task)
  } catch (error) {
    console.error(error)

    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}