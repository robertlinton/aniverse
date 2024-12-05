'use client'

import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { AlertTriangle } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error
  reset: () => void
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4 text-center">
      <AlertTriangle className="w-24 h-24 mb-8 text-destructive" />
      <h1 className="text-4xl font-bold mb-4">Oops! Something went wrong</h1>
      <p className="text-xl mb-8">We're sorry, but there was an error processing your request.</p>
      <div className="flex space-x-4">
        <Button onClick={() => reset()}>
          Try again
        </Button>
        <Button variant="outline" asChild>
          <Link href="/">
            Return to Home
          </Link>
        </Button>
      </div>
    </div>
  )
}

