import { prisma } from "@/lib/prisma"
import { auth } from "@/auth"

export async function WorkspaceList() {
  const session = await auth()

  if (!session?.user?.email) {
    return null
  }

  const workspaces =
    await prisma.workspace.findMany({
      where: {
        owner: {
          email: session.user.email,
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    })

  if (workspaces.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        No workspaces yet.
      </p>
    )
  }

  return (
    <div className="space-y-2">
      {workspaces.map((workspace) => (
        <div
          key={workspace.id}
          className="rounded-lg border p-4"
        >
          <h3 className="font-medium">
            {workspace.name}
          </h3>
        </div>
      ))}
    </div>
  )
}