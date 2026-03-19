import { Activity, Bell, TrendingUp } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const quickStats = [
  {
    title: "Conversion",
    value: "12.4%",
    change: "+2.1%",
    icon: TrendingUp,
  },
  {
    title: "Events",
    value: "1,284",
    change: "+18",
    icon: Activity,
  },
  {
    title: "Alerts",
    value: "7",
    change: "-3",
    icon: Bell,
  },
]

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-3">
        {quickStats.map((item) => {
          const Icon = item.icon
          return (
            <Card key={item.title} className="shadow-none">
              <CardHeader className="flex-row items-center justify-between border-b-0 pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
                <Icon className="size-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-semibold">{item.value}</div>
                <p className="text-xs text-muted-foreground">Last 7 days</p>
                <Badge className="mt-3" variant="secondary">
                  {item.change} vs last week
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Quick summary</CardTitle>
          <CardDescription>A snapshot of the team priorities and reminders.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4">
            <div>
              <p className="text-sm font-medium">Pending approval</p>
              <p className="text-xs text-muted-foreground">3 requests need review today.</p>
            </div>
            <Button size="sm" variant="secondary" type="button">
              Review requests
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4">
            <div>
              <p className="text-sm font-medium">Active campaign</p>
              <p className="text-xs text-muted-foreground">
                2 automations are ending this week.
              </p>
            </div>
            <Button size="sm" variant="outline" type="button">
              View campaigns
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
