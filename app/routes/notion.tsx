import { useState } from "react"
import { FileText, RotateCcw, Sparkles } from "lucide-react"

import TiptapEditor from "@/components/tiptap-editor"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

const projectBriefContent = `
  <h2>Project brief</h2>
  <p>This page shows a reusable TipTap integration with a Notion-inspired experience.</p>
  <p>You can edit the content, apply formatting, and then reuse the same component in other screens by passing HTML in from outside.</p>
  <ul>
    <li>Executive summary for stakeholders</li>
    <li>Weekly priority list</li>
    <li>Quick product notes</li>
  </ul>
  <p>Try <strong>/</strong> to open commands and <strong>@</strong> to insert mentions.</p>
  <blockquote>
    Initial content comes in through props and the component emits changes outward.
  </blockquote>
`

const meetingNotesContent = `
  <h2>Meeting notes</h2>
  <p><strong>Goal:</strong> validate the long-form content workflow inside the internal dashboard.</p>
  <ol>
    <li>Review rich text blocks.</li>
    <li>Define the reusable template structure.</li>
    <li>Confirm integration with other dashboard views.</li>
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
              <Badge variant="outline">Slash commands</Badge>
              <Badge variant="outline">Mentions</Badge>
            </div>
            <h2 className="text-lg font-semibold">Reusable editor</h2>
            <p className="text-sm text-muted-foreground">
              Content is received from outside and can also sync back to the parent
              through `onChange`. It also supports floating menus, checklists, links,
              alignment, images, and quick commands.
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
              Load meeting notes
            </Button>
            <Button
              type="button"
              variant="secondary"
              size="sm"
              onClick={() => setContent(projectBriefContent)}
            >
              <RotateCcw className="size-4" />
              Restore example
            </Button>
          </div>
        </div>

        <TiptapEditor
          content={content}
          onChange={setContent}
          placeholder="Start writing like in Notion..."
        />
      </div>

      <Card className="h-fit shadow-none">
        <CardHeader>
          <div className="mb-3 flex size-11 items-center justify-center rounded-2xl bg-muted">
            <Sparkles className="size-5 text-muted-foreground" />
          </div>
          <CardTitle>Component ready to reuse</CardTitle>
          <CardDescription>
            You can use this same editor in other routes by passing a different initial
            HTML value.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4 text-sm text-muted-foreground">
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium text-foreground">Main props</p>
            <p>`content`, `onChange`, `placeholder`, `editable`, `autofocus`</p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium text-foreground">Added interactions</p>
            <p>`/` for blocks, `@` for mentions, bubble menu, and floating menu.</p>
          </div>
          <div className="rounded-xl border bg-muted/30 p-4">
            <p className="font-medium text-foreground">Expected usage</p>
            <p>Templates, internal notes, briefs, meeting notes, and editable content blocks.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
