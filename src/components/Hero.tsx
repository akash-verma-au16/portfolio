import { useEffect, useState } from 'react'
import NetworkCanvas from './NetworkCanvas'
import { profile, rotatingRoles, stats } from '../data'
import type { Stat } from '../data'
import { useCountUp, useInView, useReducedMotion } from '../lib/hooks'
import { monthsBetween } from '../lib/time'

function Typewriter({ words }: { words: string[] }) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)
  const [text, setText] = useState(reduced ? words[0] : '')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word = words[index]
    if (reduced) {
      const id = setTimeout(() => {
        setIndex((i) => (i + 1) % words.length)
        setText(words[(index + 1) % words.length])
      }, 2600)
      return () => clearTimeout(id)
    }
    let delay = deleting ? 28 : 55
    if (!deleting && text === word) delay = 1700
    if (deleting && text === '') delay = 250
    const id = setTimeout(() => {
      if (!deleting && text === word) setDeleting(true)
      else if (deleting && text === '') {
        setDeleting(false)
        setIndex((i) => (i + 1) % words.length)
      } else setText(deleting ? word.slice(0, text.length - 1) : word.slice(0, text.length + 1))
    }, delay)
    return () => clearTimeout(id)
  }, [text, deleting, index, words, reduced])

  return (
    <span className="typewriter" aria-live="polite">
      {text}
      <span className="caret" aria-hidden="true" />
    </span>
  )
}

function StatCard({ stat, start, delay }: { stat: Stat; start: boolean; delay: number }) {
  const n = useCountUp(stat.value ?? 0, start)
  return (
    <li className="stat" style={{ transitionDelay: `${delay}ms` }}>
      <strong>
        {stat.text ?? (
          <>
            {stat.prefix}
            {n}
            {stat.suffix}
          </>
        )}
      </strong>
      <span>{stat.label}</span>
    </li>
  )
}

export default function Hero() {
  const [statsRef, statsSeen] = useInView<HTMLUListElement>(0.3)
  const years = Math.floor(monthsBetween(profile.careerStart, null) / 12)

  return (
    <section className="hero" id="top">
      <NetworkCanvas />
      <div className="hero-glow" aria-hidden="true" />
      <div className="container hero-inner">
        <p className="hero-badge">
          <span className="pulse" aria-hidden="true" />
          {profile.role} · {profile.location}
        </p>
        <h1>
          I build the interfaces people use,
          <br />
          <span className="grad">and the systems behind them.</span>
        </h1>
        <p className="hero-sub">
          {years} years building <Typewriter words={rotatingRoles} />
        </p>
        <p className="hero-lede">
          Currently at RBC, building the React and TypeScript front end of an internal network-security platform, the Python
          services behind it, and the pipelines that ship it.
        </p>
        <div className="actions">
          <a className="btn primary" href="#work">
            See my work <span aria-hidden="true">→</span>
          </a>
          <a className="btn ghost" href={profile.linkedin} target="_blank" rel="noreferrer">
            LinkedIn
          </a>
          <a className="btn ghost" href={profile.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
        </div>

        <ul ref={statsRef} className={`stats ${statsSeen ? 'in' : ''}`}>
          {stats.map((s, i) => (
            <StatCard key={s.label} stat={s} start={statsSeen} delay={i * 90} />
          ))}
        </ul>
      </div>
      <a className="scroll-cue" href="#about" aria-label="Scroll to about">
        <span />
      </a>
    </section>
  )
}
