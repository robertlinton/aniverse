'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { addAnime, getAllAnime } from '@/lib/admin'
import { Anime } from '@/types/anime'
import { EditAnimeForm } from './edit-anime-form'
import { Plus, Edit, Search } from 'lucide-react'
import { searchAnime, getAnimeDetails } from '@/lib/api-utils'

export function AdminDashboard() {
  const [animeList, setAnimeList] = useState<Anime[]>([])
  const [editingAnime, setEditingAnime] = useState<Anime | null>(null)
  const [animeData, setAnimeData] = useState<Omit<Anime, 'id'>>({
    title: '',
    description: '',
    image: '',
    coverImage: '',
    isFeatured: false,
    format: '',
    status: '',
    releaseDate: '',
    episodes: 0,
    genres: [],
    duration: '',
    rating: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState<Anime[]>([])

  useEffect(() => {
    fetchAnimeList()
  }, [])

  const fetchAnimeList = async () => {
    try {
      const anime = await getAllAnime()
      setAnimeList(anime)
    } catch (err) {
      console.error('Failed to fetch anime list:', err)
    }
  }

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
    setSuccess(null)

    try {
      const id = await addAnime(animeData)
      setSuccess(`Anime added successfully with ID: ${id}`)
      setAnimeData({
        title: '',
        description: '',
        image: '',
        coverImage: '',
        isFeatured: false,
        format: '',
        status: '',
        releaseDate: '',
        episodes: 0,
        genres: [],
        duration: '',
        rating: ''
      })
      fetchAnimeList()
      setIsAddDialogOpen(false)
    } catch (err) {
      setError('Failed to add anime. Please try again.')
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = async () => {
    if (!searchQuery.trim()) return

    setIsLoading(true)
    try {
      const results = await searchAnime(searchQuery)
      setSearchResults(results)
    } catch (err) {
      console.error('Failed to search anime:', err)
      setError('Failed to search anime. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSelectAnime = async (anime: Anime) => {
    setIsLoading(true)
    try {
      const details = await getAnimeDetails(anime.malId)
      if (details) {
        setAnimeData(details)
        setIsAddDialogOpen(true)
      }
    } catch (err) {
      console.error('Failed to get anime details:', err)
      setError('Failed to get anime details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="container mx-auto p-4 space-y-8">
      <Tabs defaultValue="list" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="list">Anime List</TabsTrigger>
          <TabsTrigger value="add">Add New Anime</TabsTrigger>
        </TabsList>
        <TabsContent value="list">
          <Card>
            <CardHeader>
              <CardTitle>Anime List</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {animeList.map(anime => (
                  <Card key={anime.id} className="flex flex-col justify-between">
                    <CardContent className="pt-6">
                      <h3 className="font-bold text-lg mb-2">{anime.title}</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        {anime.description ? anime.description.substring(0, 100) + '...' : 'No description available'}
                      </p>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          {anime.format || 'N/A'} | {anime.status || 'N/A'}
                        </span>
                        <Button variant="outline" size="sm" onClick={() => setEditingAnime(anime)}>
                          <Edit className="mr-2 h-4 w-4" /> Edit
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="add">
          <Card>
            <CardHeader>
              <CardTitle>Add New Anime</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-2 mb-4">
                <Input
                  placeholder="Search for anime..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <Button onClick={handleSearch} disabled={isLoading}>
                  <Search className="mr-2 h-4 w-4" /> Search
                </Button>
              </div>
              {searchResults.length > 0 && (
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Search Results:</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {searchResults.map(anime => (
                      <Card key={anime.id} className="flex flex-col justify-between">
                        <CardContent className="pt-6">
                          <h4 className="font-bold text-md mb-2">{anime.title}</h4>
                          <p className="text-sm text-muted-foreground mb-4">
                            {anime.description ? anime.description.substring(0, 100) + '...' : 'No description available'}
                          </p>
                          <Button onClick={() => handleSelectAnime(anime)} size="sm">
                            Select
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
              <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
                <DialogTrigger asChild>
                  <Button>
                    <Plus className="mr-2 h-4 w-4" /> Add New Anime Manually
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Add New Anime</DialogTitle>
                    <DialogDescription>
                      Fill in the details for the new anime. Click save when you're done.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Form fields (unchanged) */}
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    {success && <p className="text-green-500 text-sm">{success}</p>}
                    <Button type="submit" disabled={isLoading}>
                      {isLoading ? 'Adding...' : 'Add Anime'}
                    </Button>
                  </form>
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {editingAnime && (
        <Dialog open={!!editingAnime} onOpenChange={(open) => !open && setEditingAnime(null)}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Anime: {editingAnime.title}</DialogTitle>
            </DialogHeader>
            <EditAnimeForm
              anime={editingAnime}
              onCancel={() => setEditingAnime(null)}
              onSuccess={() => {
                setEditingAnime(null)
                fetchAnimeList()
              }}
            />
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}

