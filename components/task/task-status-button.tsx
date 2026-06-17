"use client"

import { useTransition } from "react"

interface Props {
  taskId: string
  status: string
}

export function TaskStatusButton({
  taskId,
  status,
}: Props) {
  const [pending, startTransition] =
    useTransition()

  function getNextStatus() {
    if (status === "TODO") {
      return "IN_PROGRESS"
    }

    if (status === "IN_PROGRESS") {
      return "DONE"
    }

    return "TODO"
  }

  async function updateStatus() {
    await fetch(
      `/api/tasks/${taskId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          status: getNextStatus(),
        }),
      }
    )

    location.reload()
  }

  return (
    <button
      onClick={() =>
        startTransition(updateStatus)
      }
      disabled={pending}
      className="rounded border px-3 py-1 text-sm"
    >
      {pending
        ? "Updating..."
        : status}
    </button>
  )
}