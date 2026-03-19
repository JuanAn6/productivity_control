import type { ComponentType } from "react"
import { useEffect, useEffectEvent } from "react"
import {
  Bold,
  Code2,
  Heading2,
  Italic,
  List,
  ListOrdered,
  Quote,
  Redo2,
  Undo2,
} from "lucide-react"
import type { Editor as TiptapEditorInstance } from "@tiptap/react"
import { EditorContent, useEditor } from "@tiptap/react"
import Placeholder from "@tiptap/extension-placeholder"
import StarterKit from "@tiptap/starter-kit"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

type TiptapEditorProps = {
  content: string
  onChange?: (content: string) => void
  placeholder?: string
  editable?: boolean
  autofocus?: boolean
  className?: string
}

type ToolbarItem = {
  label: string
  icon: ComponentType<{ className?: string }>
  isActive: (editor: TiptapEditorInstance | null) => boolean
  run: (editor: TiptapEditorInstance | null) => boolean | undefined
}

const toolbarItems: ToolbarItem[] = [
  {
    label: "Titulo",
    icon: Heading2,
    isActive: (editor) => editor?.isActive("heading", { level: 2 }) ?? false,
    run: (editor) => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: "Negrita",
    icon: Bold,
    isActive: (editor) => editor?.isActive("bold") ?? false,
    run: (editor) => editor?.chain().focus().toggleBold().run(),
  },
  {
    label: "Cursiva",
    icon: Italic,
    isActive: (editor) => editor?.isActive("italic") ?? false,
    run: (editor) => editor?.chain().focus().toggleItalic().run(),
  },
  {
    label: "Lista",
    icon: List,
    isActive: (editor) => editor?.isActive("bulletList") ?? false,
    run: (editor) => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    label: "Lista numerada",
    icon: ListOrdered,
    isActive: (editor) => editor?.isActive("orderedList") ?? false,
    run: (editor) => editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    label: "Cita",
    icon: Quote,
    isActive: (editor) => editor?.isActive("blockquote") ?? false,
    run: (editor) => editor?.chain().focus().toggleBlockquote().run(),
  },
  {
    label: "Codigo",
    icon: Code2,
    isActive: (editor) => editor?.isActive("codeBlock") ?? false,
    run: (editor) => editor?.chain().focus().toggleCodeBlock().run(),
  },
]

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Escribe aqui tu documento...",
  editable = true,
  autofocus = true,
  className,
}: TiptapEditorProps) {
  const handleChange = useEffectEvent((nextContent: string) => {
    onChange?.(nextContent)
  })

  const editor = useEditor(
    {
      extensions: [
        StarterKit,
        Placeholder.configure({
          placeholder,
        }),
      ],
      content,
      autofocus,
      editable,
      injectCSS: false,
      immediatelyRender: false,
      editorProps: {
        attributes: {
          class: "tiptap-editor-content",
        },
      },
      onUpdate: ({ editor }) => {
        handleChange(editor.getHTML())
      },
    },
    [editable, autofocus, placeholder]
  )

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() === content) return
    editor.commands.setContent(content, { emitUpdate: false })
  }, [content, editor])

  return (
    <div className={cn("overflow-hidden rounded-2xl border bg-background", className)}>
      <div className="flex flex-wrap items-center gap-2 border-b bg-muted/40 px-4 py-3">
        {toolbarItems.map((item) => {
          const Icon = item.icon
          const active = item.isActive(editor)

          return (
            <Button
              key={item.label}
              type="button"
              size="sm"
              variant={active ? "secondary" : "ghost"}
              className="h-9 rounded-xl"
              onClick={() => item.run(editor)}
              disabled={!editor || !editable}
              aria-label={item.label}
            >
              <Icon className="size-4" />
            </Button>
          )
        })}

        <div className="ml-auto flex items-center gap-2">
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-9 rounded-xl"
            onClick={() => editor?.chain().focus().undo().run()}
            disabled={!editor?.can().undo() || !editable}
            aria-label="Deshacer"
          >
            <Undo2 className="size-4" />
          </Button>
          <Button
            type="button"
            size="sm"
            variant="ghost"
            className="h-9 rounded-xl"
            onClick={() => editor?.chain().focus().redo().run()}
            disabled={!editor?.can().redo() || !editable}
            aria-label="Rehacer"
          >
            <Redo2 className="size-4" />
          </Button>
        </div>
      </div>

      <EditorContent editor={editor} />
    </div>
  )
}
