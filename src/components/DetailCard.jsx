import React from 'react';

export function DetailCard({ title, action, children }) {
  return (
    <div className="table-card" style={{flex:'1 1 280px', minWidth:260, padding:'var(--space-5)'}}>
      <div style={{
        display:'flex', alignItems:'center', justifyContent:'space-between',
        marginBottom:'var(--space-4)', gap:'var(--space-3)',
      }}>
        <div style={{
          fontSize:11, letterSpacing:'0.08em', textTransform:'uppercase',
          color:'var(--on-surface-variant)', fontWeight:'var(--font-weight-semibold)',
        }}>{title}</div>
        {action}
      </div>
      <div style={{display:'grid', gap:'var(--space-3)'}}>{children}</div>
    </div>
  );
}

export function DetailRow({ label, children }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:'var(--space-3)', minHeight:28}}>
      <div style={{width:96, flexShrink:0, fontSize:12, color:'var(--on-surface-variant)'}}>{label}</div>
      <div style={{flex:1, minWidth:0}}>{children}</div>
    </div>
  );
}
