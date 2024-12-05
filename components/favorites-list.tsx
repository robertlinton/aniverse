'use client'

import { useEffect, useState } from 'react'
import { useAuth } from "@/components/auth-provider"
import { getFavorites } from '@/lib/firestore'
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"
import Link from 'next/link'
import { Anime } from '@/types/anime'
import { useRouter } from 'next/navigation'

export function FavoritesList() {
  const [favorites, setFavorites] = useState<Anime[]>([])
  const [loading, setLoading] = useState(true)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push('/signin')
      return
    }

    async function fetchFavorites() {
      try {
        const userFavorites = await getFavorites(user.uid)
        setFavorites(userFavorites)
      } catch (error) {
        console.error('Error fetching favorites:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFavorites()
  }, [user, router])

  if (loading) {
    return <div>Loading your favorites...</div>
  }

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

