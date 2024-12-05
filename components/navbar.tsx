'use client'
import { MouseEvent } from 'react'
import { Bell, Search, User, Heart, Settings } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from "@/components/auth-provider"
import { signOut } from "firebase/auth"
import { auth } from "@/lib/firebase"
import Link from 'next/link'

export default function Navbar() {
  const { user, loading } = useAuth()

  const handleSignOut = async () => {
    try {
      await signOut(auth)
    } catch (error) {
      console.error('Error signing out:', error)
    }
  }

  return (
    <nav className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-4 flex-1">
        <Link href="/">
          <h1 className="text-2xl font-bold text-primary">AniStream</h1>
        </Link>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search anime..."
            className="pl-8 bg-muted"
          />
        </div>
      </div>
      <div className="flex items-center space-x-4">
        {user && (
          <Link href="/favorites">
            <Button variant="ghost" size="icon">
              <Heart className="h-5 w-5" />
            </Button>
          </Link>
        )}
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>
        {loading ? (
          <div>Loading...</div>
        ) : user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <User className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{user.email}</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Subscriptions</DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/admin">
                  <Settings className="mr-2 h-4 w-4" />
                  Admin
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onSelect={handleSignOut}>
                Log out
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <Link href="/signin">
            <Button variant="ghost">Sign In</Button>
          </Link>
        )}
      </div>
    </nav>
  )
}

