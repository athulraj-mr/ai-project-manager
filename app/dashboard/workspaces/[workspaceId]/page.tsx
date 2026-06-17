import { notFound } from "next/navigation"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{
    workspaceId: string
  }>
}

export default async function WorkspacePage({
  params,
}: PageProps) {
  const session = await auth()

  if (!session?.user?.email) {
    notFound()
  }

  const { workspaceId } = await params

  const workspace =
    await prisma.workspace.findFirst({
      where: {
        id: workspaceId,
        owner: {
          email: session.user.email,
        },
      },
    })

  if (!workspace) {
    notFound()
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        {workspace.name}
      </h1>

      <p className="mt-4">
        Workspace ID:
        {workspace.id}
      </p>
    </main>
  )
}