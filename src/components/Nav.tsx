import { useState } from 'react'
import { sections } from '../data'
import { useScrollProgress, useScrollSpy } from '../lib/hooks'
import type { Theme } from '../lib/hooks'

const ids = sections.map((s) => s.id)

type Props = { theme: Theme; onToggleTheme: () => void; onOpenPalette: () => void }

export default function Nav({ theme, onToggleTheme, onOpenPalette }: Props) {
  const active = useScrollSpy(ids)
  const progress = useScrollProgress()
  const [open, setOpen] = useState(false)
  const isMac = navigator.platform.toLowerCase().includes('mac')

  return (
    <header className="topbar">
      <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      <div className="topbar-inner">
        <a className="brand" href="#top" aria-label="Back to top">
          <span className="brand-mark">AV</span>
          <span className="brand-name">Akash Verma</span>
        </a>

        <nav className={`links ${open ? 'open' : ''}`} aria-label="Sections">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={active === s.id ? 'active' : ''}
              aria-current={active === s.id ? 'true' : undefined}
              onClick={() => setOpen(false)}
            >
              {s.label}
            </a>
          ))}
        </nav>

        <div className="tools">
          <button className="kbd-btn" onClick={onOpenPalette} aria-label="Open command palette">
            <span className="kbd-hint">Search</span>
            <kbd>{isMac ? '⌘' : 'Ctrl'}</kbd>
            <kbd>K</kbd>
          </button>
          <button className="icon-btn" onClick={onToggleTheme} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>
            {theme === 'dark' ? (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4.5" fill="currentColor" /><g stroke="currentColor" strokeWidth="2" strokeLinecap="round">{[0, 45, 90, 135, 180, 225, 270, 315].map((a) => <line key={a} x1="12" y1="2.5" x2="12" y2="4.5" transform={`rotate(${a} 12 12)`} />)}</g></svg>
            ) : (
              <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z" fill="currentColor" /></svg>
            )}
          </button>
          <button className="icon-btn menu-btn" onClick={() => setOpen((o) => !o)} aria-label="Toggle menu" aria-expanded={open}>
            <span className={`burger ${open ? 'x' : ''}`} />
          </button>
        </div>
      </div>
    </header>
  )
}
