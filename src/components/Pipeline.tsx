import { useEffect, useRef, useState } from 'react'
import Reveal from './Reveal'
import { useReducedMotion } from '../lib/hooks'

type Stage = { name: string; icon: string; logs: string[] }

const STAGES: Stage[] = [
  { name: 'Commit', icon: '⎇', logs: ['push to main: feat(rules): bulk attestation', 'triggered workflow ci.yml'] },
  { name: 'Build', icon: '▣', logs: ['npm ci && tsc -b && vite build', 'docker build -t app:3f9c2e1 .'] },
  { name: 'Test', icon: '✓', logs: ['vitest + jest: unit suites passed', 'pytest: passed', 'cypress: e2e passed'] },
  { name: 'Security scan', icon: '⛨', logs: ['snyk test: 0 critical, 0 high', 'sonarqube: quality gate passed'] },
  { name: 'Secrets', icon: '🔑', logs: ['vault: injected 6 secrets at runtime', 'no secrets found in image layers'] },
  { name: 'Deploy', icon: '☸', logs: ['oc apply -f openshift/template.yaml', 'rollout: 3/3 pods ready'] },
]

type Status = 'idle' | 'running' | 'done'

export default function Pipeline() {
  const reduced = useReducedMotion()
  const [step, setStep] = useState(-1)
  const [status, setStatus] = useState<Status>('idle')
  const [log, setLog] = useState<string[]>(['$ waiting for a push…'])
  const logRef = useRef<HTMLDivElement>(null)
  const timers = useRef<number[]>([])

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clear, [])

  useEffect(() => {
    const el = logRef.current
    if (el) el.scrollTop = el.scrollHeight
  }, [log])

  const run = () => {
    clear()
    setStatus('running')
    setStep(0)
    setLog([`$ run #${Math.floor(Math.random() * 900 + 100)} started`])
    const per = reduced ? 150 : 900
    STAGES.forEach((s, i) => {
      timers.current.push(
        window.setTimeout(() => {
          setStep(i)
          setLog((l) => [...l, `▸ ${s.name}`, ...s.logs.map((x) => `  ${x}`)])
        }, i * per),
      )
    })
    timers.current.push(
      window.setTimeout(() => {
        setStep(STAGES.length)
        setStatus('done')
        setLog((l) => [...l, '✔ deployed to production in 4m 12s'])
      }, STAGES.length * per),
    )
  }

  return (
    <section id="pipeline" className="section">
      <div className="container">
        <Reveal>
          <p className="eyebrow">04 · How I ship</p>
          <h2 className="section-title">
            From commit to <span className="grad">pods in production.</span>
          </h2>
          <p className="section-lede">
            GitHub Actions builds and tests every change, scans it, pulls secrets from Vault at runtime, and deploys to
            Kubernetes on OpenShift. Press run to watch a (simulated) release.
          </p>
        </Reveal>

        <Reveal className="pipe card">
          <ol className="pipe-track" style={{ '--p': Math.max(0, Math.min(step, STAGES.length - 1)) / (STAGES.length - 1) } as React.CSSProperties}>
            <span className="pipe-line" aria-hidden="true"><span className={`pipe-fill ${status}`} /></span>
            {STAGES.map((s, i) => {
              const state = step > i || status === 'done' ? 'done' : step === i && status === 'running' ? 'active' : ''
              return (
                <li key={s.name} className={`pipe-stage ${state}`}>
                  <span className="pipe-node" aria-hidden="true">{state === 'done' ? '✓' : s.icon}</span>
                  <span className="pipe-name">{s.name}</span>
                </li>
              )
            })}
          </ol>

          <div className="terminal" ref={logRef} aria-live="polite">
            {log.map((line, i) => (
              <div key={i} className={line.startsWith('✔') ? 'ok' : line.startsWith('▸') ? 'stage' : ''}>
                {line}
              </div>
            ))}
          </div>

          <div className="pipe-actions">
            <span className={`pipe-status ${status}`}>
              {status === 'idle' ? 'Idle' : status === 'running' ? 'Running…' : 'Deployed'}
            </span>
            <button className="btn primary small" onClick={run} disabled={status === 'running'}>
              {status === 'done' ? 'Run again' : 'Run pipeline'} ▶
            </button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
