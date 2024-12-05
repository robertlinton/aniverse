import { Anime } from '@/types/anime'

const JIKAN_API_BASE_URL = 'https://api.jikan.moe/v4'

export async function searchAnime(query: string): Promise<Anime[]> {
  const response = await fetch(`${JIKAN_API_BASE_URL}/anime?q=${encodeURIComponent(query)}&limit=5`)
  const data = await response.json()

  return data.data.map((item: any) => ({
    id: '', // This will be filled by Firestore
    malId: item.mal_id.toString(), // Store MAL ID separately
    title: item.title,
    description: item.synopsis,
    image: item.images.jpg.image_url,
    coverImage: item.images.jpg.large_image_url,
    isFeatured: false,
    format: item.type,
    status: item.status,
    releaseDate: item.aired.from ? new Date(item.aired.from).toISOString().split('T')[0] : '',
    episodes: item.episodes || 0,
    genres: item.genres.map((genre: any) => genre.name),
    duration: item.duration,
    rating: item.rating,
  }))
}

export async function getAnimeDetails(malId: string): Promise<Anime | null> {
  const response = await fetch(`${JIKAN_API_BASE_URL}/anime/${malId}/full`)
  const data = await response.json()

  if (!data.data) {
    return null
  }

  const item = data.data
  return {
    id: '', // This will be filled by Firestore
    malId: item.mal_id.toString(), // Store MAL ID separately
    title: item.title,
    description: item.synopsis,
    image: item.images.jpg.image_url,
    coverImage: item.images.jpg.large_image_url,
    isFeatured: false,
    format: item.type,
    status: item.status,
    releaseDate: item.aired.from ? new Date(item.aired.from).toISOString().split('T')[0] : '',
    episodes: item.episodes || 0,
    genres: item.genres.map((genre: any) => genre.name),
    duration: item.duration,
    rating: item.rating,
  }
}

