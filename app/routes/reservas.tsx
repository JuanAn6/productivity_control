import { useMemo, useState } from "react"
import { CalendarDays } from "lucide-react"
import { format } from "date-fns"
import { enUS } from "date-fns/locale"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue,} from "@/components/ui/select"

const diningHalls = [
  "Main Dining Hall",
  "Children's Dining Hall",
  "Secondary Dining Hall",
]

const menus = [
  {
    id: "balanceado",
    name: "Balanced menu",
    description: "Light options with fresh vegetables and lean protein.",
    calories: "650 kcal",
    tags: ["Vegetarian", "No fried food"],
    items: [
      { label: "Starter", detail: "Pumpkin cream soup with crispy bread" },
      { label: "Main course", detail: "Baked chicken with potatoes and salad" },
      { label: "Dessert", detail: "Seasonal fruit and plain yogurt" },
    ],
    allergens: ["Gluten", "Lactose"],
  },
  {
    id: "energia",
    name: "Energy menu",
    description: "Ideal for sports days and longer recess breaks.",
    calories: "820 kcal",
    tags: ["High protein", "High fiber"],
    items: [
      { label: "Starter", detail: "Chickpea salad with tomato" },
      { label: "Main course", detail: "Whole wheat pasta with meat sauce" },
      { label: "Dessert", detail: "Apple compote with cinnamon" },
    ],
    allergens: ["Gluten", "Legumes"],
  },
  {
    id: "suave",
    name: "Light menu",
    description: "Simple dishes with traditional and easy-to-digest flavors.",
    calories: "590 kcal",
    tags: ["Low salt", "Light"],
    items: [
      { label: "Starter", detail: "Vegetable soup with rice" },
      { label: "Main course", detail: "Spanish omelet with salad" },
      { label: "Dessert", detail: "Fruit jelly" },
    ],
    allergens: ["Egg", "Lactose"],
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
    ? format(selectedDate, "PPP", { locale: enUS })
    : "No date"

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Dining reservation</CardTitle>
          <CardDescription>
            Fill in the details to reserve a spot and choose the menu of the day.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-2">
            <Label htmlFor="dining-hall">Dining hall</Label>
            <Select
              value={selectedHall}
              onValueChange={(value) => setSelectedHall(value)}
            >
              <SelectTrigger className="w-full ">
                <SelectValue placeholder="Select a dining hall" />
              </SelectTrigger>
              <SelectContent >
                <SelectGroup>
                  <SelectLabel>Dining hall</SelectLabel>
                  {diningHalls.map((hall) => (
                    <SelectItem key={hall} value={hall}>{hall}</SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          <div className="grid gap-2">
            <Label>Reservation day</Label>
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
                    ? format(selectedDate, "PPP", { locale: enUS })
                    : "Select a date"}
                  <CalendarDays className="size-4 opacity-60" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={(date) => setSelectedDate(date)}
                  locale={enUS}
                />
              </PopoverContent>
            </Popover>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label>Available menu</Label>
              <span className="text-xs text-muted-foreground">
                {menus.length} options today
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
            <Button type="button">Confirm reservation</Button>
            <Button type="button" variant="outline">
              Save draft
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card className="shadow-none">
        <CardHeader>
          <CardTitle>Menu summary</CardTitle>
          <CardDescription>
            Preview of the dishes selected for the chosen day.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Selected menu
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
              <span className="text-muted-foreground">Dining hall</span>
              <span className="font-medium text-foreground">{selectedHall}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Day</span>
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
              <span className="text-muted-foreground">Estimated portions</span>
              <span className="font-medium text-foreground">120 servings</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
