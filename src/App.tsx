import { useCallback, useEffect, useMemo, useState } from 'react'
import Nav from './components/Nav'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Work from './components/Work'
import Pipeline from './components/Pipeline'
import Skills from './components/Skills'
import Contact from './components/Contact'
import CommandPalette from './components/CommandPalette'
import type { Command } from './components/CommandPalette'
import { profile, sections } from './data'
import { useTheme } from './lib/hooks'

const YEAR = new Date().getFullYear()

function App() {
  const [theme, toggleTheme] = useTheme()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [toast, setToast] = useState<string | null>(null)

  const notify = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2200)
  }, [])

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      notify('Email copied to clipboard')
    } catch {
      notify(profile.email)
    }
  }, [notify])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setPaletteOpen((o) => !o)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const commands = useMemo<Command[]>(
    () => [
      ...sections.map((s) => ({
        id: `go-${s.id}`,
        label: `Go to ${s.label}`,
        hint: 'Section',
        run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: 'smooth' }),
      })),
      { id: 'top', label: 'Back to top', hint: 'Section', run: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
      { id: 'copy', label: 'Copy email address', hint: 'Action', run: copyEmail },
      { id: 'theme', label: `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`, hint: 'Action', run: toggleTheme },
      { id: 'demo-pipeline', label: 'Run the CI/CD pipeline demo', hint: 'Demo', run: () => document.getElementById('pipeline')?.scrollIntoView({ behavior: 'smooth' }) },
      { id: 'linkedin', label: 'Open LinkedIn', hint: 'Link', run: () => window.open(profile.linkedin, '_blank', 'noopener') },
      { id: 'github', label: 'Open GitHub', hint: 'Link', run: () => window.open(profile.github, '_blank', 'noopener') },
    ],
    [copyEmail, theme, toggleTheme],
  )

  return (
    <>
      <a className="skip" href="#about">Skip to content</a>
      <Nav theme={theme} onToggleTheme={toggleTheme} onOpenPalette={() => setPaletteOpen(true)} />
      <main>
        <Hero />
        <About />
        <Experience />
        <Work />
        <Pipeline />
        <Skills />
        <Contact onCopyEmail={copyEmail} />
      </main>
      <footer className="footer">
        <span>© {YEAR} {profile.name}</span>
        <span>Hand-built with React + TypeScript · no UI libraries</span>
      </footer>
      <CommandPalette open={paletteOpen} onClose={() => setPaletteOpen(false)} commands={commands} />
      <div className={`toast ${toast ? 'show' : ''}`} role="status" aria-live="polite">{toast}</div>
    </>
  )
}

export default App
