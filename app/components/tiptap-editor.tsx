import type { ComponentType } from "react"
import { useEffect, useEffectEvent, useRef, useState } from "react"
import {
  AlignCenter,
  AlignJustify,
  AlignLeft,
  AlignRight,
  AtSign,
  Bold,
  Code2,
  Heading1,
  Heading2,
  Heading3,
  Highlighter,
  ImagePlus,
  Italic,
  Link2,
  List,
  ListOrdered,
  ListTodo,
  Minus,
  Pilcrow,
  Quote,
  Redo2,
  Sparkles,
  Strikethrough,
  Underline,
  Undo2,
} from "lucide-react"
import Highlight from "@tiptap/extension-highlight"
import Image from "@tiptap/extension-image"
import Mention from "@tiptap/extension-mention"
import Placeholder from "@tiptap/extension-placeholder"
import TaskItem from "@tiptap/extension-task-item"
import TaskList from "@tiptap/extension-task-list"
import TextAlign from "@tiptap/extension-text-align"
import type { Editor as TiptapEditorInstance } from "@tiptap/react"
import { EditorContent, useEditor } from "@tiptap/react"
import { BubbleMenu, FloatingMenu } from "@tiptap/react/menus"
import StarterKit from "@tiptap/starter-kit"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type TiptapEditorProps = {
  content: string
  onChange?: (content: string) => void
  placeholder?: string
  editable?: boolean
  autofocus?: boolean
  className?: string
}

type MenuRange = {
  from: number
  to: number
}

type MenuState<T> = {
  items: T[]
  position: {
    x: number
    y: number
  }
  query: string
  range: MenuRange
  selectedIndex: number
}

type MentionSuggestion = {
  id: string
  label: string
  role: string
}

type SlashCommand = {
  id:
    | "text"
    | "h1"
    | "h2"
    | "h3"
    | "bullet"
    | "ordered"
    | "todo"
    | "quote"
    | "code"
    | "divider"
    | "image"
    | "emoji"
  title: string
  description: string
  keywords: string[]
  icon: ComponentType<{ className?: string }>
}

type ToolbarItem = {
  label: string
  icon: ComponentType<{ className?: string }>
  isActive: (editor: TiptapEditorInstance | null) => boolean
  run: (editor: TiptapEditorInstance | null) => boolean | undefined
}

const mentionSuggestions: MentionSuggestion[] = [
  { id: "ana", label: "Ana Ruiz", role: "Product" },
  { id: "carlos", label: "Carlos Vega", role: "Design" },
  { id: "maria", label: "Maria Perez", role: "Engineering" },
  { id: "sofia", label: "Sofia Martin", role: "Marketing" },
]

const slashCommands: SlashCommand[] = [
  {
    id: "text",
    title: "Text",
    description: "Switch back to a normal paragraph.",
    keywords: ["paragraph", "text", "normal"],
    icon: Pilcrow,
  },
  {
    id: "h1",
    title: "Heading 1",
    description: "Main title for the section.",
    keywords: ["title", "heading", "h1"],
    icon: Heading1,
  },
  {
    id: "h2",
    title: "Heading 2",
    description: "Document subtitle.",
    keywords: ["heading", "h2", "subtitle"],
    icon: Heading2,
  },
  {
    id: "h3",
    title: "Heading 3",
    description: "More compact section heading.",
    keywords: ["heading", "h3"],
    icon: Heading3,
  },
  {
    id: "bullet",
    title: "Bullet list",
    description: "Bulleted list.",
    keywords: ["list", "bullet", "ul"],
    icon: List,
  },
  {
    id: "ordered",
    title: "Ordered list",
    description: "Numbered list.",
    keywords: ["list", "ordered", "number", "ol"],
    icon: ListOrdered,
  },
  {
    id: "todo",
    title: "Checklist",
    description: "Notion-style task list.",
    keywords: ["todo", "task", "check", "checklist"],
    icon: ListTodo,
  },
  {
    id: "quote",
    title: "Quote",
    description: "Highlighted quote block.",
    keywords: ["quote", "blockquote"],
    icon: Quote,
  },
  {
    id: "code",
    title: "Code block",
    description: "Monospace code block.",
    keywords: ["code", "snippet"],
    icon: Code2,
  },
  {
    id: "divider",
    title: "Divider",
    description: "Horizontal divider.",
    keywords: ["divider", "separator", "hr"],
    icon: Minus,
  },
  {
    id: "image",
    title: "Image",
    description: "Insert an image by URL.",
    keywords: ["image", "media"],
    icon: ImagePlus,
  },
  {
    id: "emoji",
    title: "Emoji",
    description: "Insert a quick visual accent.",
    keywords: ["emoji", "sparkles", "icon"],
    icon: Sparkles,
  },
]

