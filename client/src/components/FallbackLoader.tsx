// FallbackLoader.tsx
"use client"

import React, { useEffect } from "react"
import { toast } from "sonner"
import { Progress } from "./ui/progress"

export function ProgressDemo() {
  const [progress, setProgress] = React.useState(13)
  React.useEffect(() => {
    const timer = setTimeout(() => setProgress(90), 250)
    return () => clearTimeout(timer)
  }, [])
  return <Progress value={progress} className="w-[60%]" />
}


export default function FallbackLoader() {
  useEffect(() => {
    const toastId = toast.loading("🧬 Syncing Health Data...", {
      description: "Fetching blood pressure, glucose, and cholesterol levels...",
      position: "top-right",
      className: "bg-white border border-blue-300 text-blue-700 shadow-md",
      duration: 999999,
    });

    return () => {
      toast.dismiss(toastId)
    }
  }, [])

  return (
    <div className=" flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
      <div className="flex w-full max-w-sm flex-col gap-2">
        <h1>Syncing with MedicTrack Labs...</h1>
        <ProgressDemo />

      </div>
    </div>
  )
}
