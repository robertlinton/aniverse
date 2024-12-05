'use client'

import { Home, Compass, Heart, Clock, Film, Tv } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import Link from 'next/link'
import { usePathname } from 'next/navigation'

const sidebarItems = [
  { icon: Home, label: "Home", href: "/" },
  { icon: Compass, label: "Discover", href: "/discover" },
  { icon: Heart, label: "Favorites", href: "/favorites" },
  { icon: Clock, label: "Watch Later", href: "/watch-later" },
  { icon: Film, label: "Movies", href: "/movies" },
  { icon: Tv, label: "TV Series", href: "/tv-series" },
]

export default function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="w-64 bg-card text-card-foreground p-4 hidden md:block">
      <nav className="space-y-2">
        {sidebarItems.map((item) => (
          <Button
            key={item.href}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              pathname === item.href && "bg-accent text-accent-foreground"
            )}
            asChild
          >
            <Link href={item.href}>
              <item.icon className="mr-2 h-4 w-4" />
              {item.label}
            </Link>
          </Button>
        ))}
      </nav>
    </aside>
  )
}

