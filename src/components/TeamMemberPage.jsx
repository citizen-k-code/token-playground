import React from 'react';
import Icon from './Icon.jsx';
import { DetailCard, DetailRow } from './DetailCard.jsx';
import { memberStatusBadge } from '../data/rows.js';

function EditAction() {
  return (
    <button
      className="btn-text"
      style={{
        display:'inline-flex', alignItems:'center', gap:6,
        padding:'4px 8px', borderRadius:'var(--radius-pill)',
        border:0, background:'transparent', cursor:'pointer',
        font:'inherit', fontSize:13, color:'var(--on-surface)',
      }}
    >
      <Icon name="pencil" size={14} stroke={2}/> Aanpassen
    </button>
  );
}

export default function TeamMemberPage({ item, onBack }) {
  const fullName = `${item.firstName} ${item.lastName}`;
  const loginName = (item.firstName[0] + item.lastName.replace(/\s+/g,'')).toLowerCase();

  return (
    <div>
      <div style={{display:'flex', alignItems:'center', gap:'var(--space-2)', marginBottom:'var(--space-6)'}}>
        <button
          className="btn-icon"
          onClick={onBack}
          title="Back"
          style={{width:32, height:32}}
        >
          <Icon name="chevron-left" size={20} stroke={2}/>
        </button>
        <h1 className="page-title" style={{margin:0}}>{fullName}</h1>
      </div>

      <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-4)', marginBottom:'var(--space-4)'}}>
        <DetailCard title="User information" action={<EditAction/>}>
          <DetailRow label="Name">{fullName}</DetailRow>
          <DetailRow label="Email address">
            <a href={`mailto:${item.email}`} style={{color:'var(--primary)'}}>{item.email}</a>
          </DetailRow>
          <DetailRow label="Status">
            <span className={`badge ${memberStatusBadge(item.memberStatus)}`}><span className="bdot"/>{item.memberStatus}</span>
          </DetailRow>
        </DetailCard>

        <DetailCard title="Login information" action={<EditAction/>}>
          <DetailRow label="Login name"><span className="cell-mono">{loginName}</span></DetailRow>
          <DetailRow label="Password"><span className="cell-mono">{'•'.repeat(12)}</span></DetailRow>
        </DetailCard>
      </div>

      <div className="table-card" style={{padding:'var(--space-5)'}}>
        <div style={{
          display:'flex', alignItems:'center', justifyContent:'space-between',
          marginBottom:'var(--space-4)', gap:'var(--space-3)',
        }}>
          <div style={{
            fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
            color:'var(--on-surface-variant)', fontWeight:'var(--font-weight-semibold)',
          }}>Roles</div>
          <button className="btn btn-primary">
            <Icon name="plus" size={16} stroke={2.25}/> Add role
          </button>
        </div>
        <div style={{
          borderTop:'var(--stroke-1) solid var(--outline-variant)',
          padding:'var(--space-6) 0',
          textAlign:'center',
          color:'var(--on-surface-variant)',
          fontSize:13,
        }}>
          No roles added yet
        </div>
      </div>
    </div>
  );
}
