import React, { useEffect, useRef } from 'react';
import Icon from './Icon.jsx';

function Section({ title, children }) {
  return (
    <div style={{marginBottom:'var(--space-6)'}}>
      <div style={{
        fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
        color:'var(--on-surface-variant)', fontWeight:'var(--font-weight-semibold)',
        marginBottom:'var(--space-3)',
      }}>{title}</div>
      <div style={{display:'grid', gap:'var(--space-3)'}}>{children}</div>
    </div>
  );
}

function Field({ label, type = 'text', name, autoFocus, required, gridColumn }) {
  return (
    <label style={{display:'flex', flexDirection:'column', gap:6, gridColumn}}>
      <span style={{fontSize:12, color:'var(--on-surface-variant)'}}>{label}{required && ' *'}</span>
      <input
        type={type}
        name={name}
        autoFocus={autoFocus}
        required={required}
        className="field-input"
      />
    </label>
  );
}

export default function MemberEntryModal({ open, onClose, onSubmit }) {
  const cardRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div
      className="member-modal-scrim"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={cardRef}
        className="member-modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="member-modal-title"
        onClick={e => e.stopPropagation()}
      >
        <header className="member-modal-head">
          <h2 id="member-modal-title" className="member-modal-title">Add member</h2>
          <button
            className="btn-icon"
            onClick={onClose}
            title="Close"
            aria-label="Close"
            type="button"
          >
            <Icon name="x" size={18} stroke={2}/>
          </button>
        </header>

        <form onSubmit={handleSubmit} className="member-modal-form">
          <div className="member-modal-body">
            <Section title="Company">
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-3)'}}>
                <Field label="Company name" name="companyName" autoFocus required/>
                <Field label="Company email address" type="email" name="companyEmail" required/>
              </div>
            </Section>

            <Section title="Address">
              <Field label="Street and number" name="street"/>
              <div style={{display:'grid', gridTemplateColumns:'2fr 1fr', gap:'var(--space-3)'}}>
                <Field label="City" name="city"/>
                <Field label="ZIP" name="zip"/>
              </div>
              <Field label="Country" name="country"/>
            </Section>

            <Section title="Contact">
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-3)'}}>
                <Field label="First name" name="firstName" required/>
                <Field label="Last name" name="lastName" required/>
              </div>
              <div style={{display:'grid', gridTemplateColumns:'1fr 1fr', gap:'var(--space-3)'}}>
                <Field label="Email address" type="email" name="email" required/>
                <Field label="Phone number" type="tel" name="phone"/>
              </div>
            </Section>
          </div>

          <footer className="member-modal-foot">
            <button type="button" className="btn btn-outlined" onClick={onClose}>Cancel</button>
            <button type="submit" className="btn btn-primary">
              <Icon name="check" size={16} stroke={2.25}/> Add member
            </button>
          </footer>
        </form>
      </div>
    </div>
  );
}
