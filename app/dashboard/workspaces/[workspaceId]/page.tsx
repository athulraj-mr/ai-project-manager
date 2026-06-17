import { notFound } from "next/navigation"
import { auth } from "@/auth"
import { prisma } from "@/lib/prisma"
import { CreateProjectForm } from "@/components/project/create-project-form"
import { ProjectList } from "@/components/project/project-list"


interface PageProps {
  params: Promise<{
    workspaceId: string
  }>
}


export default async function WorkspacePage({ params, }: PageProps) {
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

        <CreateProjectForm workspaceId={workspace.id} />

        <div className="mt-8">
            <ProjectList workspaceId={workspace.id} />
        </div>
    </main>
  )
}