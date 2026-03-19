import { useState } from "react"
import { FileText, RotateCcw, Sparkles } from "lucide-react"

import TiptapEditor from "@/components/tiptap-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projectBriefContent = `
  <h2>Project brief</h2>
  <p>Esta pagina muestra una integracion reutilizable de TipTap con una experiencia inspirada en Notion.</p>
  <p>Puedes editar el contenido, aplicar formato y despues reutilizar el mismo componente en otras pantallas pasandole el HTML desde fuera.</p>
  <ul>
    <li>Resumen ejecutivo para stakeholders</li>
    <li>Lista de prioridades para la semana</li>
    <li>Notas rapidas de producto</li>
  </ul>
  <blockquote>
    El contenido inicial entra por props y el componente emite cambios hacia fuera.
  </blockquote>
`

const meetingNotesContent = `
  <h2>Meeting notes</h2>
  <p><strong>Objetivo:</strong> validar el flujo de contenidos largos en el panel interno.</p>
  <ol>
    <li>Revisar bloques de texto enriquecido.</li>
    <li>Definir estructura de plantillas reutilizables.</li>
    <li>Confirmar integracion con otras vistas del panel.</li>
  </ol>
  <pre><code>const reusable = true
const editor = "tiptap"</code></pre>
`

export default function NotionPage() {
  const [content, setContent] = useState(projectBriefContent)

  return (
    <div className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_320px]">
      <div className="space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="mb-2 flex items-center gap-2">
              <Badge variant="secondary">TipTap</Badge>
              <Badge variant="outline">Notion-like</Badge>
            </div>
            <h2 className="text-lg font-semibold">Editor reutilizable</h2>
            <p className="text-sm text-muted-foreground">
              El contenido se recibe desde fuera y tambien puede sincronizarse hacia el
              contenedor con `onChange`.
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setContent(meetingNotesContent)}
            >
              <FileText className="size-4" />
              Cargar meeting notes
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setContent(projectBriefContent)}
            >
              <RotateCcw className="size-4" />
              Restaurar ejemplo
            </Button>
          </div>
        </div>

        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Empieza a escribir como en Notion..."
        />
      </div>

      <Card className="h-fit shadow-none">
        <CardHeader>
          <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-muted">
            <Sparkles className="size-5 text-muted-foreground" />
          </div>
          <CardTitle>Componente listo para reutilizar</CardTitle>
          <CardDescription>
            Puedes usar este mismo editor en otras rutas pasandole un HTML inicial distinto.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium text-foreground">Props principales</p>
            <p>`content`, `onChange`, `placeholder`, `editable`, `autofocus`</p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium text-foreground">Uso esperado</p>
            <p>Plantillas, notas internas, briefs, actas y bloques de contenido editable.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
