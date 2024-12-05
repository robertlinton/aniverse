import { Suspense } from 'react'
import { getFavorites } from '@/lib/firestore'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from 'next/link'
import { useAuth } from "@/components/auth-provider"
import { redirect } from 'next/navigation'

async function FavoritesList() {
  const { user } = useAuth()

  if (!user) {
    redirect('/signin')
  }

  const favorites = await getFavorites(user.uid)

  if (favorites.length === 0) {
    return <div>You haven't added any favorites yet.</div>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      {favorites.map((anime) => (
        <Link href={`/anime/${anime.id}`} key={anime.id}>
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Image
                src={anime.image}
                alt={anime.title}
                width={200}
                height={300}
                className="w-full h-auto"
              />
              <div className="p-2">
                <h4 className="font-semibold truncate">{anime.title}</h4>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
}

export default function FavoritesPage() {
  return (
    <div className="space-y-6">
      <h2 className="text-3xl font-bold">Your Favorites</h2>
      <Suspense fallback={<div>Loading your favorites...</div>}>
        <FavoritesList />
      </Suspense>
    </div>
  )
}

