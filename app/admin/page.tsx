'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminDashboard } from '@/components/admin-dashboard'

const ADMIN_PASSCODE = 'Qq5znmcyfBwJDf' // In a real app, this should be stored securely, not in the client-side code

export default function AdminPage() {
  const [passcode, setPasscode] = useState('')
  const [isAuthorized, setIsAuthorized] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (passcode === ADMIN_PASSCODE) {
      setIsAuthorized(true)
      setError(null)
    } else {
      setError('Invalid passcode')
    }
  }

  if (isAuthorized) {
    return <AdminDashboard />
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Admin Access</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="password"
              placeholder="Enter admin passcode"
              value={passcode}
              onChange={(e) => setPasscode(e.target.value)}
              required
            />
            {error && <p className="text-red-500 text-sm">{error}</p>}
            <Button type="submit" className="w-full">Access Admin Dashboard</Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

