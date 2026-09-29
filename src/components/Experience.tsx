import { useRef, useState } from 'react'
import type { KeyboardEvent } from 'react'
import Reveal from './Reveal'
import { experience, profile } from '../data'
import { formatDuration, formatRange, monthsBetween } from '../lib/time'

export default function Experience() {
  const [active, setActive] = useState(0)
  const tabs = useRef<(HTMLButtonElement | null)[]>([])
  const job = experience[active]

  // Arrow-key navigation across the tab list, per the WAI-ARIA tabs pattern.
  const onKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const keys: Record<string, number> = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }
    let next: number | null = null
    if (e.key in keys) next = (active + keys[e.key] + experience.length) % experience.length
    if (e.key === 'Home') next = 0
    if (e.key === 'End') next = experience.length - 1
    if (next === null) return
    e.preventDefault()
    setActive(next)
    tabs.current[next]?.focus()
  }

  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">02 · Experience</p>
          <h2 className="section-title">
            {Math.floor(monthsBetween(profile.careerStart, null) / 12)}+ years across <span className="grad">six teams.</span>
          </h2>
        </Reveal>

        <Reveal className="xp">
          <div className="xp-tabs" role="tablist" aria-label="Companies" aria-orientation="vertical" onKeyDown={onKey}>
            {experience.map((j, i) => (
              <button
                key={j.company}
                ref={(el) => { tabs.current[i] = el }}
                role="tab"
                id={`tab-${i}`}
                aria-selected={i === active}
                aria-controls={`panel-${i}`}
                tabIndex={i === active ? 0 : -1}
                className={i === active ? 'active' : ''}
                onClick={() => setActive(i)}
              >
                <span className="xp-tab-name">{j.short}</span>
                <span className="xp-tab-dur">{formatDuration(j.start, j.end)}</span>
              </button>
            ))}
            <span className="xp-indicator" style={{ '--i': active } as React.CSSProperties} aria-hidden="true" />
          </div>

          <div className="xp-panel card" role="tabpanel" id={`panel-${active}`} aria-labelledby={`tab-${active}`} key={active}>
            <div className="xp-head">
              <div>
                <h3>{job.title}</h3>
                <p className="xp-company">{job.company} · {job.location}</p>
              </div>
              <div className="xp-when">
                <span className="pill">{formatDuration(job.start, job.end)}</span>
                <span className="xp-range">{formatRange(job.start, job.end)}</span>
              </div>
            </div>
            <p className="xp-summary">{job.summary}</p>
            <ul className="xp-points">
              {job.points.map((p, i) => (
                <li key={p} style={{ animationDelay: `${i * 60}ms` }}>{p}</li>
              ))}
            </ul>
            <ul className="chips">
              {job.stack.map((s) => <li key={s}>{s}</li>)}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
