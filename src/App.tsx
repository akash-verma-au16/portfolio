import { about, education, experience, highlights, profile, skills } from './data'

const nav = [
  ['About', '#about'],
  ['Experience', '#experience'],
  ['Skills', '#skills'],
  ['Contact', '#contact'],
]

function App() {
  return (
    <>
      <header className="topbar">
        <a className="brand" href="#top">AV</a>
        <nav>
          {nav.map(([label, href]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>
      </header>

      <main id="top">
        <section className="hero">
          <p className="eyebrow">{profile.location}</p>
          <h1>{profile.name}</h1>
          <h2>{profile.role}</h2>
          <p className="lede">{profile.tagline}</p>
          <div className="actions">
            <a className="btn primary" href={`mailto:${profile.email}`}>Get in touch</a>
            <a className="btn" href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn</a>
            <a className="btn" href={profile.github} target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <ul className="stats">
            {highlights.map((h) => (
              <li key={h.label}>
                <strong>{h.value}</strong>
                <span>{h.label}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="about" className="section">
          <h3>About</h3>
          {about.map((p) => <p key={p}>{p}</p>)}
        </section>

        <section id="experience" className="section">
          <h3>Experience</h3>
          <ol className="timeline">
            {experience.map((job) => (
              <li key={job.company} className="job">
                <div className="job-head">
                  <div>
                    <h4>{job.title}</h4>
                    <p className="company">{job.company}</p>
                  </div>
                  <p className="meta">{job.period}<br />{job.location}</p>
                </div>
                <ul className="points">
                  {job.points.map((p) => <li key={p}>{p}</li>)}
                </ul>
                <ul className="chips">
                  {job.stack.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </li>
            ))}
          </ol>
        </section>

        <section id="skills" className="section">
          <h3>Skills</h3>
          <div className="skill-grid">
            {Object.entries(skills).map(([group, items]) => (
              <div key={group} className="skill-card">
                <h4>{group}</h4>
                <ul className="chips">
                  {items.map((s) => <li key={s}>{s}</li>)}
                </ul>
              </div>
            ))}
          </div>
          <h3 className="sub">Education</h3>
          <ul className="edu">
            {education.map((e) => (
              <li key={e.school}>
                <span><strong>{e.school}</strong> · {e.detail}</span>
                <span className="meta">{e.period}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="contact" className="section contact">
          <h3>Contact</h3>
          <p>I'm always happy to talk about backend systems, security platforms, or a role where I can help.</p>
          <a className="btn primary" href={`mailto:${profile.email}`}>{profile.email}</a>
        </section>
      </main>

      <footer>© {new Date().getFullYear()} {profile.name} · Built with React + TypeScript</footer>
    </>
  )
}

export default App