const toolbarItems: ToolbarItem[] = [
  {
    label: "H1",
    icon: Heading1,
    isActive: (editor) => editor?.isActive("heading", { level: 1 }) ?? false,
    run: (editor) => editor?.chain().focus().toggleHeading({ level: 1 }).run(),
  },
  {
    label: "H2",
    icon: Heading2,
    isActive: (editor) => editor?.isActive("heading", { level: 2 }) ?? false,
    run: (editor) => editor?.chain().focus().toggleHeading({ level: 2 }).run(),
  },
  {
    label: "H3",
    icon: Heading3,
    isActive: (editor) => editor?.isActive("heading", { level: 3 }) ?? false,
    run: (editor) => editor?.chain().focus().toggleHeading({ level: 3 }).run(),
  },
  {
    label: "Bold",
    icon: Bold,
    isActive: (editor) => editor?.isActive("bold") ?? false,
    run: (editor) => editor?.chain().focus().toggleBold().run(),
  },
  {
    label: "Italic",
    icon: Italic,
    isActive: (editor) => editor?.isActive("italic") ?? false,
    run: (editor) => editor?.chain().focus().toggleItalic().run(),
  },
  {
    label: "Underline",
    icon: Underline,
    isActive: (editor) => editor?.isActive("underline") ?? false,
    run: (editor) => editor?.chain().focus().toggleUnderline().run(),
  },
  {
    label: "Strikethrough",
    icon: Strikethrough,
    isActive: (editor) => editor?.isActive("strike") ?? false,
    run: (editor) => editor?.chain().focus().toggleStrike().run(),
  },
  {
    label: "Highlight",
    icon: Highlighter,
    isActive: (editor) => editor?.isActive("highlight") ?? false,
    run: (editor) => editor?.chain().focus().toggleHighlight().run(),
  },
  {
    label: "Bullet list",
    icon: List,
    isActive: (editor) => editor?.isActive("bulletList") ?? false,
    run: (editor) => editor?.chain().focus().toggleBulletList().run(),
  },
  {
    label: "Ordered list",
    icon: ListOrdered,
    isActive: (editor) => editor?.isActive("orderedList") ?? false,
    run: (editor) => editor?.chain().focus().toggleOrderedList().run(),
  },
  {
    label: "Checklist",
    icon: ListTodo,
    isActive: (editor) => editor?.isActive("taskList") ?? false,
    run: (editor) => editor?.chain().focus().toggleTaskList().run(),
  },
  {
    label: "Quote",
    icon: Quote,
    isActive: (editor) => editor?.isActive("blockquote") ?? false,
    run: (editor) => editor?.chain().focus().toggleBlockquote().run(),
  },
  {
    label: "Code",
    icon: Code2,
    isActive: (editor) => editor?.isActive("codeBlock") ?? false,
    run: (editor) => editor?.chain().focus().toggleCodeBlock().run(),
  },
]

function normalizeUrl(url: string) {
  if (!url) return ""
  if (/^[a-zA-Z][a-zA-Z\d+\-.]*:/.test(url)) return url
  return `https://${url}`
}

