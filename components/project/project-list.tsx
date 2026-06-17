import { prisma } from "@/lib/prisma"
import Link from "next/link"

interface Props {
  workspaceId: string
}

export async function ProjectList({
  workspaceId,
}: Props) {
  const projects =
    await prisma.project.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

  if (projects.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No projects yet.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded-lg border p-4"
        >
            <Link
            key={project.id}
            href={`/dashboard/workspaces/${workspaceId}/projects/${project.id}`}
            className="block rounded-lg border p-4"
            >
                <h3 className="font-medium">
                    {project.title}
                </h3>

                {project.description && (
                    <p className="mt-2 text-sm text-muted-foreground">
                    {project.description}
                    </p>
                )}
            </Link>
        </div>
      ))}
    </div>
  )
}