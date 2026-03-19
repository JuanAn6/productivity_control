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

const rows = [
  {
    id: "INV-001",
    cliente: "Acme Corp",
    estado: "Pagado",
    total: "$1,240",
    fecha: "10 Mar 2026",
  },
  {
    id: "INV-002",
    cliente: "Studio Nine",
    estado: "Pendiente",
    total: "$860",
    fecha: "08 Mar 2026",
  },
  {
    id: "INV-003",
    cliente: "Nexo Labs",
    estado: "Revisar",
    total: "$3,420",
    fecha: "06 Mar 2026",
  },
  {
    id: "INV-004",
    cliente: "Zeta Retail",
    estado: "Pagado",
    total: "$540",
    fecha: "02 Mar 2026",
  },
  {
    id: "INV-005",
    cliente: "Delta Works",
    estado: "Pendiente",
    total: "$1,980",
    fecha: "27 Feb 2026",
  },
]

const statusVariant = (status: string) => {
  if (status === "Pagado") return "secondary"
  if (status === "Pendiente") return "muted"
  return "outline"
}

export default function Tabla() {
  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">Pedidos recientes</h2>
          <p className="text-sm text-muted-foreground">
            Ejemplo de data table usando los componentes de la UI.
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" type="button">
            <Filter className="size-4" />
            Filtrar
          </Button>
          <Button size="sm" type="button">
            <Plus className="size-4" />
            Nuevo pedido
          </Button>
        </div>
      </div>

      <Table>
        <TableCaption>Ultimos pedidos procesados por el equipo.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Id</TableHead>
            <TableHead>Cliente</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Fecha</TableHead>
            <TableHead className="text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="font-medium">{row.id}</TableCell>
              <TableCell>{row.cliente}</TableCell>
              <TableCell>
                <Badge variant={statusVariant(row.estado)}>{row.estado}</Badge>
              </TableCell>
              <TableCell>{row.fecha}</TableCell>
              <TableCell className="text-right">{row.total}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
