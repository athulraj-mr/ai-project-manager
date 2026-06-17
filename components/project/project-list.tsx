import { prisma } from "@/lib/prisma"

interface Props {
  workspaceId: string
}

export async function ProjectList({
  workspaceId,
}: Props) {
  const projects = await prisma.project.findMany({
      where: {
        workspaceId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

  return (
    <div className="space-y-2">
      {projects.map((project) => (
        <div
          key={project.id}
          className="rounded border p-4"
        >
          {project.title}
        </div>
      ))}
    </div>
  )
}