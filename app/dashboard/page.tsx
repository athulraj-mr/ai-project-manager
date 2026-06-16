import { redirect } from "next/navigation"
import { auth } from "@/auth"

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

      <div className="mt-4 space-y-2">
        <p>
          Welcome {session.user?.name}
        </p>

        <p>
          Email: {session.user?.email}
        </p>
      </div>
    </main>
  )
}