import { Calendar, Cloud, Folder, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "Aurora Campaign",
    description: "Segmented launch for active users.",
    metric: "48% CTR",
    tag: "Marketing",
    icon: Sparkles,
  },
  {
    title: "Daily backups",
    description: "Last backup completed 3 hours ago.",
    metric: "99.9% OK",
    tag: "Infrastructure",
    icon: Cloud,
  },
  {
    title: "Roadmap Q2",
    description: "11 tasks in progress, 3 blocked.",
    metric: "14/22",
    tag: "Product",
    icon: Folder,
  },
  {
    title: "Team agenda",
    description: "Next all-hands meeting on Thursday.",
    metric: "09:30",
    tag: "People",
    icon: Calendar,
  },
  {
    title: "Weekly NPS",
    description: "New responses in the last 7 days.",
    metric: "62 pts",
    tag: "Customers",
    icon: Sparkles,
  },
  {
    title: "Pipeline status",
    description: "4 deals are entering final review.",
    metric: "$124K",
    tag: "Sales",
    icon: Folder,
  },
]

export default function Cards() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Information cards</h2>
          <p className="text-sm text-muted-foreground">
            Example cards with sample content and tags.
          </p>
        </div>
        <Button size="sm" variant="secondary" type="button">
          View full report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {cards.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="shadow-none">
              <CardHeader className="space-y-3">
                <div className="flex items-center justify-between">
                  <Badge variant="outline">{item.tag}</Badge>
                  <Icon className="size-4 text-muted-foreground" />
                </div>
                <div>
                  <CardTitle className="text-base">{item.title}</CardTitle>
                  <CardDescription>{item.description}</CardDescription>
                </div>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <span className="text-xl font-semibold">{item.metric}</span>
                <Button size="sm" variant="ghost" type="button">
                  View details
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
