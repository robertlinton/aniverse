import { Suspense } from 'react'
import { getFeaturedAnime, getPopularAnime } from '@/lib/firestore'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { PlayCircle } from 'lucide-react'
import Image from "next/image"
import Link from 'next/link'
import { Anime } from '@/types/anime'

async function FeaturedAnime() {
  const featuredAnime = await getFeaturedAnime()

  if (!featuredAnime) return <div>No featured anime available</div>

  return (
    <section className="relative h-[500px] rounded-lg overflow-hidden">
      <Image
        src={featuredAnime.coverImage}
        alt={`${featuredAnime.title} cover`}
        layout="fill"
        objectFit="cover"
        className="z-0"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-background to-transparent z-10" />
      <div className="absolute bottom-0 left-0 p-6 z-20 w-full md:w-2/3 lg:w-1/2">
        <h2 className="text-4xl font-bold mb-2 text-white">{featuredAnime.title}</h2>
        <p className="text-lg mb-4 text-gray-200">{featuredAnime.description}</p>
        <Link href={`/anime/${featuredAnime.id}`}>
          <Button size="lg">
            <PlayCircle className="mr-2 h-5 w-5" /> Watch Now
          </Button>
        </Link>
      </div>
    </section>
  )
}

async function PopularAnime() {
  const animeList = await getPopularAnime()

  return (
    <section>
      <h3 className="text-2xl font-semibold mb-4">Popular Anime</h3>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {animeList.map((anime) => (
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
    </section>
  )
}

export default function Home() {
  return (
    <div className="space-y-6">
      <Suspense fallback={<div>Loading featured anime...</div>}>
        <FeaturedAnime />
      </Suspense>
      <Suspense fallback={<div>Loading popular anime...</div>}>
        <PopularAnime />
      </Suspense>
    </div>
  )
}

