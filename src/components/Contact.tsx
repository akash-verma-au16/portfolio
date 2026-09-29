import Reveal from './Reveal'
import { profile } from '../data'

export default function Contact({ onCopyEmail }: { onCopyEmail: () => void }) {
  return (
    <section id="contact" className="section contact">
      <div className="container">
        <Reveal className="contact-card card">
          <p className="eyebrow">06 · Contact</p>
          <h2 className="section-title">
            Let's build <span className="grad">something good.</span>
          </h2>
          <p className="section-lede">
            Happy to talk about front-end architecture, backend systems, security platforms, or a team where I could help.
          </p>
          <div className="actions center">
            <a className="btn primary big" href={`mailto:${profile.email}`}>
              {profile.email}
            </a>
            <button className="btn ghost big" onClick={onCopyEmail}>Copy email</button>
          </div>
          <div className="socials">
            <a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a>
            <a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
