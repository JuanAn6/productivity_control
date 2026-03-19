import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

import { Button } from "@/components/ui/button"

export default function Calendario() {
  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Calendario mensual</h2>
          <p className="text-sm text-muted-foreground">
            Vista de ejemplo con FullCalendar en modo mes.
          </p>
        </div>
        <Button size="sm" variant="outline" type="button">
          Sin acciones
        </Button>
      </div>

      <div className="rounded-xl border bg-background p-4">
        <FullCalendar
          plugins={[dayGridPlugin]}
          initialView="dayGridMonth"
          headerToolbar={{
            left: "prev,next today",
            center: "title",
            right: "",
          }}
          events={[]}
          height="auto"
        />
      </div>
    </div>
  )
}
