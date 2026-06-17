import { prisma } from "@/lib/prisma"

interface Props {
  projectId: string
}

export async function TaskList({
  projectId,
}: Props) {
  const tasks =
    await prisma.task.findMany({
      where: {
        projectId,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

  if (tasks.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No tasks yet.
      </p>
    )
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium">
            {task.title}
          </h3>

          {task.description && (
            <p className="mt-2 text-sm text-muted-foreground">
              {task.description}
            </p>
          )}

          <div className="mt-3 flex gap-2 text-sm">
            <span>
              Status: {task.status}
            </span>

            <span>
              Priority: {task.priority}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}