import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function DiscoverPage() {
  return (
    <div className="container mx-auto p-4">
      <Card>
        <CardHeader>
          <CardTitle>Discover</CardTitle>
        </CardHeader>
        <CardContent>
          <p>This is the Discover page. Here you can explore new anime titles.</p>
        </CardContent>
      </Card>
    </div>
  )
}

