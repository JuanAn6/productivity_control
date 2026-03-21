import { Filter, Plus } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { CustomPagination } from "~/components/pagination";

const issues = [
  {
    id: 1,
    status: "In progress",
    name: "20025 Bad request of field",
    type: "Bug",
    tags: ["Priority 1", "Bug"],
    date: "2026-03-20",
  },
  {
    id: 2,
    status: "Open",
    name: "20026 Login endpoint returns 500",
    type: "Bug",
    tags: ["Priority 1", "Backend"],
    date: "2026-03-18",
  },
  {
    id: 3,
    status: "Closed",
    name: "20027 Improve dashboard loading time",
    type: "Feature",
    tags: ["Priority 2", "Frontend"],
    date: "2026-03-15",
  },
  {
    id: 4,
    status: "In review",
    name: "20028 Refactor user service",
    type: "Task",
    tags: ["Tech Debt"],
    date: "2026-03-19",
  },
  {
    id: 5,
    status: "Open",
    name: "20029 Add password strength validation",
    type: "Feature",
    tags: ["Priority 2", "Security"],
    date: "2026-03-17",
  },
  {
    id: 6,
    status: "Blocked",
    name: "20030 Payment gateway timeout issue",
    type: "Bug",
    tags: ["Priority 1", "External"],
    date: "2026-03-16",
  },
  {
    id: 7,
    status: "Closed",
    name: "20031 Update dependencies",
    type: "Task",
    tags: ["Maintenance"],
    date: "2026-03-10",
  },
  {
    id: 8,
    status: "In progress",
    name: "20032 Mobile layout fixes",
    type: "Bug",
    tags: ["Priority 2", "UI"],
    date: "2026-03-21",
  },
  {
    id: 9,
    status: "Open",
    name: "20033 Add dark mode support",
    type: "Feature",
    tags: ["UX"],
    date: "2026-03-14",
  },
  {
    id: 10,
    status: "In review",
    name: "20034 Optimize database queries",
    type: "Task",
    tags: ["Performance"],
    date: "2026-03-19",
  }
];

const statusVariant = (status: string) => {
  if (status === "Paid") return "secondary"
  if (status === "Pending") return "muted"
  return "outline"
}

const onPageChange = (newPage: number) => {
  console.log('page change: ', newPage);
}

export default function Tabla() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Recent orders</h2>
          <p className="text-sm text-muted-foreground">
            Example data table using the UI components.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" type="button">
            <Filter className="size-4" />
            Filter
          </Button>
          <Button size="sm" type="button">
            <Plus className="size-4" />
            New order
          </Button>
        </div>
      </div>

      <Table>
        {/* <TableCaption>Latest orders processed by the team.</TableCaption> */}
        <TableHeader>
          <TableRow>
            <TableHead>Status</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Tags</TableHead>
            <TableHead className="text-right">Date</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {issues.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.status}</TableCell>
              <TableCell>{row.name}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(row.type)}>{row.type}</Badge>
              </TableCell>
              <TableCell>{row.tags[0]}</TableCell>
              <TableCell className="text-right">{row.date}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <CustomPagination 
        itemsLength={issues.length}
        itemsPerPage={5}
        currentPage={1}
        onPageChange={onPageChange}
      />
    </div>
  )
}
