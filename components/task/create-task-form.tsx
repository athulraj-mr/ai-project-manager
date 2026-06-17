"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  projectId: string
}

export function CreateTaskForm({
  projectId,
}: Props) {
  const [title, setTitle] =
    useState("")
  const [description, setDescription] =
    useState("")
  const [priority, setPriority] =
    useState("MEDIUM")
  const [loading, setLoading] =
    useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)

    const response = await fetch(
      "/api/tasks",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          priority,
          projectId,
        }),
      }
    )

    if (response.ok) {
      setTitle("")
      setDescription("")
      setPriority("MEDIUM")
      location.reload()
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4"
    >
      <Input
        placeholder="Task title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Textarea
        placeholder="Task description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <select
        value={priority}
        onChange={(e) =>
          setPriority(e.target.value)
        }
        className="w-full rounded-md border p-2"
      >
        <option value="LOW">
          LOW
        </option>

        <option value="MEDIUM">
          MEDIUM
        </option>

        <option value="HIGH">
          HIGH
        </option>

        <option value="URGENT">
          URGENT
        </option>
      </select>

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Task"}
      </Button>
    </form>
  )
}