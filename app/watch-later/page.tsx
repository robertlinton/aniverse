import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function WatchLaterPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Watch Later</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the Watch Later page. Anime you want to watch later will be listed here.</p>
        </CardContent>
      </Card>
    </div>
  )
}

