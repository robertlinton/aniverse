'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Heart } from 'lucide-react'
import { useAuth } from "@/components/auth-provider"
import { addToFavorites, removeFromFavorites, isFavorite } from '@/lib/firestore'
import { useRouter } from 'next/navigation'

interface FavoriteButtonProps {
  animeId: string
}

export function FavoriteButton({ animeId }: FavoriteButtonProps) {
  const [isFav, setIsFav] = useState(false)
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (user) {
      isFavorite(user.uid, animeId).then(setIsFav)
    }
  }, [user, animeId])

  const handleToggleFavorite = async () => {
    if (!user) {
      router.push('/signin')
      return
    }

    try {
      if (isFav) {
        await removeFromFavorites(user.uid, animeId)
      } else {
        await addToFavorites(user.uid, animeId)
      }
      setIsFav(!isFav)
    } catch (error) {
      console.error('Error toggling favorite:', error)
    }
  }

  return (
    <Button
      variant={isFav ? "default" : "outline"}
      size="icon"
      onClick={handleToggleFavorite}
    >
      <Heart className={`h-4 w-4 ${isFav ? 'fill-current' : ''}`} />
    </Button>
  )
}

