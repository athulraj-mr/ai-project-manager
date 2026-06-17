import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface RouteProps {
  params: Promise<{
    taskId: string
  }>
}

export async function PATCH(
  req: Request,
  { params }: RouteProps
) {
  try {
    const session = await auth()

    if (!session?.user?.email) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      )
    }

    const { taskId } = await params

    const { status } =
      await req.json()

    const task =
      await prisma.task.update({
        where: {
          id: taskId,
        },
        data: {
          status,
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