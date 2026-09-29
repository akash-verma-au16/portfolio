import Reveal from './Reveal'
import { capabilities } from '../data'
import { spotlight } from '../lib/hooks'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">01 · About</p>
          <h2 className="section-title">
            Full stack, <span className="grad">front end first.</span>
          </h2>
          <p className="section-lede">
            I like owning a feature end to end: sketching the design, building the API and the workers behind it, shipping a
            UI people actually enjoy using, and getting it to production safely. Most of my recent work sits where product
            engineering meets cloud and network security.
          </p>
        </Reveal>

        <div className="cap-grid">
          {capabilities.map((c, i) => (
            <Reveal key={c.title} delay={i * 110}>
              <article className="card spot" onPointerMove={spotlight}>
                <span className="cap-icon" aria-hidden="true">{c.icon}</span>
                <h3>{c.title}</h3>
                <p>{c.blurb}</p>
                <ul className="chips">
                  {c.tags.map((t) => <li key={t}>{t}</li>)}
                </ul>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
