import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { updateAnime } from '@/lib/admin'
import { Anime } from '@/types/anime'

interface EditAnimeFormProps {
  anime: Anime;
  onCancel: () => void;
  onSuccess: () => void;
}

export function EditAnimeForm({ anime, onCancel, onSuccess }: EditAnimeFormProps) {
  const [animeData, setAnimeData] = useState<Omit<Anime, 'id'>>({
    ...anime,
    genres: anime.genres || []
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setAnimeData(prev => ({ ...prev, [name]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target
    setAnimeData(prev => ({ ...prev, [name]: checked }))
  }

  const handleGenresChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const genres = e.target.value.split(',').map(genre => genre.trim())
    setAnimeData(prev => ({ ...prev, genres }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      await updateAnime(anime.id, animeData)
      onSuccess()
    } catch (err) {
      setError('Failed to update anime. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="title">Title</Label>
          <Input
            id="title"
            name="title"
            value={animeData.title}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            name="description"
            value={animeData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="image">Thumbnail Image URL</Label>
          <Input
            id="image"
            name="image"
            value={animeData.image}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="coverImage">Cover Image URL</Label>
          <Input
            id="coverImage"
            name="coverImage"
            value={animeData.coverImage}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="format">Format</Label>
          <Input
            id="format"
            name="format"
            value={animeData.format}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="status">Status</Label>
          <Input
            id="status"
            name="status"
            value={animeData.status}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="releaseDate">Release Date</Label>
          <Input
            id="releaseDate"
            name="releaseDate"
            value={animeData.releaseDate}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="episodes">Number of Episodes</Label>
          <Input
            id="episodes"
            name="episodes"
            type="number"
            value={animeData.episodes}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="genres">Genres (comma-separated)</Label>
          <Input
            id="genres"
            name="genres"
            value={animeData.genres.join(', ')}
            onChange={handleGenresChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="duration">Episode Duration</Label>
          <Input
            id="duration"
            name="duration"
            value={animeData.duration}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rating">Rating</Label>
          <Input
            id="rating"
            name="rating"
            value={animeData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="flex items-center space-x-2">
          <input
            type="checkbox"
            id="isFeatured"
            name="isFeatured"
            checked={animeData.isFeatured}
            onChange={handleCheckboxChange}
          />
          <Label htmlFor="isFeatured">Featured Anime</Label>
        </div>
      </div>
      {error && <p className="text-red-500 text-sm">{error}</p>}
      <div className="flex space-x-2">
        <Button type="submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Anime'}
        </Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}

