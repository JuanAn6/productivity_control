import { Calendar, Cloud, Folder, Sparkles } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const cards = [
  {
    title: "Campana Aurora",
    description: "Lanzamiento segmentado para usuarios activos.",
    metric: "48% CTR",
    tag: "Marketing",
    icon: Sparkles,
  },
  {
    title: "Backups diarios",
    description: "Ultimo respaldo completado hace 3 horas.",
    metric: "99.9% OK",
    tag: "Infra",
    icon: Cloud,
  },
  {
    title: "Roadmap Q2",
    description: "11 tareas en progreso, 3 bloqueadas.",
    metric: "14/22",
    tag: "Producto",
    icon: Folder,
  },
  {
    title: "Agenda del equipo",
    description: "Proxima reunion general el jueves.",
    metric: "09:30",
    tag: "People",
    icon: Calendar,
  },
  {
    title: "NPS semanal",
    description: "Respuestas nuevas en los ultimos 7 dias.",
    metric: "62 pts",
    tag: "Clientes",
    icon: Sparkles,
  },
  {
    title: "Estado del pipeline",
    description: "4 deals entran en revision final.",
    metric: "$124K",
    tag: "Ventas",
    icon: Folder,
  },
]

export default function Cards() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Tarjetas de informacion</h2>
          <p className="text-sm text-muted-foreground">
            Ejemplo de cards con contenido aleatorio y etiquetas.
          </p>
        </div>
        <Button size="sm" variant="secondary" type="button">
          Ver reporte completo
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
                  Ver detalles
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
