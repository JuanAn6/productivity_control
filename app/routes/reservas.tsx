import { useMemo, useState } from "react"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { es } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"

const diningHalls = [
  "Comedor Central",
  "Comedor Infantil",
  "Comedor Secundaria",
]

const menus = [
  {
    id: "balanceado",
    name: "Menu balanceado",
    description: "Opciones suaves con vegetales frescos y proteina ligera.",
    calories: "650 kcal",
    tags: ["Vegetariano", "Sin frituras"],
    items: [
      { label: "Entrante", detail: "Crema de calabaza con crujiente de pan" },
      { label: "Plato principal", detail: "Pollo al horno con papas y ensalada" },
      { label: "Postre", detail: "Fruta de temporada y yogur natural" },
    ],
    allergens: ["Gluten", "Lactosa"],
  },
  {
    id: "energia",
    name: "Menu energetico",
    description: "Ideal para dias de actividades deportivas y recreo largo.",
    calories: "820 kcal",
    tags: ["Proteico", "Alto en fibra"],
    items: [
      { label: "Entrante", detail: "Ensalada de garbanzos con tomate" },
      { label: "Plato principal", detail: "Pasta integral con salsa de carne" },
      { label: "Postre", detail: "Compota de manzana con canela" },
    ],
    allergens: ["Gluten", "Legumbres"],
  },
  {
    id: "suave",
    name: "Menu suave",
    description: "Platos sencillos con sabores tradicionales y digestivos.",
    calories: "590 kcal",
    tags: ["Bajo en sal", "Suave"],
    items: [
      { label: "Entrante", detail: "Sopa de verduras con arroz" },
      { label: "Plato principal", detail: "Tortilla de papas con ensalada" },
      { label: "Postre", detail: "Gelatina de frutas" },
    ],
    allergens: ["Huevo", "Lactosa"],
  },
]

export default function Reservas() {
  const [selectedHall, setSelectedHall] = useState(diningHalls[0])
  const [selectedMenuId, setSelectedMenuId] = useState(menus[0].id)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>()

  const selectedMenu = useMemo(() => {
    return menus.find((menu) => menu.id === selectedMenuId) ?? menus[0]
  }, [selectedMenuId])

  const formattedDate = selectedDate
    ? format(selectedDate, "PPP", { locale: es })
    : "Sin fecha"

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Reserva de comedor</CardTitle>
          <CardDescription>
            Completa los datos para asegurar un cupo y elegir el menu del dia.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="dining-hall">Comedor</Label>
            <Select
              value={selectedHall}
              onValueChange={(value) => setSelectedHall(value)}
            >
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Selecciona el comedor" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  <SelectLabel>Comedor</SelectLabel>
                  {diningHalls.map((hall) => (
                    <SelectItem key={hall} value={hall}>{hall}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Dia reserva</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  type="button"
                  className={cn(
                    "w-full justify-between",
                    !selectedDate && "text-muted-foreground"
                  )}
                >
                  {selectedDate
                    ? format(selectedDate, "PPP", { locale: es })
                    : "Selecciona una fecha"}
                  <CalendarDays className="size-4 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  locale={es}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Menu disponible</Label>
              <span className="text-xs text-muted-foreground">
                {menus.length} opciones hoy
              </span>
            </div>
            <div className="grid gap-3">
              {menus.map((menu) => {
                const isSelected = menu.id === selectedMenuId
                return (
                  <button
                    key={menu.id}
                    type="button"
                    onClick={() => setSelectedMenuId(menu.id)}
                    aria-pressed={isSelected}
                    className={cn(
                      "w-full rounded-xl border p-4 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      isSelected
                        ? "border-primary bg-primary/5 shadow-sm"
                        : "hover:bg-muted/40"
                    )}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-sm font-semibold">{menu.name}</p>
                        <p className="text-xs text-muted-foreground">{menu.description}</p>
                      </div>
                      <span
                        className={cn(
                          "rounded-full border px-2 py-0.5 text-xs font-medium",
                          isSelected ? "border-primary text-primary" : "text-muted-foreground"
                        )}
                      >
                        {menu.calories}
                      </span>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {menu.tags.map((tag) => (
                        <Badge key={tag} variant="secondary" className="text-[0.7rem]">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <Button type="button">Confirmar reserva</Button>
            <Button type="button" variant="outline">
              Guardar borrador
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Resumen del menu</CardTitle>
          <CardDescription>
            Vista previa con los platos elegidos para el dia seleccionado.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Menu seleccionado
            </p>
            <div className="mt-2 flex flex-wrap items-start justify-between gap-3">
              <div>
                <h3 className="text-lg font-semibold text-foreground">
                  {selectedMenu.name}
                </h3>
                <p className="text-sm text-muted-foreground">{selectedMenu.description}</p>
              </div>
              <Badge variant="secondary">{selectedMenu.calories}</Badge>
            </div>
          </div>

          <div className="grid gap-3">
            {selectedMenu.items.map((item, index) => (
              <div key={item.label} className="flex gap-3 rounded-xl border p-3">
                <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-xs font-semibold text-primary">
                  {index + 1}
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">{item.label}</p>
                  <p className="text-xs text-muted-foreground">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap gap-2">
            {selectedMenu.allergens.map((allergen) => (
              <Badge key={allergen} variant="outline">
                {allergen}
              </Badge>
            ))}
          </div>

          <div className="grid gap-2 rounded-xl border bg-background/60 p-4 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Comedor</span>
              <span className="font-medium text-foreground">{selectedHall}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Dia</span>
              <span
                className={cn(
                  "font-medium",
                  !selectedDate && "text-muted-foreground"
                )}
              >
                {formattedDate}
              </span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Porciones estimadas</span>
              <span className="font-medium text-foreground">120 raciones</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
