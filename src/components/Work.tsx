import type { PointerEvent } from 'react'
import Reveal from './Reveal'
import RuleLifecycleDemo from './RuleLifecycleDemo'
import { projects } from '../data'
import { spotlight, useReducedMotion } from '../lib/hooks'

export default function Work() {
  const reduced = useReducedMotion()

  const tilt = (e: PointerEvent<HTMLElement>) => {
    spotlight(e)
    if (reduced || e.pointerType !== 'mouse') return
    const el = e.currentTarget
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width - 0.5
    const y = (e.clientY - r.top) / r.height - 0.5
    el.style.transform = `perspective(900px) rotateX(${-y * 5}deg) rotateY(${x * 6}deg) translateY(-4px)`
  }
  const untilt = (e: PointerEvent<HTMLElement>) => {
    e.currentTarget.style.transform = ''
  }

  return (
    <section id="work" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">03 · Selected work</p>
          <h2 className="section-title">
            Problems I've <span className="grad">taken off people's plates.</span>
          </h2>
          <p className="section-lede">
            Internal work can't be shown, so here's a small, interactive recreation of the kind of interface I build: bulk
            actions, filtering and state that moves through a lifecycle. Try it.
          </p>
        </Reveal>

        <Reveal>
          <RuleLifecycleDemo />
        </Reveal>

        <div className="work-grid">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 90}>
              <article className="card spot project" onPointerMove={tilt} onPointerLeave={untilt}>
                <p className="project-ctx">{p.context}</p>
                <h3>{p.title}</h3>
                <p className="project-problem">{p.problem}</p>
                <ul className="project-built">
                  {p.built.map((b) => <li key={b}>{b}</li>)}
                </ul>
                <ul className="chips">
                  {p.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
