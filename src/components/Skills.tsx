import { useState } from 'react'
import Reveal from './Reveal'
import { certifications, education, skills } from '../data'

const groups = ['All', ...Object.keys(skills)]

export default function Skills() {
  const [group, setGroup] = useState('All')
  const items = group === 'All'
    ? Object.entries(skills).flatMap(([g, list]) => list.map((s) => ({ s, g })))
    : skills[group].map((s) => ({ s, g: group }))

  return (
    <section id="skills" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">05 · Toolkit</p>
          <h2 className="section-title">
            The stack, <span className="grad">end to end.</span>
          </h2>
        </Reveal>

        <Reveal>
          <div className="filters" role="group" aria-label="Filter skills">
            {groups.map((g) => (
              <button key={g} className={g === group ? 'on' : ''} aria-pressed={g === group} onClick={() => setGroup(g)}>
                {g}
                <span>{g === 'All' ? Object.values(skills).flat().length : skills[g].length}</span>
              </button>
            ))}
          </div>

          <ul className="skill-cloud" key={group}>
            {items.map(({ s, g }, i) => (
              <li key={`${g}-${s}`} className={`g-${Object.keys(skills).indexOf(g)}`} style={{ animationDelay: `${i * 18}ms` }}>
                {s}
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal className="certs">
          <h3 className="sub-title">Certifications</h3>
          <div className="cert-grid">
            {certifications.map((c) => (
              <div key={c.issuer} className="cert card">
                <p className="edu-period">{c.date}</p>
                <h4>{c.issuer}</h4>
                <ul>
                  {c.items.map((i) => <li key={i}>{i}</li>)}
                </ul>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="edu">
          {education.map((e) => (
            <div key={e.school} className="edu-item card">
              <p className="edu-period">{e.period}</p>
              <h3>{e.detail}</h3>
              <p className="edu-school">{e.school}</p>
            </div>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
