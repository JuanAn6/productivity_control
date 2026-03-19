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
    title: "Eventos",
    value: "1,284",
    change: "+18",
    icon: Activity,
  },
  {
    title: "Alertas",
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
                <p className="text-xs text-muted-foreground">Ultimos 7 dias</p>
                <Badge className="mt-3" variant="secondary">
                  {item.change} vs semana pasada
                </Badge>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Resumen rapido</CardTitle>
          <CardDescription>
            Un vistazo a las prioridades y recordatorios del equipo.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4">
            <div>
              <p className="text-sm font-medium">Pendiente de aprobacion</p>
              <p className="text-xs text-muted-foreground">
                3 solicitudes requieren revision hoy.
              </p>
            </div>
            <Button size="sm" variant="secondary" type="button">
              Revisar solicitudes
            </Button>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border bg-muted/30 p-4">
            <div>
              <p className="text-sm font-medium">Campana activa</p>
              <p className="text-xs text-muted-foreground">
                2 automatizaciones finalizan esta semana.
              </p>
            </div>
            <Button size="sm" variant="outline" type="button">
              Ver campanas
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
