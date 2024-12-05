import { Home, Compass, Heart, Clock, Film, Tv } from 'lucide-react'
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const sidebarItems = [
  { icon: Home, label: "Home" },
  { icon: Compass, label: "Discover" },
  { icon: Heart, label: "Favorites" },
  { icon: Clock, label: "Watch Later" },
  { icon: Film, label: "Movies" },
  { icon: Tv, label: "TV Series" },
]

export default function Sidebar() {
  return (
    <aside className="w-64 bg-card text-card-foreground p-4 hidden md:block">
      <nav className="space-y-2">
        {sidebarItems.map((item, index) => (
          <Button
            key={index}
            variant="ghost"
            className={cn(
              "w-full justify-start",
              index === 0 && "bg-accent text-accent-foreground"
            )}
          >
            <item.icon className="mr-2 h-4 w-4" />
            {item.label}
          </Button>
        ))}
      </nav>
    </aside>
  )
}

