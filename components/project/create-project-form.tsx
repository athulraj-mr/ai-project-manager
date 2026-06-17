"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

interface Props {
  workspaceId: string
}

export function CreateProjectForm({
  workspaceId,
}: Props) {
  const [title, setTitle] = useState("")
  const [description, setDescription] =
    useState("")
  const [loading, setLoading] =
    useState(false)

  async function handleSubmit(
    e: React.FormEvent<HTMLFormElement>
  ) {
    e.preventDefault()

    setLoading(true)

    const response = await fetch(
      "/api/projects",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          title,
          description,
          workspaceId,
        }),
      }
    )

    if (response.ok) {
      setTitle("")
      setDescription("")
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
        placeholder="Project title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Textarea
        placeholder="Project description"
        value={description}
        onChange={(e) =>
          setDescription(e.target.value)
        }
      />

      <Button
        type="submit"
        disabled={loading}
      >
        {loading
          ? "Creating..."
          : "Create Project"}
      </Button>
    </form>
  )
}