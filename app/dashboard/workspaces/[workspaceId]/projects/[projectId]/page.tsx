import { notFound } from "next/navigation"

import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"

interface PageProps {
  params: Promise<{
    workspaceId: string
    projectId: string
  }>
}

export default async function ProjectPage({
  params,
}: PageProps) {
  const session = await auth()

  if (!session?.user?.email) {
    notFound()
  }

  const {
    workspaceId,
    projectId,
  } = await params

  const project =
    await prisma.project.findFirst({
      where: {
        id: projectId,
        workspaceId,
        workspace: {
          owner: {
            email: session.user.email,
          },
        },
      },
    })

  if (!project) {
    notFound()
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        {project.title}
      </h1>

      {project.description && (
        <p className="mt-4 text-muted-foreground">
          {project.description}
        </p>
      )}

      <div className="mt-8">
        Tasks coming soon...
      </div>
    </main>
  )
}