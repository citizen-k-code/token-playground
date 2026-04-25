import React from 'react';
import Icon from './Icon.jsx';
import ProgressBar from './ProgressBar.jsx';
import { DetailCard, DetailRow } from './DetailCard.jsx';
import {
  statusBadge, priorityBadge, fmtMoney, fmtDate, initials,
} from '../data/rows.js';

export default function DetailPage({ item, onBack }) {
  return (
    <div>
      <button
        className="btn btn-outlined"
        onClick={onBack}
        style={{marginBottom:'var(--space-5)'}}
      >
        <Icon name="chevron-left" size={16} stroke={2}/> Back
      </button>

      <div style={{marginBottom:'var(--space-6)'}}>
        <div style={{fontSize:12, color:'var(--on-surface-variant)', fontFamily:'var(--font-mono)', marginBottom:4}}>{item.id}</div>
        <h1 className="page-title">{item.name}</h1>
        <div className="page-subtitle">Owned by {item.owner.n} · Last updated {fmtDate(item.updated)}</div>
      </div>

      <div style={{display:'flex', flexWrap:'wrap', gap:'var(--space-4)'}}>
        <DetailCard title="Overview">
          <DetailRow label="ID"><span className="cell-mono cell-muted">{item.id}</span></DetailRow>
          <DetailRow label="Project">{item.name}</DetailRow>
          <DetailRow label="Owner">
            <span className="avatar" style={{background:item.owner.c}}>{initials(item.owner.n)}</span>
            {item.owner.n}
          </DetailRow>
          <DetailRow label="Updated">{fmtDate(item.updated)}</DetailRow>
        </DetailCard>

        <DetailCard title="Status">
          <DetailRow label="Status">
            <span className={`badge ${statusBadge(item.status)}`}><span className="bdot"/>{item.status}</span>
          </DetailRow>
          <DetailRow label="Priority">
            <span className={`badge ${priorityBadge(item.priority)}`}>{item.priority}</span>
          </DetailRow>
          <DetailRow label="Region">{item.region}</DetailRow>
          <DetailRow label="Budget"><span className="cell-mono">{fmtMoney(item.budget)}</span></DetailRow>
          <DetailRow label="Progress"><ProgressBar value={item.progress}/></DetailRow>
        </DetailCard>

        <DetailCard title="Contact">
          <DetailRow label="First name">{item.firstName}</DetailRow>
          <DetailRow label="Last name">{item.lastName}</DetailRow>
          <DetailRow label="Email"><a href={`mailto:${item.email}`} style={{color:'var(--primary)'}}>{item.email}</a></DetailRow>
          <DetailRow label="Address">{item.address}</DetailRow>
        </DetailCard>
      </div>
    </div>
  );
}
