import { useMemo, useState } from 'react'

const STAGES = ['Requested', 'Provisioned', 'Attested', 'Decommissioned'] as const
type Stage = (typeof STAGES)[number]

type Rule = { id: string; source: string; dest: string; port: string; stage: Stage }

const SEED: Rule[] = [
  { id: 'FW-1042', source: '10.12.4.0/24', dest: '10.80.2.15', port: '443/tcp', stage: 'Requested' },
  { id: 'FW-1043', source: '10.12.9.31', dest: '10.44.0.0/16', port: '5432/tcp', stage: 'Provisioned' },
  { id: 'FW-1044', source: '10.30.1.8', dest: '10.80.2.16', port: '6379/tcp', stage: 'Attested' },
  { id: 'FW-1045', source: '10.12.4.77', dest: '10.91.3.2', port: '22/tcp', stage: 'Requested' },
  { id: 'FW-1046', source: '10.55.0.0/20', dest: '10.80.2.15', port: '8443/tcp', stage: 'Provisioned' },
]

/**
 * A toy model of the kind of UI I build at work: select rules, advance them through the
 * lifecycle in bulk, filter by stage. All data is made up; nothing here is RBC code.
 */
export default function RuleLifecycleDemo() {
  const [rules, setRules] = useState(SEED)
  const [selected, setSelected] = useState<Set<string>>(new Set())
  const [filter, setFilter] = useState<Stage | 'All'>('All')
  const [flash, setFlash] = useState<Set<string>>(new Set())

  const shown = useMemo(() => (filter === 'All' ? rules : rules.filter((r) => r.stage === filter)), [rules, filter])
  const counts = useMemo(
    () => Object.fromEntries(STAGES.map((s) => [s, rules.filter((r) => r.stage === s).length])) as Record<Stage, number>,
    [rules],
  )
  const allShownSelected = shown.length > 0 && shown.every((r) => selected.has(r.id))

  const toggle = (id: string) =>
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })

  const toggleAll = () =>
    setSelected(allShownSelected ? new Set() : new Set(shown.map((r) => r.id)))

  const advance = () => {
    const moved = new Set<string>()
    setRules((prev) =>
      prev.map((r) => {
        const i = STAGES.indexOf(r.stage)
        if (!selected.has(r.id) || i === STAGES.length - 1) return r
        moved.add(r.id)
        return { ...r, stage: STAGES[i + 1] }
      }),
    )
    setFlash(moved)
    setSelected(new Set())
    window.setTimeout(() => setFlash(new Set()), 700)
  }

  const reset = () => {
    setRules(SEED)
    setSelected(new Set())
    setFilter('All')
  }

  return (
    <div className="demo card">
      <div className="demo-bar">
        <span className="dots" aria-hidden="true"><i /><i /><i /></span>
        <span className="demo-title">rule-lifecycle.tsx · live demo</span>
      </div>

      <div className="demo-flow" aria-label="Lifecycle stages">
        {STAGES.map((s, i) => (
          <button
            key={s}
            className={`flow-step ${filter === s ? 'on' : ''}`}
            onClick={() => setFilter(filter === s ? 'All' : s)}
            aria-pressed={filter === s}
          >
            <span className="flow-count">{counts[s]}</span>
            <span className="flow-label">{s}</span>
            {i < STAGES.length - 1 && <span className="flow-arrow" aria-hidden="true">→</span>}
          </button>
        ))}
      </div>

      <div className="demo-table" role="table" aria-label="Firewall rules">
        <div className="demo-row head" role="row">
          <span role="columnheader">
            <input type="checkbox" checked={allShownSelected} onChange={toggleAll} aria-label="Select all visible rules" />
          </span>
          <span role="columnheader">Rule</span>
          <span role="columnheader" className="hide-sm">Source</span>
          <span role="columnheader" className="hide-sm">Destination</span>
          <span role="columnheader">Port</span>
          <span role="columnheader">Stage</span>
        </div>
        {shown.map((r) => (
          <label key={r.id} className={`demo-row ${selected.has(r.id) ? 'sel' : ''} ${flash.has(r.id) ? 'flash' : ''}`} role="row">
            <span role="cell">
              <input type="checkbox" checked={selected.has(r.id)} onChange={() => toggle(r.id)} aria-label={`Select ${r.id}`} />
            </span>
            <span role="cell" className="mono">{r.id}</span>
            <span role="cell" className="mono hide-sm">{r.source}</span>
            <span role="cell" className="mono hide-sm">{r.dest}</span>
            <span role="cell" className="mono">{r.port}</span>
            <span role="cell"><span className={`badge s-${STAGES.indexOf(r.stage)}`}>{r.stage}</span></span>
          </label>
        ))}
        {shown.length === 0 && <p className="demo-empty">No rules in this stage.</p>}
      </div>

      <div className="demo-actions">
        <span className="demo-hint">{selected.size ? `${selected.size} selected` : 'Select rules, then advance them'}</span>
        <button className="btn small ghost" onClick={reset}>Reset</button>
        <button className="btn small primary" onClick={advance} disabled={selected.size === 0}>
          Advance stage →
        </button>
      </div>
    </div>
  )
}
