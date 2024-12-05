import { Suspense } from 'react'
import { getAnimeByCategory } from '@/lib/firestore'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Image from "next/image"
import Link from 'next/link'

async function TVSeriesList() {
  const tvSeries = await getAnimeByCategory('tv', 12)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {tvSeries.map((anime) => (
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

export default function TVSeriesPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>TV Series</CardTitle>
        </CardHeader>
        <CardContent>
          <Suspense fallback={<div>Loading TV series...</div>}>
            <TVSeriesList />
          </Suspense>
        </CardContent>
      </Card>
    </div>
  )
}

