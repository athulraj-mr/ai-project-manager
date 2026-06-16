"use client"

import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export function CreateWorkspaceForm() {
  const [name, setName] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()

    setLoading(true)

    const res = await fetch("/api/workspaces",
      {
        method: "POST",
        headers: {
          "Content-Type":
            "application/json",
        },
        body: JSON.stringify({
          name,
        }),
      }
    )

    if (res.ok) {
      alert("Workspace created")
      setName("")
    }

    setLoading(false)
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex gap-2"
    >
      <Input
        placeholder="Workspace Name"
        value={name}
        onChange={(e) =>
          setName(e.target.value)
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