import { useEffect, useMemo, useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'

export type Command = { id: string; label: string; hint: string; run: () => void }

type Props = { open: boolean; onClose: () => void; commands: Command[] }

/** Fuzzy-ish match: every query character appears in order. Returns a score (lower is better) or -1. */
function score(label: string, query: string): number {
  const l = label.toLowerCase()
  const q = query.toLowerCase().trim()
  if (!q) return 0
  const direct = l.indexOf(q)
  if (direct >= 0) return direct
  let pos = -1
  let gaps = 0
  for (const ch of q) {
    const next = l.indexOf(ch, pos + 1)
    if (next < 0) return -1
    gaps += next - pos - 1
    pos = next
  }
  return 100 + gaps
}

export default function CommandPalette({ open, onClose, commands }: Props) {
  const [query, setQuery] = useState('')
  const [cursor, setCursor] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const restoreRef = useRef<HTMLElement | null>(null)

  const results = useMemo(
    () =>
      commands
        .map((c) => ({ c, s: score(c.label, query) }))
        .filter((x) => x.s >= 0)
        .sort((a, b) => a.s - b.s)
        .map((x) => x.c),
    [commands, query],
  )

  useEffect(() => {
    if (!open) return
    restoreRef.current = document.activeElement as HTMLElement
    const id = requestAnimationFrame(() => inputRef.current?.focus())
    document.body.style.overflow = 'hidden'
    return () => {
      cancelAnimationFrame(id)
      document.body.style.overflow = ''
      restoreRef.current?.focus()
    }
  }, [open])

  if (!open) return null

  const choose = (c: Command | undefined) => {
    if (!c) return
    onClose()
    setQuery('')
    setCursor(0)
    c.run()
  }

  const onKey = (e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    else if (e.key === 'ArrowDown') {
      e.preventDefault()
      setCursor((i) => Math.min(results.length - 1, i + 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setCursor((i) => Math.max(0, i - 1))
    } else if (e.key === 'Enter') choose(results[cursor])
  }

  return (
    <div className="palette-backdrop" onMouseDown={onClose}>
      <div className="palette" role="dialog" aria-modal="true" aria-label="Command palette" onMouseDown={(e) => e.stopPropagation()} onKeyDown={onKey}>
        <input
          ref={inputRef}
          value={query}
          onChange={(e) => {
            setQuery(e.target.value)
            setCursor(0)
          }}
          placeholder="Jump to a section, copy my email, switch theme…"
          aria-label="Search commands"
          aria-controls="palette-list"
          aria-activedescendant={results[cursor] ? `cmd-${results[cursor].id}` : undefined}
        />
        <ul id="palette-list" role="listbox">
          {results.map((c, i) => (
            <li
              key={c.id}
              id={`cmd-${c.id}`}
              role="option"
              aria-selected={i === cursor}
              className={i === cursor ? 'on' : ''}
              onMouseEnter={() => setCursor(i)}
              onClick={() => choose(c)}
            >
              <span>{c.label}</span>
              <span className="palette-hint">{c.hint}</span>
            </li>
          ))}
          {results.length === 0 && <li className="palette-empty">No matches</li>}
        </ul>
        <div className="palette-foot">
          <span><kbd>↑</kbd><kbd>↓</kbd> navigate</span>
          <span><kbd>↵</kbd> select</span>
          <span><kbd>esc</kbd> close</span>
        </div>
      </div>
    </div>
  )
}
