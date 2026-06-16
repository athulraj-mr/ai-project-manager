import { redirect } from "next/navigation"
import { auth } from "@/auth"
import { CreateWorkspaceForm } from "@/components/workspace/create-workspace-form"

export default async function DashboardPage() {
  const session = await auth()

  if (!session) {
    redirect("/login")
  }

  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold">
        Dashboard
      </h1>

      <p>
        Welcome {session.user?.name}
      </p>

      <div className="mt-8">
        <CreateWorkspaceForm />
      </div>
    </main>
  )
}