function getMenuPosition(editor: TiptapEditorInstance, container: HTMLDivElement | null) {
  if (!container) {
    return { x: 16, y: 16 }
  }

  const coords = editor.view.coordsAtPos(editor.state.selection.from)
  const bounds = container.getBoundingClientRect()

  return {
    x: Math.min(Math.max(16, coords.left - bounds.left), Math.max(16, bounds.width - 304)),
    y: Math.max(16, coords.bottom - bounds.top + 10),
  }
}

function getSlashMatch(editor: TiptapEditorInstance) {
  const { selection } = editor.state
  if (!selection.empty || editor.isActive("codeBlock")) return null

  const { $from } = selection
  if (!$from.parent.isTextblock) return null

  const textBefore = $from.parent.textBetween(0, $from.parentOffset, " ", " ")
  const match = /(^|\s)\/([^\s/]*)$/.exec(textBefore)

  if (!match) return null

  return {
    query: match[2],
    range: {
      from: selection.from - match[2].length - 1,
      to: selection.from,
    },
  }
}

function getMentionMatch(editor: TiptapEditorInstance) {
  const { selection } = editor.state
  if (!selection.empty || editor.isActive("codeBlock")) return null

  const { $from } = selection
  if (!$from.parent.isTextblock) return null

  const textBefore = $from.parent.textBetween(0, $from.parentOffset, " ", " ")
  const match = /(^|\s)@([\w-]*)$/.exec(textBefore)

  if (!match) return null

  return {
    query: match[2],
    range: {
      from: selection.from - match[2].length - 1,
      to: selection.from,
    },
  }
}

function isTextAligned(editor: TiptapEditorInstance | null, alignment: string) {
  if (!editor) return false

  return (
    editor.getAttributes("paragraph").textAlign === alignment ||
    editor.getAttributes("heading").textAlign === alignment
  )
}

function ToolbarButton({
  active = false,
  disabled,
  label,
  onClick,
  icon: Icon,
}: {
  active?: boolean
  disabled?: boolean
  label: string
  onClick: () => void
  icon: ComponentType<{ className?: string }>
}) {
  return (
    <Button
      type="button"
      size="sm"
      variant={active ? "secondary" : "ghost"}
      className="h-9 rounded-xl"
      disabled={disabled}
      aria-label={label}
      onClick={onClick}
    >
      <Icon className="size-4" />
    </Button>
  )
}

