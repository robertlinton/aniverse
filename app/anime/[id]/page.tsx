import { Suspense } from 'react'
import { getAnimeById } from '@/lib/firestore'
import { Button } from "@/components/ui/button"
import { PlayCircle } from 'lucide-react'
import Image from "next/image"
import { FavoriteButton } from '@/components/favorite-button'

async function AnimeContent({ id }: { id: string }) {
  const anime = await getAnimeById(id)

  if (!anime) {
    return <div>Anime not found</div>
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <Image
          src={anime.coverImage}
          alt={`${anime.title} cover`}
          layout="fill"
          objectFit="cover"
          className="brightness-50"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
      </div>

      {/* Content Section */}
      <div className="relative -mt-32 z-10 px-4 md:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Poster Image */}
            <div className="md:w-1/3 lg:w-1/4 flex-shrink-0">
              <div className="rounded-lg overflow-hidden shadow-2xl">
                <Image
                  src={anime.image}
                  alt={anime.title}
                  width={400}
                  height={600}
                  className="w-full"
                />
              </div>
            </div>

            {/* Details */}
            <div className="md:w-2/3 lg:w-3/4">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {anime.title}
                </h1>
                <FavoriteButton animeId={anime.id} />
              </div>

              <p className="text-lg text-gray-200 mb-6 leading-relaxed">
                {anime.description}
              </p>

              <div className="flex flex-wrap gap-2 mb-6">
                {anime.genres && anime.genres.length > 0 ? (
                  anime.genres.map((genre, index) => (
                    <span key={index} className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm">
                      {genre}
                    </span>
                  ))
                ) : (
                  <span className="text-muted-foreground">No genres available</span>
                )}
              </div>

              <Button size="lg" className="w-full md:w-auto">
                <PlayCircle className="mr-2 h-5 w-5" /> Watch Now
              </Button>
            </div>
          </div>

          {/* Additional Content */}
          <div className="mt-12 space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Episodes</h2>
              <div className="bg-card rounded-lg p-4">
                <p className="text-muted-foreground">
                  {anime.episodes > 0 
                    ? `${anime.episodes} episodes available`
                    : 'Episodes coming soon...'}
                </p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-semibold mb-4">Details</h2>
              <div className="bg-card rounded-lg p-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div>
                    <h3 className="text-sm text-muted-foreground">Format</h3>
                    <p>{anime.format}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Status</h3>
                    <p>{anime.status}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Release Date</h3>
                    <p>{anime.releaseDate}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Episodes</h3>
                    <p>{anime.episodes}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Duration</h3>
                    <p>{anime.duration}</p>
                  </div>
                  <div>
                    <h3 className="text-sm text-muted-foreground">Rating</h3>
                    <p>{anime.rating}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

interface AnimePageProps {
  params: { id: string }
}

export default function AnimePage({ params }: AnimePageProps) {
  return (
    <Suspense fallback={<div>Loading anime details...</div>}>
      <AnimeContent id={params.id} />
    </Suspense>
  )
}

