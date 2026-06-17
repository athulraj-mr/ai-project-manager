"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Props {
  workspaceId: string
}

export function CreateProjectForm({
  workspaceId,
}: Props) {
  const [title, setTitle] =
    useState("")
  const [loading, setLoading] =
    useState(false)

  async function handleSubmit(
    e: React.FormEvent
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
          workspaceId,
        }),
      }
    )

    if (response.ok) {
      setTitle("")
      location.reload()
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <Input
        placeholder="Project title"
        value={title}
        onChange={(e) =>
          setTitle(e.target.value)
        }
      />

      <Button
        type="submit"
        disabled={loading}
      >
        Create
      </Button>
    </form>
  )
}