export default function TiptapEditor({
  content,
  onChange,
  placeholder = "Write your document here...",
  editable = true,
  autofocus = true,
  className,
}: TiptapEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [linkOpen, setLinkOpen] = useState(false)
  const [linkValue, setLinkValue] = useState("")
  const [commandMenu, setCommandMenu] = useState<MenuState<SlashCommand> | null>(null)
  const [mentionMenu, setMentionMenu] = useState<MenuState<MentionSuggestion> | null>(null)

  const handleChange = useEffectEvent((nextContent: string) => {
    onChange?.(nextContent)
  })

  const closeSuggestionMenus = useEffectEvent(() => {
    setCommandMenu(null)
    setMentionMenu(null)
  })

  const insertImageFromPrompt = useEffectEvent((editor: TiptapEditorInstance | null) => {
    if (!editor) return

    const rawUrl = window.prompt("Image URL")
    if (!rawUrl) return

    editor.chain().focus().setImage({ src: normalizeUrl(rawUrl.trim()) }).run()
  })

  const applyLink = useEffectEvent((editor: TiptapEditorInstance | null) => {
    if (!editor) return

    const normalized = normalizeUrl(linkValue.trim())

    if (!normalized) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
    } else {
      editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run()
    }

    setLinkOpen(false)
  })

  const openLinkPrompt = useEffectEvent((editor: TiptapEditorInstance | null) => {
    if (!editor) return

    const current = editor.getAttributes("link").href ?? ""
    const nextValue = window.prompt("Link URL", current)

    if (nextValue === null) return

    const normalized = normalizeUrl(nextValue.trim())

    if (!normalized) {
      editor.chain().focus().extendMarkRange("link").unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange("link").setLink({ href: normalized }).run()
  })

  const runSlashCommand = useEffectEvent(
    (editor: TiptapEditorInstance | null, commandId: SlashCommand["id"], range: MenuRange) => {
      if (!editor) return

      const chain = editor.chain().focus().deleteRange(range)

      switch (commandId) {
        case "text":
          chain.setParagraph().run()
          break
        case "h1":
          chain.toggleHeading({ level: 1 }).run()
          break
        case "h2":
          chain.toggleHeading({ level: 2 }).run()
          break
        case "h3":
          chain.toggleHeading({ level: 3 }).run()
          break
        case "bullet":
          chain.toggleBulletList().run()
          break
        case "ordered":
          chain.toggleOrderedList().run()
          break
        case "todo":
          chain.toggleTaskList().run()
          break
        case "quote":
          chain.toggleBlockquote().run()
          break
        case "code":
          chain.toggleCodeBlock().run()
          break
        case "divider":
          chain.setHorizontalRule().run()
          break
        case "emoji":
          chain.insertContent("✨ ").run()
          break
        case "image": {
          chain.run()
          insertImageFromPrompt(editor)
          break
        }
      }

      closeSuggestionMenus()
    }
  )

  const applyMention = useEffectEvent(
    (editor: TiptapEditorInstance | null, person: MentionSuggestion, range: MenuRange) => {
      if (!editor) return

      editor
        .chain()
        .focus()
        .insertContentAt(range, [
          {
            type: "mention",
            attrs: {
              id: person.id,
              label: person.label,
            },
          },
          { type: "text", text: " " },
        ])
        .run()

      closeSuggestionMenus()
    }
  )

  const syncSuggestionMenus = useEffectEvent((editor: TiptapEditorInstance) => {
    const slashMatch = getSlashMatch(editor)

    if (slashMatch) {
      const filteredCommands = slashCommands.filter((item) => {
        const haystack = `${item.title} ${item.description} ${item.keywords.join(" ")}`
        return haystack.toLowerCase().includes(slashMatch.query.toLowerCase())
      })

      if (filteredCommands.length > 0) {
        setCommandMenu({
          items: filteredCommands,
          position: getMenuPosition(editor, containerRef.current),
          query: slashMatch.query,
          range: slashMatch.range,
          selectedIndex: 0,
        })
        setMentionMenu(null)
        return
      }
    }

    setCommandMenu(null)

    const mentionMatch = getMentionMatch(editor)

    if (mentionMatch) {
      const filteredPeople = mentionSuggestions.filter((item) => {
        const haystack = `${item.label} ${item.role}`
        return haystack.toLowerCase().includes(mentionMatch.query.toLowerCase())
      })

      if (filteredPeople.length > 0) {
        setMentionMenu({
          items: filteredPeople,
          position: getMenuPosition(editor, containerRef.current),
          query: mentionMatch.query,
          range: mentionMatch.range,
          selectedIndex: 0,
        })
        return
      }
    }

    setMentionMenu(null)
  })

  const handleEditorKeyDown = useEffectEvent((_view: unknown, event: KeyboardEvent) => {
    if (commandMenu) {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setCommandMenu((current) =>
          current
            ? {
                ...current,
                selectedIndex: (current.selectedIndex + 1) % current.items.length,
              }
            : current
        )
        return true
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        setCommandMenu((current) =>
          current
            ? {
                ...current,
                selectedIndex:
                  (current.selectedIndex - 1 + current.items.length) % current.items.length,
              }
            : current
        )
        return true
      }

      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault()
        runSlashCommand(
          editor,
          commandMenu.items[commandMenu.selectedIndex].id,
          commandMenu.range
        )
        return true
      }

      if (event.key === "Escape") {
        event.preventDefault()
        setCommandMenu(null)
        return true
      }
    }

    if (mentionMenu) {
      if (event.key === "ArrowDown") {
        event.preventDefault()
        setMentionMenu((current) =>
          current
            ? {
                ...current,
                selectedIndex: (current.selectedIndex + 1) % current.items.length,
              }
            : current
        )
        return true
      }

      if (event.key === "ArrowUp") {
        event.preventDefault()
        setMentionMenu((current) =>
          current
            ? {
                ...current,
                selectedIndex:
                  (current.selectedIndex - 1 + current.items.length) % current.items.length,
              }
            : current
        )
        return true
      }

      if (event.key === "Enter" || event.key === "Tab") {
        event.preventDefault()
        applyMention(editor, mentionMenu.items[mentionMenu.selectedIndex], mentionMenu.range)
        return true
      }

      if (event.key === "Escape") {
        event.preventDefault()
        setMentionMenu(null)
        return true
      }
    }

    return false
  })

  const editor = useEditor(
    {
      extensions: [
        StarterKit.configure({
          heading: {
            levels: [1, 2, 3],
          },
          link: {
            openOnClick: false,
          },
        }),
        Placeholder.configure({
          placeholder,
        }),
        TextAlign.configure({
          types: ["heading", "paragraph"],
        }),
        Highlight,
        Image.configure({
          allowBase64: true,
          HTMLAttributes: {
            class: "tiptap-editor-image",
          },
        }),
        TaskList,
        TaskItem.configure({
          nested: true,
        }),
        Mention.configure({
          HTMLAttributes: {
            class: "tiptap-mention",
          },
          deleteTriggerWithBackspace: true,
          renderText: ({ node }) => `@${node.attrs.label ?? node.attrs.id}`,
          renderHTML: ({ options, node }) => [
            "span",
            {
              ...options.HTMLAttributes,
              "data-id": node.attrs.id,
              "data-label": node.attrs.label,
            },
            `@${node.attrs.label ?? node.attrs.id}`,
          ],
          suggestion: {
            char: "@",
            items: () => [],
          },
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
        handleKeyDown: (view, event) => handleEditorKeyDown(view, event),
      },
      onCreate: ({ editor }) => {
        syncSuggestionMenus(editor)
      },
      onUpdate: ({ editor }) => {
        handleChange(editor.getHTML())
        syncSuggestionMenus(editor)
      },
      onSelectionUpdate: ({ editor }) => {
        syncSuggestionMenus(editor)
      },
    },
    [editable, autofocus, placeholder]
  )

  useEffect(() => {
    if (!editor) return
    if (editor.getHTML() === content) return
    editor.commands.setContent(content, { emitUpdate: false })
  }, [content, editor])

  useEffect(() => {
    if (!editor) return
    editor.setEditable(editable)
  }, [editable, editor])

  return (
    <div className={cn("relative overflow-hidden rounded-2xl border bg-background", className)}>
      <div className="flex flex-wrap items-center gap-3 border-b bg-muted/40 px-4 py-3">
        <div className="flex flex-wrap items-center gap-1 rounded-xl border bg-background/90 p-1">
          {toolbarItems.map((item) => {
            const Icon = item.icon

            return (
              <ToolbarButton
                key={item.label}
                active={item.isActive(editor)}
                disabled={!editor || !editable}
                label={item.label}
                icon={Icon}
                onClick={() => item.run(editor)}
              />
            )
          })}
        </div>

        <div className="flex flex-wrap items-center gap-1 rounded-xl border bg-background/90 p-1">
          <ToolbarButton
            active={isTextAligned(editor, "left")}
            disabled={!editor || !editable}
            label="Align left"
            icon={AlignLeft}
            onClick={() => editor?.chain().focus().setTextAlign("left").run()}
          />
          <ToolbarButton
            active={isTextAligned(editor, "center")}
            disabled={!editor || !editable}
            label="Align center"
            icon={AlignCenter}
            onClick={() => editor?.chain().focus().setTextAlign("center").run()}
          />
          <ToolbarButton
            active={isTextAligned(editor, "right")}
            disabled={!editor || !editable}
            label="Align right"
            icon={AlignRight}
            onClick={() => editor?.chain().focus().setTextAlign("right").run()}
          />
          <ToolbarButton
            active={isTextAligned(editor, "justify")}
            disabled={!editor || !editable}
            label="Justify"
            icon={AlignJustify}
            onClick={() => editor?.chain().focus().setTextAlign("justify").run()}
          />
        </div>

        <div className="ml-auto flex flex-wrap items-center gap-1 rounded-xl border bg-background/90 p-1">
          <Popover
            open={linkOpen}
            onOpenChange={(nextOpen) => {
              setLinkOpen(nextOpen)
              if (nextOpen) {
                setLinkValue(editor?.getAttributes("link").href ?? "")
              }
            }}
          >
            <PopoverTrigger asChild>
              <Button
                type="button"
                size="sm"
                variant={editor?.isActive("link") ? "secondary" : "ghost"}
                className="h-9 rounded-xl"
                disabled={!editor || !editable}
                aria-label="Manage link"
              >
                <Link2 className="size-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent align="end" className="w-80">
              <PopoverHeader>
                <PopoverTitle>Link</PopoverTitle>
                <PopoverDescription>
                  Add or remove a link from the selected text.
                </PopoverDescription>
              </PopoverHeader>
              <Input
                value={linkValue}
                onChange={(event) => setLinkValue(event.target.value)}
                placeholder="https://example.com"
              />
              <div className="flex items-center justify-end gap-2">
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    editor?.chain().focus().extendMarkRange("link").unsetLink().run()
                    setLinkValue("")
                    setLinkOpen(false)
                  }}
                >
                  Remove
                </Button>
                <Button type="button" size="sm" onClick={() => applyLink(editor)}>
                  Save
                </Button>
              </div>
            </PopoverContent>
          </Popover>

          <ToolbarButton
            disabled={!editor || !editable}
            label="Insert image"
            icon={ImagePlus}
            onClick={() => insertImageFromPrompt(editor)}
          />

          <ToolbarButton
            disabled={!editor || !editable}
            label="Undo"
            icon={Undo2}
            onClick={() => editor?.chain().focus().undo().run()}
          />

          <ToolbarButton
            disabled={!editor || !editable}
            label="Redo"
            icon={Redo2}
            onClick={() => editor?.chain().focus().redo().run()}
          />
        </div>
      </div>

      <div ref={containerRef} className="relative">
        {editor ? (
          <BubbleMenu
            editor={editor}
            shouldShow={({ editor, from, to }) =>
              editable && from !== to && !editor.isActive("image") && !editor.isActive("codeBlock")
            }
            options={{ placement: "top", offset: 8 }}
            className="flex items-center gap-1 rounded-2xl border bg-popover p-1 shadow-lg"
          >
            <ToolbarButton
              active={editor.isActive("bold")}
              label="Bold"
              icon={Bold}
              onClick={() => editor.chain().focus().toggleBold().run()}
            />
            <ToolbarButton
              active={editor.isActive("italic")}
              label="Italic"
              icon={Italic}
              onClick={() => editor.chain().focus().toggleItalic().run()}
            />
            <ToolbarButton
              active={editor.isActive("underline")}
              label="Underline"
              icon={Underline}
              onClick={() => editor.chain().focus().toggleUnderline().run()}
            />
            <ToolbarButton
              active={editor.isActive("strike")}
              label="Strikethrough"
              icon={Strikethrough}
              onClick={() => editor.chain().focus().toggleStrike().run()}
            />
            <ToolbarButton
              active={editor.isActive("highlight")}
              label="Highlight"
              icon={Highlighter}
              onClick={() => editor.chain().focus().toggleHighlight().run()}
            />
            <ToolbarButton
              active={editor.isActive("link")}
              label="Link"
              icon={Link2}
              onClick={() => openLinkPrompt(editor)}
            />
          </BubbleMenu>
        ) : null}

        {editor ? (
          <FloatingMenu
            editor={editor}
            shouldShow={({ state }) => {
              const { selection } = state
              const { $from } = selection
              return editable && selection.empty && $from.parent.isTextblock && !$from.parent.textContent
            }}
            options={{ placement: "left-start", offset: 12 }}
            className="flex items-center gap-1 rounded-2xl border bg-popover p-1 shadow-lg"
          >
            <ToolbarButton
              label="Heading 2"
              icon={Heading2}
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            />
            <ToolbarButton
              label="Bullet list"
              icon={List}
              onClick={() => editor.chain().focus().toggleBulletList().run()}
            />
            <ToolbarButton
              label="Checklist"
              icon={ListTodo}
              onClick={() => editor.chain().focus().toggleTaskList().run()}
            />
            <ToolbarButton
              label="Image"
              icon={ImagePlus}
              onClick={() => insertImageFromPrompt(editor)}
            />
          </FloatingMenu>
        ) : null}

        <EditorContent editor={editor} />

        {commandMenu ? (
          <div
            className="absolute z-40 w-72 overflow-hidden rounded-2xl border bg-popover shadow-lg"
            style={{
              left: commandMenu.position.x,
              top: commandMenu.position.y,
            }}
          >
            <div className="border-b px-4 py-3">
              <p className="text-sm font-medium">Slash commands</p>
              <p className="text-xs text-muted-foreground">
                Choose a block to insert with "/{commandMenu.query}".
              </p>
            </div>
            <div className="max-h-80 overflow-y-auto p-2">
              {commandMenu.items.map((item, index) => {
                const Icon = item.icon

                return (
                  <button
                    key={item.id}
                    type="button"
                    className={cn(
                      "flex w-full items-start gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                      index === commandMenu.selectedIndex
                        ? "bg-muted text-foreground"
                        : "hover:bg-muted/70"
                    )}
                    onMouseEnter={() =>
                      setCommandMenu((current) =>
                        current ? { ...current, selectedIndex: index } : current
                      )
                    }
                    onMouseDown={(event) => {
                      event.preventDefault()
                      runSlashCommand(editor, item.id, commandMenu.range)
                    }}
                  >
                    <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg border bg-background">
                      <Icon className="size-4" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium">{item.title}</p>
                      <p className="text-xs text-muted-foreground">{item.description}</p>
                    </div>
                  </button>
                )
              })}
            </div>
          </div>
        ) : null}

        {mentionMenu ? (
          <div
            className="absolute z-40 w-72 overflow-hidden rounded-2xl border bg-popover shadow-lg"
            style={{
              left: mentionMenu.position.x,
              top: mentionMenu.position.y,
            }}
          >
            <div className="border-b px-4 py-3">
              <p className="text-sm font-medium">Mentions</p>
              <p className="text-xs text-muted-foreground">
                Select a person with "@{mentionMenu.query}".
              </p>
            </div>
            <div className="max-h-72 overflow-y-auto p-2">
              {mentionMenu.items.map((item, index) => (
                <button
                  key={item.id}
                  type="button"
                  className={cn(
                    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors",
                    index === mentionMenu.selectedIndex
                      ? "bg-muted text-foreground"
                      : "hover:bg-muted/70"
                  )}
                  onMouseEnter={() =>
                    setMentionMenu((current) =>
                      current ? { ...current, selectedIndex: index } : current
                    )
                  }
                  onMouseDown={(event) => {
                    event.preventDefault()
                    applyMention(editor, item, mentionMenu.range)
                  }}
                >
                  <div className="flex size-9 shrink-0 items-center justify-center rounded-full bg-muted font-medium text-foreground">
                    {item.label
                      .split(" ")
                      .slice(0, 2)
                      .map((part) => part[0])
                      .join("")}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{item.label}</p>
                    <p className="text-xs text-muted-foreground">{item.role}</p>
                  </div>
                  <AtSign className="ml-auto size-4 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t bg-muted/20 px-4 py-3 text-xs text-muted-foreground">
        <span className="rounded-full border bg-background px-2 py-1">/ slash commands</span>
        <span className="rounded-full border bg-background px-2 py-1">@ mentions</span>
        <span className="rounded-full border bg-background px-2 py-1">
          bubble menu on selection
        </span>
        <span className="rounded-full border bg-background px-2 py-1">
          floating menu on empty line
        </span>
      </div>
    </div>
  )
}
