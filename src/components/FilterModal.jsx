import React, { useEffect, useState } from 'react';
import Icon from './Icon.jsx';
import { OWNERS, STATUSES, PRIORITIES, REGIONS } from '../data/rows.js';

function ChipToggle({ active, onClick, children }) {
  return (
    <button
      type="button"
      className={`chip ${active ? 'on' : ''}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

function Section({ title, children }) {
  return (
    <div style={{marginBottom:'var(--space-6)'}}>
      <div style={{
        fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
        color:'var(--on-surface-variant)', fontWeight:'var(--font-weight-semibold)',
        marginBottom:'var(--space-3)',
      }}>{title}</div>
      <div style={{display:'flex', flexWrap:'wrap', gap:8}}>{children}</div>
    </div>
  );
}

export default function FilterModal({ open, initial, onClose, onApply, onClear }) {
  const [draft, setDraft] = useState(initial);

  useEffect(() => { if (open) setDraft(initial); }, [open, initial]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const toggle = (key, value) => {
    setDraft(d => {
      const arr = d[key];
      return { ...d, [key]: arr.includes(value) ? arr.filter(v => v !== value) : [...arr, value] };
    });
  };
  const setField = (key, value) => setDraft(d => ({ ...d, [key]: value }));
  const count = draft.statuses.length + draft.priorities.length + draft.regions.length + draft.owners.length
    + (draft.budgetMin !== '' || draft.budgetMax !== '' ? 1 : 0)
    + (draft.progressMin !== '' || draft.progressMax !== '' ? 1 : 0);

  return (
    <div className="filter-modal-scrim" onClick={onClose} role="presentation">
      <div
        className="filter-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="filter-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <header className="filter-modal-head">
          <h2 id="filter-modal-title" className="filter-modal-title">Filters {count > 0 && <span className="chip-count" style={{marginLeft:8}}>{count}</span>}</h2>
          <button className="btn-icon" onClick={onClose} title="Close" aria-label="Close" type="button">
            <Icon name="x" size={18} stroke={2}/>
          </button>
        </header>

        <div className="filter-modal-body">
          <Section title="Status">
            {STATUSES.map(s => (
              <ChipToggle key={s} active={draft.statuses.includes(s)} onClick={() => toggle('statuses', s)}>{s}</ChipToggle>
            ))}
          </Section>
          <Section title="Priority">
            {PRIORITIES.map(p => (
              <ChipToggle key={p} active={draft.priorities.includes(p)} onClick={() => toggle('priorities', p)}>{p}</ChipToggle>
            ))}
          </Section>
          <Section title="Region">
            {REGIONS.map(r => (
              <ChipToggle key={r} active={draft.regions.includes(r)} onClick={() => toggle('regions', r)}>{r}</ChipToggle>
            ))}
          </Section>
          <Section title="Owner">
            {OWNERS.map(o => (
              <ChipToggle key={o.n} active={draft.owners.includes(o.n)} onClick={() => toggle('owners', o.n)}>
                <span className="avatar" style={{background:o.c, width:18, height:18, fontSize:10, marginRight:6}}>
                  {o.n.split(' ').map(w=>w[0]).slice(0,2).join('')}
                </span>
                {o.n}
              </ChipToggle>
            ))}
          </Section>

          <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-4)'}}>
            <div>
              <div style={{
                fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
                color:'var(--on-surface-variant)', fontWeight:'var(--font-weight-semibold)',
                marginBottom:'var(--space-3)',
              }}>Budget</div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <input
                  type="number" inputMode="numeric" placeholder="Min"
                  className="field-input"
                  value={draft.budgetMin}
                  onChange={e => setField('budgetMin', e.target.value)}
                />
                <span style={{color:'var(--on-surface-variant)'}}>–</span>
                <input
                  type="number" inputMode="numeric" placeholder="Max"
                  className="field-input"
                  value={draft.budgetMax}
                  onChange={e => setField('budgetMax', e.target.value)}
                />
              </div>
            </div>
            <div>
              <div style={{
                fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
                color:'var(--on-surface-variant)', fontWeight:'var(--font-weight-semibold)',
                marginBottom:'var(--space-3)',
              }}>Progress (%)</div>
              <div style={{display:'flex', gap:8, alignItems:'center'}}>
                <input
                  type="number" inputMode="numeric" placeholder="Min" min={0} max={100}
                  className="field-input"
                  value={draft.progressMin}
                  onChange={e => setField('progressMin', e.target.value)}
                />
                <span style={{color:'var(--on-surface-variant)'}}>–</span>
                <input
                  type="number" inputMode="numeric" placeholder="Max" min={0} max={100}
                  className="field-input"
                  value={draft.progressMax}
                  onChange={e => setField('progressMax', e.target.value)}
                />
              </div>
            </div>
          </div>
        </div>

        <footer className="filter-modal-foot">
          <button type="button" className="btn btn-text" onClick={onClear}>
            <Icon name="refresh" size={14} stroke={2}/> Clear all
          </button>
          <div className="ml-auto flex gap-2">
            <button type="button" className="btn btn-outlined" onClick={onClose}>Cancel</button>
            <button type="button" className="btn btn-primary" onClick={() => onApply(draft)}>Apply</button>
          </div>
        </footer>
      </div>
    </div>
  );
}
