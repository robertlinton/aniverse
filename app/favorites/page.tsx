import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function FavoritesPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Favorites</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the Favorites page. Your favorite anime will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

