import FullCalendar from "@fullcalendar/react"
import dayGridPlugin from "@fullcalendar/daygrid"

import { Button } from "@/components/ui/button"

export default function Calendario() {
  return (
    <div className="space-y-4 ">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Monthly calendar</h2>
          <p className="text-sm text-muted-foreground">
            Example view using FullCalendar in month mode.
          </p>
        </div>
        <Button size="sm" variant="outline" type="button">
          No actions
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
