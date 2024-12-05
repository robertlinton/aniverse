import { Suspense } from 'react'
import { FavoritesList } from '@/components/favorites-list'

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

