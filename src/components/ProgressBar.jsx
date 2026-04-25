import React from 'react';

export default function ProgressBar({ value }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, minWidth:140}}>
      <div style={{flex:1, height:6, background:'var(--surface-container-high)', borderRadius:'var(--radius-pill)', overflow:'hidden'}}>
        <div style={{width:`${value}%`, height:'100%', background:'var(--primary)', borderRadius:'inherit', transition:'width 200ms ease'}}/>
      </div>
      <span className="cell-mono" style={{width:32, textAlign:'right'}}>{value}%</span>
    </div>
  );
}
