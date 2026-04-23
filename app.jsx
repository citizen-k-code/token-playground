const { useState, useMemo, useEffect, useRef, useCallback } = React;

/* ===========================================================
   Icons (inline, stroke-based, neutral)
=========================================================== */
const Icon = ({ name, size = 18, stroke = 1.75 }) => {
  const s = { width: size, height: size, fill: 'none', stroke: 'currentColor', strokeWidth: stroke, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    search: <><circle cx="11" cy="11" r="7"/><path d="m20 20-3.5-3.5"/></>,
    dashboard: <><rect x="3" y="3" width="7" height="9" rx="2"/><rect x="14" y="3" width="7" height="5" rx="2"/><rect x="14" y="12" width="7" height="9" rx="2"/><rect x="3" y="16" width="7" height="5" rx="2"/></>,
    inbox: <><path d="M3 12h5l2 3h4l2-3h5"/><path d="M5 5h14l2 7v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-7z"/></>,
    users: <><circle cx="9" cy="8" r="4"/><path d="M2 21c0-3.9 3.1-7 7-7s7 3.1 7 7"/><path d="M16 11a3 3 0 1 0 0-6"/><path d="M22 21c0-3-2-5.5-5-6.5"/></>,
    chart: <><path d="M3 3v18h18"/><path d="M7 15l4-4 3 3 6-7"/></>,
    settings: <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h0a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h0a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v0a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></>,
    file: <><path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5"/></>,
    folder: <><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></>,
    tag: <><path d="M20.6 13.4 12 22l-9-9V3h10l9 9a1.4 1.4 0 0 1 0 2z"/><circle cx="7" cy="7" r="1.5"/></>,
    plus: <><path d="M12 5v14M5 12h14"/></>,
    filter: <><path d="M3 4h18l-7 9v6l-4 2v-8z"/></>,
    x: <><path d="M6 6l12 12M18 6 6 18"/></>,
    caret: <><path d="m6 9 6 6 6-6"/></>,
    up: <><path d="m6 15 6-6 6 6"/></>,
    down: <><path d="m6 9 6 6 6-6"/></>,
    more: <><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></>,
    bell: <><path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 0 0 4 0"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    sliders: <><path d="M4 6h9"/><path d="M17 6h3"/><circle cx="15" cy="6" r="2"/><path d="M4 12h3"/><path d="M11 12h9"/><circle cx="9" cy="12" r="2"/><path d="M4 18h13"/><path d="M21 18h-1"/><circle cx="19" cy="18" r="2"/></>,
    check: <><path d="m5 12 5 5L20 7"/></>,
    lightning: <><path d="M13 2 4 14h7l-1 8 9-12h-7z"/></>,
    grid: <><rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/></>,
    'chevron-left': <><path d="m15 6-6 6 6 6"/></>,
    'chevron-right': <><path d="m9 6 6 6-6 6"/></>,
    refresh: <><path d="M3 12a9 9 0 0 1 15-6.7L21 8"/><path d="M21 3v5h-5"/><path d="M21 12a9 9 0 0 1-15 6.7L3 16"/><path d="M3 21v-5h5"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    palette: <><path d="M12 3a9 9 0 1 0 0 18c1.1 0 2-.9 2-2v-1a2 2 0 0 1 2-2h2a3 3 0 0 0 3-3 9 9 0 0 0-9-9z"/><circle cx="7.5" cy="10.5" r="1"/><circle cx="12" cy="7.5" r="1"/><circle cx="16.5" cy="10.5" r="1"/></>,
    keyboard: <><rect x="2" y="6" width="20" height="12" rx="2"/><path d="M6 10h.01M10 10h.01M14 10h.01M18 10h.01M7 14h10"/></>,
    logout: <><path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/><path d="M10 17l5-5-5-5"/><path d="M15 12H3"/></>,
  };
  return <svg viewBox="0 0 24 24" style={s}>{paths[name] || null}</svg>;
};

/* ===========================================================
   Data
=========================================================== */
const OWNERS = [
  { n: 'Mara Velez', c: '#2e5aac' }, { n: 'Omar Khatri', c: '#0e7a4d' },
  { n: 'Priya Shah', c: '#8a5a00' }, { n: 'Ines Dubois', c: '#a6343e' },
  { n: 'Theo Lund', c: '#5e35b1' }, { n: 'Sana Koh', c: '#00796b' },
  { n: 'Jules Rhee', c: '#c0392b' }, { n: 'Bea Okafor', c: '#455a64' },
];
const STATUSES = ['Active','Paused','Draft','Archived','Review'];
const PRIORITIES = ['Low','Medium','High','Urgent'];
const REGIONS = ['EMEA','AMER','APAC','LATAM'];

const rand = (s => () => (s = (s * 9301 + 49297) % 233280) / 233280)(42);
const pick = a => a[Math.floor(rand() * a.length)];
const NAMES = ['Horizon','Meridian','Atlas','Ember','Drift','Pivot','Cascade','Orbit','Vector','Bloom','Pulse','Nova','Arcadia','Helix','Summit','Tessera','Juniper','Echo','Monolith','Vanta','Argent','Crux','Plume','Ridge'];
const SUFFIX = ['Migration','Rollout','Refactor','Launch','Audit','Review','Sync','Campaign','Pipeline','Rebuild','Expansion'];
const FIRST_NAMES = ['Anna','Lukas','Sofia','Mateo','Emma','Noah','Lea','Finn','Mila','Jonas','Nora','Elias','Freya','Hugo','Iris','Otto','Lena','Axel','Maya','Tomas','Sara','Henrik','Ida','Viktor','Alma','Bram','Eva','Ruben'];
const LAST_NAMES = ['Jansen','Peeters','Van Damme','De Smet','Mertens','Claes','Dubois','Lambert','Willems','Maes','Janssens','Declercq','Hermans','Vermeulen','Desmet','Cools','Goossens','Michiels','Pauwels','Nys'];
const STREETS = ['Grote Markt','Keizerstraat','Nationalestraat','Meir','Lange Nieuwstraat','Groenplaats','Kammenstraat','Schoenmarkt','Hoogstraat','Sint-Jansplein'];
const CITIES = [
  { city: 'Antwerpen', zip: '2000' }, { city: 'Brussel', zip: '1000' },
  { city: 'Gent', zip: '9000' }, { city: 'Leuven', zip: '3000' },
  { city: 'Brugge', zip: '8000' }, { city: 'Mechelen', zip: '2800' },
  { city: 'Hasselt', zip: '3500' }, { city: 'Namur', zip: '5000' },
];
const ROWS = Array.from({ length: 42 }, (_, i) => {
  const owner = pick(OWNERS);
  const firstName = pick(FIRST_NAMES);
  const lastName = pick(LAST_NAMES);
  const loc = pick(CITIES);
  const street = pick(STREETS);
  const nr = Math.floor(rand() * 180) + 1;
  return {
    id: `TKN-${1024 + i}`,
    name: `${pick(NAMES)} ${pick(SUFFIX)}`,
    owner,
    status: pick(STATUSES),
    priority: pick(PRIORITIES),
    region: pick(REGIONS),
    budget: Math.round(rand() * 900 + 40) * 1000,
    progress: Math.round(rand() * 100),
    updated: new Date(2026, 2, Math.floor(rand() * 60) + 1),
    firstName,
    lastName,
    email: `${firstName}.${lastName}`.toLowerCase().replace(/\s+/g,'') + '@example.com',
    address: `${street} ${nr}, ${loc.zip} ${loc.city}`,
  };
});

const statusBadge = (s) => {
  const map = { Active:'success', Paused:'warning', Draft:'neutral', Archived:'neutral', Review:'info' };
  return map[s] || 'neutral';
};
const priorityBadge = (p) => {
  const map = { Low:'neutral', Medium:'info', High:'warning', Urgent:'destructive' };
  return map[p];
};
const fmtMoney = n => '$' + n.toLocaleString();
const fmtDate = d => d.toLocaleDateString('en', { month: 'short', day: 'numeric' });
const initials = n => n.split(' ').map(w=>w[0]).slice(0,2).join('');

/* ===========================================================
   Tweaks
=========================================================== */
const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "primary": "#1a3a8f",
  "primaryForeground": "#ffffff",
  "primaryContainer": "#dfe6ff",
  "secondary": "#eeece7",
  "secondaryForeground": "#1b1b1f",
  "accent": "#b84a7a",
  "accentForeground": "#ffffff",
  "accentContainer": "#ffd9e6",
  "destructive": "#a6343e",
  "destructiveForeground": "#ffffff",
  "surface": "#fbfaf8",
  "surfaceDim": "#f3f1ed",
  "outlineVariant": "#e4e2dd",
  "onSurface": "#1b1b1f",
  "radiusSm": 10,
  "radiusMd": 14,
  "radiusLg": 20,
  "radiusPill": 999,
  "stroke1": 1,
  "rowHeight": 52,
  "fontSize": 14,
  "fontFamily": "'Roboto Flex', 'Inter', system-ui, sans-serif",
  "navWidth": 272
}/*EDITMODE-END*/;

const TWEAK_SPEC = [
  { section: 'Color', items: [
    { key: 'primary', label: 'Primary', type: 'color', cssVar: '--primary', derive: (v) => ({ '--primary-hover': shade(v, -12) }) },
    { key: 'primaryForeground', label: 'Primary foreground', type: 'color', cssVar: '--primary-foreground' },
    { key: 'primaryContainer', label: 'Primary container', type: 'color', cssVar: '--primary-container' },
    { key: 'secondary', label: 'Secondary', type: 'color', cssVar: '--secondary' },
    { key: 'secondaryForeground', label: 'Secondary foreground', type: 'color', cssVar: '--secondary-foreground' },
    { key: 'accent', label: 'Accent', type: 'color', cssVar: '--accent', derive: (v) => ({ '--on-accent-container': shade(v, -45) }) },
    { key: 'accentForeground', label: 'Accent foreground', type: 'color', cssVar: '--accent-foreground' },
    { key: 'accentContainer', label: 'Accent container', type: 'color', cssVar: '--accent-container' },
    { key: 'destructive', label: 'Destructive', type: 'color', cssVar: '--destructive' },
    { key: 'destructiveForeground', label: 'Destructive foreground', type: 'color', cssVar: '--destructive-foreground' },
    { key: 'surface', label: 'Surface', type: 'color', cssVar: '--surface' },
    { key: 'surfaceDim', label: 'Surface dim', type: 'color', cssVar: '--surface-dim' },
    { key: 'outlineVariant', label: 'Outline', type: 'color', cssVar: '--outline-variant' },
    { key: 'onSurface', label: 'Text', type: 'color', cssVar: '--on-surface' },
  ]},
  { section: 'Shape', items: [
    { key: 'radiusSm', label: 'Radius sm', type: 'range', min: 0, max: 24, cssVar: '--radius-sm', unit: 'px' },
    { key: 'radiusMd', label: 'Radius md', type: 'range', min: 0, max: 32, cssVar: '--radius-md', unit: 'px' },
    { key: 'radiusLg', label: 'Radius lg', type: 'range', min: 0, max: 40, cssVar: '--radius-lg', unit: 'px' },
    { key: 'radiusPill', label: 'Pill radius', type: 'range', min: 0, max: 999, cssVar: '--radius-pill', unit: 'px' },
    { key: 'stroke1', label: 'Stroke', type: 'range', min: 0, max: 3, step: 0.5, cssVar: '--stroke-1', unit: 'px' },
  ]},
  { section: 'Density', items: [
    { key: 'rowHeight', label: 'Row height', type: 'range', min: 36, max: 80, cssVar: '--row-height', unit: 'px' },
    { key: 'navWidth', label: 'Nav width', type: 'range', min: 200, max: 360, cssVar: '--nav-width', unit: 'px' },
  ]},
  { section: 'Type', items: [
    { key: 'fontSize', label: 'Base size', type: 'range', min: 12, max: 18, cssVar: '--font-size-base', unit: 'px' },
    { key: 'fontFamily', label: 'Family', type: 'select', options: [
      "'Roboto Flex', 'Inter', system-ui, sans-serif",
      "'Inter', system-ui, sans-serif",
      "'Open Sans', system-ui, sans-serif",
      "'Helvetica Neue', Helvetica, Arial, sans-serif",
      "ui-sans-serif, system-ui, sans-serif",
      "Georgia, 'Times New Roman', serif",
    ], labels: ['Roboto Flex','Inter','Open Sans','Helvetica','System','Georgia'], cssVar: '--font-sans' },
  ]},
];

// Swatch palettes (from styleguide)
const SWATCHES = {
  neutral: [
    { label:'50',  hex:'#FBF9F8' }, { label:'100', hex:'#F2F0F0' }, { label:'200', hex:'#E4E2E2' },
    { label:'300', hex:'#C8C6C6' }, { label:'400', hex:'#ACABAB' }, { label:'500', hex:'#919090' },
    { label:'600', hex:'#777777' }, { label:'700', hex:'#5E5E5E' }, { label:'800', hex:'#474747' },
    { label:'900', hex:'#303030' }, { label:'950', hex:'#1B1C1C' },
  ],
  red: [
    { label:'50',  hex:'#FFF8F7' }, { label:'100', hex:'#FFEDEB' }, { label:'200', hex:'#FFDAD7' },
    { label:'300', hex:'#FFB3AD' }, { label:'400', hex:'#FF8982' }, { label:'500', hex:'#F75C57' },
    { label:'600', hex:'#D44341' }, { label:'700', hex:'#B22A2B' }, { label:'800', hex:'#900D17' },
    { label:'900', hex:'#68000A' }, { label:'950', hex:'#410004' },
  ],
  blue: [
    { label:'50',  hex:'#FDFDFE' }, { label:'100', hex:'#FAFBFE' }, { label:'200', hex:'#F0F4FD' },
    { label:'300', hex:'#E2EDFC' }, { label:'400', hex:'#9BBDF2' }, { label:'500', hex:'#4A84D9' },
    { label:'600', hex:'#0144AD' }, { label:'700', hex:'#00348A' }, { label:'800', hex:'#183353' },
    { label:'900', hex:'#0F2238' }, { label:'950', hex:'#071422' },
  ],
  slate: [
    { label:'50',  hex:'#F8F9FF' }, { label:'100', hex:'#EDF1FC' }, { label:'200', hex:'#DEE2ED' },
    { label:'300', hex:'#C2C6D1' }, { label:'400', hex:'#A7ABB6' }, { label:'500', hex:'#8C919B' },
    { label:'600', hex:'#727781' }, { label:'700', hex:'#5A5F68' }, { label:'800', hex:'#424750' },
    { label:'900', hex:'#2C3139' }, { label:'950', hex:'#171C24' },
  ],
  yellow: [
    { label:'50',  hex:'#FFF8F4' }, { label:'100', hex:'#FFEEDD' }, { label:'200', hex:'#FFDDB6' },
    { label:'300', hex:'#FFB95A' }, { label:'400', hex:'#EA9A16' }, { label:'500', hex:'#C88100' },
    { label:'600', hex:'#A66A00' }, { label:'700', hex:'#845400' }, { label:'800', hex:'#643F00' },
    { label:'900', hex:'#462A00' }, { label:'950', hex:'#2A1800' },
  ],
};
const SWATCH_CATS = Object.keys(SWATCHES);

// simple hex shade
function shade(hex, pct) {
  const h = hex.replace('#','');
  const num = parseInt(h.length === 3 ? h.split('').map(c=>c+c).join('') : h, 16);
  let r = (num >> 16) & 0xff, g = (num >> 8) & 0xff, b = num & 0xff;
  const t = pct < 0 ? 0 : 255, p = Math.abs(pct) / 100;
  r = Math.round((t - r) * p + r);
  g = Math.round((t - g) * p + g);
  b = Math.round((t - b) * p + b);
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function applyTweaks(vals) {
  const root = document.documentElement;
  TWEAK_SPEC.forEach(sec => sec.items.forEach(it => {
    let v = vals[it.key];
    if (v == null) return;
    if (it.unit) v = v + it.unit;
    root.style.setProperty(it.cssVar, v);
    if (it.derive) {
      const d = it.derive(vals[it.key]);
      Object.entries(d).forEach(([k,val]) => root.style.setProperty(k, val));
    }
  }));
}

/* ===========================================================
   Sidebar
=========================================================== */
const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: 'dashboard', count: null, children: null },
  { id: 'tokens', label: 'Tokens', icon: 'tag', children: [
    { id: 'tokens.all', label: 'All tokens' },
    { id: 'tokens.color', label: 'Color' },
    { id: 'tokens.type', label: 'Type' },
    { id: 'tokens.shape', label: 'Shape' },
  ], defaultOpen: true, activeChild: 'tokens.all' },
  { id: 'projects', label: 'Projects', icon: 'folder', count: 42, children: [
    { id: 'projects.active', label: 'Active' },
    { id: 'projects.review', label: 'In review' },
    { id: 'projects.archived', label: 'Archived' },
  ]},
  { id: 'team', label: 'Team', icon: 'users', children: [
    { id: 'team.members', label: 'Members' },
    { id: 'team.groups', label: 'Groups' },
    { id: 'team.invites', label: 'Invites', count: 3 },
  ]},
  { id: 'analytics', label: 'Analytics', icon: 'chart', children: null },
  { id: 'inbox', label: 'Inbox', icon: 'inbox', count: 12, children: null },
  { id: 'settings', label: 'Settings', icon: 'settings', children: [
    { id: 'settings.general', label: 'General' },
    { id: 'settings.appearance', label: 'Appearance' },
    { id: 'settings.integrations', label: 'Integrations' },
  ]},
];

function Sidebar({ active, setActive, collapsed, setCollapsed }) {
  const [open, setOpen] = useState(() => {
    const s = {};
    NAV.forEach(n => { if (n.children) s[n.id] = !!n.defaultOpen; });
    return s;
  });

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''}`}>
      <div className="brand">
        <div className="brand-mark">TP</div>
        {!collapsed && (
          <div className="brand-text">
            <div className="brand-name">Token Playground</div>
            <div className="brand-sub">Design research</div>
          </div>
        )}
        <button
          className="btn-icon sidebar-toggle"
          onClick={() => setCollapsed(c => !c)}
          title={collapsed ? 'Expand' : 'Collapse'}
        >
          <Icon name={collapsed ? 'chevron-right' : 'chevron-left'} size={16} stroke={2}/>
        </button>
      </div>

      {!collapsed && <div className="nav-group-title">Workspace</div>}
      {NAV.map(item => {
        const hasKids = !!item.children;
        const isOpen = !!open[item.id] && !collapsed;
        const isActive = active === item.id || (hasKids && item.children.some(c => c.id === active));
        return (
          <div key={item.id}>
            <div
              className={`nav-item ${isActive && !hasKids ? 'active' : ''} ${hasKids && isActive && collapsed ? 'active' : ''} ${isOpen ? 'open' : ''}`}
              onClick={() => {
                if (collapsed) {
                  setCollapsed(false);
                  if (hasKids) setOpen(o => ({...o, [item.id]: true}));
                  else setActive(item.id);
                  return;
                }
                if (hasKids) setOpen(o => ({...o, [item.id]: !o[item.id]}));
                else setActive(item.id);
              }}
              title={collapsed ? item.label : ''}
            >
              <span className="nav-icon"><Icon name={item.icon} size={18}/></span>
              {!collapsed && <span className="nav-label">{item.label}</span>}
              {!collapsed && item.count != null && !hasKids && <span className="count">{item.count}</span>}
              {!collapsed && hasKids && <span className="caret"><Icon name="caret" size={16} stroke={2}/></span>}
            </div>
            {hasKids && !collapsed && (
              <div className={`nav-children ${isOpen ? 'open' : ''}`}>
                <div>
                  {item.children.map(c => (
                    <div
                      key={c.id}
                      className={`nav-sub ${active === c.id ? 'active' : ''}`}
                      onClick={() => setActive(c.id)}
                    >
                      <span className="dot"/>
                      <span>{c.label}</span>
                      {c.count != null && <span className="count" style={{marginLeft:'auto'}}>{c.count}</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </aside>
  );
}

/* ===========================================================
   Advanced search
   Supports freeform text + structured tokens: field:value
   Fields: status, priority, owner, region, budget>, budget<, progress>, progress<
=========================================================== */
const FIELDS = {
  status:    { label: 'Status',    values: STATUSES },
  priority:  { label: 'Priority',  values: PRIORITIES },
  region:    { label: 'Region',    values: REGIONS },
  owner:     { label: 'Owner',     values: OWNERS.map(o => o.n) },
  budget:    { label: 'Budget',    numeric: true, hint: 'e.g. budget>200000' },
  progress:  { label: 'Progress',  numeric: true, hint: 'e.g. progress<50' },
};

function parseTokens(str) {
  // Returns: { tokens: [{field, op, value}], text: 'remaining freeform' }
  const tokens = [];
  let text = '';
  const parts = str.match(/("[^"]+"|\S+)/g) || [];
  for (const raw of parts) {
    const m = raw.match(/^(\w+)(:|>=|<=|>|<|=)(.+)$/);
    if (m) {
      const field = m[1].toLowerCase();
      const op = m[2];
      let val = m[3].replace(/^"|"$/g,'');
      if (FIELDS[field]) { tokens.push({ field, op, value: val }); continue; }
    }
    text += (text?' ':'') + raw.replace(/^"|"$/g,'');
  }
  return { tokens, text };
}

function rowMatches(row, q) {
  const { tokens, text } = q;
  for (const t of tokens) {
    const v = row[t.field];
    const rv = (t.field === 'owner') ? row.owner.n : v;
    if (FIELDS[t.field]?.numeric) {
      const n = Number(t.value);
      if (isNaN(n)) continue;
      if (t.op === '>' && !(rv > n)) return false;
      if (t.op === '>=' && !(rv >= n)) return false;
      if (t.op === '<' && !(rv < n)) return false;
      if (t.op === '<=' && !(rv <= n)) return false;
      if ((t.op === '=' || t.op === ':') && rv !== n) return false;
    } else {
      if (String(rv).toLowerCase() !== String(t.value).toLowerCase()) return false;
    }
  }
  if (text) {
    const hay = `${row.id} ${row.name} ${row.owner.n} ${row.status} ${row.priority} ${row.region}`.toLowerCase();
    if (!hay.includes(text.toLowerCase())) return false;
  }
  return true;
}

function SearchBar({ value, setValue, onCommitToken }) {
  const [focused, setFocused] = useState(false);
  const [selIdx, setSelIdx] = useState(0);
  const wrapRef = useRef(null);
  const inputRef = useRef(null);

  const parsed = useMemo(() => parseTokens(value), [value]);

  // Suggestions based on current partial input
  const suggestions = useMemo(() => {
    const last = value.split(/\s+/).pop() || '';
    const out = [];
    if (!last || !last.includes(':')) {
      // suggest fields
      const q = last.toLowerCase();
      Object.entries(FIELDS).forEach(([k, f]) => {
        if (!q || k.startsWith(q) || f.label.toLowerCase().includes(q)) {
          out.push({
            kind: 'field', key: k, label: f.label,
            insert: `${k}${f.numeric ? '>' : ':'}`,
            hint: f.numeric ? f.hint : 'pick a value',
          });
        }
      });
    } else {
      // field:value autocomplete
      const [k, v = ''] = last.split(':');
      const f = FIELDS[k];
      if (f && f.values) {
        f.values.forEach(val => {
          if (!v || val.toLowerCase().includes(v.toLowerCase())) {
            out.push({ kind: 'value', key: k, label: val, insert: `${k}:${/\s/.test(val) ? `"${val}"` : val} `, hint: f.label });
          }
        });
      }
    }
    return out.slice(0, 7);
  }, [value]);

  useEffect(() => { setSelIdx(0); }, [value]);

  useEffect(() => {
    const h = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setFocused(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const applySuggestion = (s) => {
    const parts = value.split(/(\s+)/);
    // replace last non-space segment
    for (let i = parts.length - 1; i >= 0; i--) {
      if (parts[i].trim()) { parts[i] = s.insert; break; }
    }
    const next = parts.join('') + (s.kind === 'field' ? '' : '');
    setValue(next.endsWith(' ') ? next : next + (s.kind === 'value' ? '' : ''));
    inputRef.current?.focus();
  };

  const onKey = (e) => {
    if (!focused || !suggestions.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setSelIdx(i => Math.min(i+1, suggestions.length-1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setSelIdx(i => Math.max(i-1, 0)); }
    else if (e.key === 'Enter' || e.key === 'Tab') {
      if (suggestions[selIdx]) { e.preventDefault(); applySuggestion(suggestions[selIdx]); }
    } else if (e.key === 'Escape') { setFocused(false); }
  };

  return (
    <div className="search-bar" ref={wrapRef}>
      <Icon name="search" size={18} stroke={1.75}/>
      {parsed.tokens.map((t, i) => (
        <span key={i} className="search-token">
          <span>{FIELDS[t.field]?.label || t.field}</span>
          <span className="op">{t.op}</span>
          <span>{t.value}</span>
          <span className="x" onClick={() => {
            // remove this token from the string
            const regex = new RegExp(`\\b${t.field}${t.op === ':' ? ':' : t.op}"?${t.value.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}"?\\s?`);
            setValue(value.replace(regex, '').trim());
          }}><Icon name="x" size={12} stroke={2.5}/></span>
        </span>
      ))}
      <div className="search-wrap">
        <input
          ref={inputRef}
          type="text"
          placeholder={parsed.tokens.length ? '' : 'Search or filter — try status:Active or budget>200000'}
          value={value}
          onChange={e => setValue(e.target.value)}
          onFocus={() => setFocused(true)}
          onKeyDown={onKey}
        />
        {focused && suggestions.length > 0 && (
          <div className="suggestions">
            <div className="sugg-group">{suggestions[0].kind === 'field' ? 'Fields' : `${FIELDS[suggestions[0].key].label} values`}</div>
            {suggestions.map((s, i) => (
              <div
                key={i}
                className={`sugg-item ${i === selIdx ? 'sel' : ''}`}
                onMouseEnter={() => setSelIdx(i)}
                onMouseDown={(e) => { e.preventDefault(); applySuggestion(s); }}
              >
                {s.kind === 'field'
                  ? <><span className="op-chip">{s.key}:</span><span>{s.label}</span></>
                  : <><span>{s.label}</span></>}
                <span className="hint">{s.hint}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {value && <button className="btn-icon" onClick={() => setValue('')} title="Clear"><Icon name="x" size={16} stroke={2}/></button>}
      <span className="kbd">⌘K</span>
    </div>
  );
}

/* ===========================================================
   Table
=========================================================== */
const COLUMNS = [
  { key: 'id',       label: 'ID',       sort: r => r.id },
  { key: 'name',     label: 'Project',  sort: r => r.name },
  { key: 'owner',    label: 'Owner',    sort: r => r.owner.n },
  { key: 'status',   label: 'Status',   sort: r => r.status },
  { key: 'priority', label: 'Priority', sort: r => r.priority },
  { key: 'region',   label: 'Region',   sort: r => r.region },
  { key: 'budget',   label: 'Budget',   sort: r => r.budget, align: 'right' },
  { key: 'progress', label: 'Progress', sort: r => r.progress },
  { key: 'updated',  label: 'Updated',  sort: r => r.updated.getTime() },
];

function ProgressBar({ value }) {
  return (
    <div style={{display:'flex', alignItems:'center', gap:10, minWidth:140}}>
      <div style={{flex:1, height:6, background:'var(--surface-container-high)', borderRadius:'var(--radius-pill)', overflow:'hidden'}}>
        <div style={{width:`${value}%`, height:'100%', background:'var(--primary)', borderRadius:'inherit', transition:'width 200ms ease'}}/>
      </div>
      <span className="cell-mono" style={{width:32, textAlign:'right'}}>{value}%</span>
    </div>
  );
}

function Table({ rows, selected, setSelected, onOpen }) {
  const [sort, setSort] = useState({ key: 'updated', dir: 'desc' });
  const [focusIdx, setFocusIdx] = useState(0);
  const wrapRef = useRef(null);

  const sorted = useMemo(() => {
    const col = COLUMNS.find(c => c.key === sort.key);
    const out = [...rows].sort((a,b) => {
      const va = col.sort(a), vb = col.sort(b);
      if (va < vb) return sort.dir === 'asc' ? -1 : 1;
      if (va > vb) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
    return out;
  }, [rows, sort]);

  useEffect(() => { if (focusIdx >= sorted.length) setFocusIdx(Math.max(0, sorted.length - 1)); }, [sorted.length, focusIdx]);

  const toggleSort = (k) => setSort(s => s.key === k ? { key: k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: k, dir: 'asc' });

  const onKey = (e) => {
    if (!sorted.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIdx(i => Math.min(i + 1, sorted.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setFocusIdx(0); }
    else if (e.key === 'End') { e.preventDefault(); setFocusIdx(sorted.length - 1); }
    else if (e.key === ' ') {
      e.preventDefault();
      onOpen?.(sorted[focusIdx]);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      const r = sorted[focusIdx];
      if (r) setSelected(selected === r.id ? null : r.id);
    }
  };

  return (
    <table
      className="dt"
      ref={wrapRef}
      tabIndex={0}
      onKeyDown={onKey}
      style={{outline:'none'}}
    >
      <thead>
        <tr>
          {COLUMNS.map(c => (
            <th
              key={c.key}
              onClick={() => toggleSort(c.key)}
              className={sort.key === c.key ? 'sorted' : ''}
              style={{textAlign: c.align || 'left'}}
            >
              {c.label}
              <span className="sort-ind">
                {sort.key === c.key ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}
              </span>
            </th>
          ))}
          <th style={{width:40}}></th>
        </tr>
      </thead>
      <tbody>
        {sorted.map((r, i) => (
          <tr
            key={r.id}
            className={selected === r.id ? 'sel' : ''}
            onClick={() => { setFocusIdx(i); setSelected(selected === r.id ? null : r.id); }}
            style={i === focusIdx ? { boxShadow: 'inset 0 0 0 2px var(--primary)' } : undefined}
          >
            <td><span className="cell-mono cell-muted">{r.id}</span></td>
            <td className="cell-primary">{r.name}</td>
            <td>
              <span className="avatar" style={{background:r.owner.c}}>{initials(r.owner.n)}</span>
              {r.owner.n}
            </td>
            <td><span className={`badge ${statusBadge(r.status)}`}><span className="bdot"/>{r.status}</span></td>
            <td><span className={`badge ${priorityBadge(r.priority)}`}>{r.priority}</span></td>
            <td className="cell-muted">{r.region}</td>
            <td style={{textAlign:'right'}} className="cell-mono">{fmtMoney(r.budget)}</td>
            <td><ProgressBar value={r.progress}/></td>
            <td className="cell-muted">{fmtDate(r.updated)}</td>
            <td>
              <button className="btn-icon" onClick={(e) => e.stopPropagation()}><Icon name="more" size={16} stroke={2}/></button>
            </td>
          </tr>
        ))}
        {sorted.length === 0 && (
          <tr><td colSpan={COLUMNS.length + 1} style={{height:120, textAlign:'center', color:'var(--on-surface-variant)'}}>No results match your filters.</td></tr>
        )}
      </tbody>
    </table>
  );
}

/* ===========================================================
   Simple table (plain text only — no colors, badges, avatars)
=========================================================== */
const SIMPLE_COLUMNS = [
  { key: 'firstName', label: 'First name', sort: r => r.firstName },
  { key: 'lastName',  label: 'Last name',  sort: r => r.lastName },
  { key: 'email',     label: 'Email',      sort: r => r.email },
  { key: 'address',   label: 'Home address', sort: r => r.address },
];

function SimpleTable({ rows, onOpen }) {
  const [sort, setSort] = useState({ key: 'lastName', dir: 'asc' });
  const [focusIdx, setFocusIdx] = useState(0);
  const sorted = useMemo(() => {
    const col = SIMPLE_COLUMNS.find(c => c.key === sort.key);
    return [...rows].sort((a,b) => {
      const va = col.sort(a), vb = col.sort(b);
      if (va < vb) return sort.dir === 'asc' ? -1 : 1;
      if (va > vb) return sort.dir === 'asc' ? 1 : -1;
      return 0;
    });
  }, [rows, sort]);
  useEffect(() => { if (focusIdx >= sorted.length) setFocusIdx(Math.max(0, sorted.length - 1)); }, [sorted.length, focusIdx]);
  const toggleSort = (k) => setSort(s => s.key === k ? { key: k, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { key: k, dir: 'asc' });

  const onKey = (e) => {
    if (!sorted.length) return;
    if (e.key === 'ArrowDown') { e.preventDefault(); setFocusIdx(i => Math.min(i + 1, sorted.length - 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setFocusIdx(i => Math.max(i - 1, 0)); }
    else if (e.key === 'Home') { e.preventDefault(); setFocusIdx(0); }
    else if (e.key === 'End') { e.preventDefault(); setFocusIdx(sorted.length - 1); }
    else if (e.key === ' ') { e.preventDefault(); onOpen?.(sorted[focusIdx]); }
  };

  return (
    <table className="dt" tabIndex={0} onKeyDown={onKey} style={{outline:'none'}}>
      <thead>
        <tr>
          {SIMPLE_COLUMNS.map(c => (
            <th
              key={c.key}
              onClick={() => toggleSort(c.key)}
              className={sort.key === c.key ? 'sorted' : ''}
            >
              {c.label}
              <span className="sort-ind">
                {sort.key === c.key ? (sort.dir === 'asc' ? '▲' : '▼') : '↕'}
              </span>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((r, i) => (
          <tr
            key={r.id}
            onClick={() => setFocusIdx(i)}
            style={i === focusIdx ? { boxShadow: 'inset 0 0 0 2px var(--primary)' } : undefined}
          >
            <td>{r.firstName}</td>
            <td>{r.lastName}</td>
            <td className="cell-muted">{r.email}</td>
            <td className="cell-muted">{r.address}</td>
          </tr>
        ))}
        {sorted.length === 0 && (
          <tr><td colSpan={SIMPLE_COLUMNS.length} style={{height:120, textAlign:'center', color:'var(--on-surface-variant)'}}>No results match your filters.</td></tr>
        )}
      </tbody>
    </table>
  );
}

/* ===========================================================
   Color control — mode ('picker'|'swatches') driven by section toggle
=========================================================== */
function ColorControl({ value, onChange, mode }) {
  const [hexInput, setHexInput] = useState(value);
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [swatchCat, setSwatchCat] = useState('blue');
  const [popoverPos, setPopoverPos] = useState({ top: 0, left: 0 });
  const nativeRef = useRef(null);
  const triggerRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => { setHexInput(value); }, [value]);

  // close popover on outside click
  useEffect(() => {
    if (!popoverOpen) return;
    const h = (e) => {
      if (
        popoverRef.current && !popoverRef.current.contains(e.target) &&
        triggerRef.current && !triggerRef.current.contains(e.target)
      ) setPopoverOpen(false);
    };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, [popoverOpen]);

  const commitHex = (raw) => {
    const h = raw.startsWith('#') ? raw : '#' + raw;
    if (/^#[0-9a-fA-F]{6}$/.test(h)) onChange(h.toLowerCase());
  };

  const handleSwatchDotClick = () => {
    if (mode === 'picker') {
      nativeRef.current?.click();
    } else {
      const rect = triggerRef.current?.getBoundingClientRect();
      if (rect) setPopoverPos({ top: rect.bottom + 6, left: rect.left });
      setPopoverOpen(o => !o);
    }
  };

  const fieldStyle = {
    display:'flex', alignItems:'center', gap:6,
    border:'1px solid var(--outline-variant)', borderRadius:8,
    padding:'5px 8px', background:'var(--surface)',
  };

  return (
    <div style={{flex:1, minWidth:0}}>
      <div style={fieldStyle}>
        {/* colour dot — opens picker or swatches popover depending on mode */}
        <div
          ref={triggerRef}
          title={mode === 'picker' ? 'Open colour picker' : 'Choose from swatches'}
          onClick={handleSwatchDotClick}
          style={{
            position:'relative', width:18, height:18, borderRadius:4, flexShrink:0,
            background:value, border:'1px solid var(--outline-variant)', cursor:'pointer',
          }}
        >
          {mode === 'picker' && (
            <input
              ref={nativeRef}
              type="color"
              value={value}
              onChange={e => { onChange(e.target.value); setHexInput(e.target.value); }}
              style={{position:'absolute', inset:0, opacity:0, width:'100%', height:'100%', cursor:'pointer', padding:0, border:'none'}}
            />
          )}
        </div>
        {/* hex text input — always visible */}
        <input
          type="text"
          value={hexInput}
          maxLength={7}
          placeholder="#000000"
          onChange={e => setHexInput(e.target.value)}
          onBlur={e => commitHex(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') commitHex(e.target.value); }}
          style={{
            flex:1, border:'none', outline:'none', background:'transparent',
            font:'inherit', fontSize:12, fontFamily:'var(--font-mono)',
            textTransform:'uppercase', color:'var(--on-surface)',
          }}
        />
      </div>

      {/* Swatches popover — fixed positioned near trigger dot */}
      {popoverOpen && mode === 'swatches' && (
        <div
          ref={popoverRef}
          style={{
            position:'fixed', top:popoverPos.top, left:popoverPos.left,
            zIndex:400, background:'var(--surface)',
            border:'1px solid var(--outline-variant)', borderRadius:12,
            boxShadow:'var(--shadow-3)', padding:12, width:220,
          }}
        >
          <select
            value={swatchCat}
            onChange={e => setSwatchCat(e.target.value)}
            style={{
              width:'100%', padding:'5px 8px', border:'1px solid var(--outline-variant)',
              borderRadius:8, font:'inherit', fontSize:12, background:'var(--surface)', marginBottom:8,
            }}
          >
            {SWATCH_CATS.map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase() + c.slice(1)}</option>)}
          </select>
          <div style={{display:'flex', flexWrap:'wrap', gap:4}}>
            {SWATCHES[swatchCat].map(s => (
              <div
                key={s.label}
                title={`${s.label} · ${s.hex}`}
                onClick={() => {
                  onChange(s.hex.toLowerCase());
                  setHexInput(s.hex.toLowerCase());
                  setPopoverOpen(false);
                }}
                style={{
                  width:24, height:24, borderRadius:4, background:s.hex,
                  cursor:'pointer', flexShrink:0, boxSizing:'border-box',
                  border: value.toLowerCase() === s.hex.toLowerCase()
                    ? '2px solid var(--primary)' : '1px solid var(--outline-variant)',
                }}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/* ===========================================================
   Tweaks panel
=========================================================== */
function TweaksPanel({ open, vals, setVals, onReset, onClose, onSave }) {
  const [colorMode, setColorMode] = useState('picker');
  if (!open) return null;

  const SegControl = () => (
    <div style={{
      display:'inline-flex', background:'var(--surface-container)', borderRadius:6,
      padding:2, gap:2,
    }}>
      {['picker','swatches'].map(m => (
        <button
          key={m}
          onClick={() => setColorMode(m)}
          style={{
            padding:'2px 8px', fontSize:10, fontFamily:'inherit', cursor:'pointer',
            borderRadius:4, border:'none', fontWeight:600, textTransform:'uppercase',
            letterSpacing:'0.05em',
            background: colorMode === m ? 'var(--surface)' : 'transparent',
            color: colorMode === m ? 'var(--on-surface)' : 'var(--on-surface-variant)',
            boxShadow: colorMode === m ? 'var(--shadow-1)' : 'none',
          }}
        >{m}</button>
      ))}
    </div>
  );

  return (
    <div className="tweaks on">
      <div className="tweaks-head">
        <div className="tweaks-title">Tweaks</div>
        <div style={{display:'flex', gap:8, alignItems:'center'}}>
          {onSave && <button className="tweaks-reset" onClick={onSave} style={{color:'var(--primary)', borderColor:'var(--primary)'}}>Save</button>}
          <button className="tweaks-reset" onClick={onReset}>Reset</button>
          <button className="btn-icon" onClick={onClose} title="Close" style={{width:28, height:28}}>
            <Icon name="x" size={16} stroke={2}/>
          </button>
        </div>
      </div>
      <div className="tweaks-body">
        {TWEAK_SPEC.map(sec => (
          <div className="tweak-section" key={sec.section}>
            <div className="tweak-section-title" style={sec.section === 'Color' ? {display:'flex', alignItems:'center', justifyContent:'space-between', textTransform:'uppercase'} : {}}>
              <span>{sec.section}</span>
              {sec.section === 'Color' && <SegControl/>}
            </div>
            {sec.items.map(it => (
              <div className="tweak-row" key={it.key}>
                <label>{it.label}</label>
                {it.type === 'color' && (
                  <ColorControl
                    value={vals[it.key]}
                    onChange={v => setVals(prev => ({...prev, [it.key]: v}))}
                    mode={colorMode}
                  />
                )}
                {it.type === 'range' && (
                  <>
                    <input type="range" min={it.min} max={it.max} step={it.step || 1}
                      value={vals[it.key]}
                      onChange={e => setVals(v => ({...v, [it.key]: Number(e.target.value)}))}/>
                    <span className="val">{vals[it.key]}{it.unit || ''}</span>
                  </>
                )}
                {it.type === 'select' && (
                  <select value={vals[it.key]} onChange={e => setVals(v => ({...v, [it.key]: e.target.value}))}>
                    {it.options.map((o, i) => <option key={i} value={o}>{it.labels?.[i] || o}</option>)}
                  </select>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ===========================================================
   Favorites dialog
=========================================================== */
function FavoritesDialog({ open, onClose, favorites, onApply, onDelete, onRename }) {
  if (!open) return null;
  return (
    <div
      onClick={onClose}
      style={{position:'fixed', inset:0, background:'rgba(0,0,0,.35)', zIndex:200, display:'grid', placeItems:'center'}}
    >
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width:480, maxHeight:'80vh', background:'var(--surface)',
          border:'var(--stroke-1) solid var(--outline-variant)', borderRadius:'var(--radius-lg)',
          boxShadow:'var(--shadow-3)', display:'flex', flexDirection:'column', overflow:'hidden',
        }}
      >
        <div style={{padding:'14px 16px', borderBottom:'1px solid var(--outline-variant)', display:'flex', alignItems:'center'}}>
          <div style={{fontWeight:600, fontSize:15}}>Favorite tweaks</div>
          <button className="btn-icon ml-auto" onClick={onClose} style={{width:28, height:28}}>
            <Icon name="x" size={16} stroke={2}/>
          </button>
        </div>
        <div style={{padding:12, overflowY:'auto'}}>
          {favorites.length === 0 && (
            <div style={{padding:24, textAlign:'center', color:'var(--on-surface-variant)', fontSize:13}}>
              No favorites yet. Save the current tweaks from the account menu.
            </div>
          )}
          {favorites.map(f => (
            <div key={f.id} style={{
              display:'flex', alignItems:'center', gap:10, padding:'10px 12px',
              border:'var(--stroke-1) solid var(--outline-variant)', borderRadius:'var(--radius-sm)',
              marginBottom:8,
            }}>
              <div style={{width:20, height:20, borderRadius:4, background:f.vals.primary, flexShrink:0, border:'1px solid var(--outline-variant)'}}/>
              <div style={{flex:1, minWidth:0}}>
                <div style={{fontWeight:500, fontSize:14, overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap'}}>{f.name}</div>
                <div style={{fontSize:11, color:'var(--on-surface-variant)', fontFamily:'var(--font-mono)'}}>{f.vals.primary} · {f.vals.fontSize}px</div>
              </div>
              <button className="btn btn-tonal" style={{padding:'6px 12px', fontSize:12}} onClick={() => onApply(f)}>Apply</button>
              <button className="btn-icon" onClick={() => {
                const name = prompt('Rename favorite', f.name);
                if (name && name.trim()) onRename(f.id, name.trim());
              }} title="Rename"><Icon name="settings" size={14} stroke={2}/></button>
              <button className="btn-icon" onClick={() => {
                if (confirm(`Delete "${f.name}"?`)) onDelete(f.id);
              }} title="Delete"><Icon name="x" size={14} stroke={2}/></button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ===========================================================
   User menu
=========================================================== */
function UserMenu({ tweaksOpen, setTweaksOpen, tweaks, setTweaks, favorites, setFavorites }) {
  const [open, setOpen] = useState(false);
  const [favOpen, setFavOpen] = useState(false);
  const ref = useRef(null);
  const fileRef = useRef(null);
  useEffect(() => {
    const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', h);
    return () => document.removeEventListener('mousedown', h);
  }, []);

  const saveCurrent = () => {
    const name = prompt('Name this favorite', `Tweak ${favorites.length + 1}`);
    if (!name || !name.trim()) return;
    const fav = { id: Date.now().toString(36), name: name.trim(), vals: { ...tweaks } };
    setFavorites(list => [...list, fav]);
    setOpen(false);
  };

  const applyFav = (f) => { setTweaks({ ...f.vals }); setFavOpen(false); };
  const deleteFav = (id) => setFavorites(list => list.filter(f => f.id !== id));
  const renameFav = (id, name) => setFavorites(list => list.map(f => f.id === id ? { ...f, name } : f));

  const exportFavs = () => {
    const blob = new Blob([JSON.stringify(favorites, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = 'tweak-favorites.json'; a.click();
    URL.revokeObjectURL(url);
    setOpen(false);
  };

  const importFavs = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const data = JSON.parse(reader.result);
        if (!Array.isArray(data)) throw new Error('Invalid format');
        setFavorites(list => [...list, ...data.filter(d => d && d.vals && d.name)
          .map(d => ({ ...d, id: Date.now().toString(36) + Math.random().toString(36).slice(2,5) }))]);
      } catch (err) {
        alert('Could not import: ' + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };
  return (
    <div className="user-menu-wrap" ref={ref}>
      <button className="user-btn" onClick={() => setOpen(o => !o)}>
        <span className="avatar" style={{background:'var(--primary)'}}>MV</span>
        <span className="uname">Mara Velez</span>
        <span className="caret"><Icon name="caret" size={14} stroke={2}/></span>
      </button>
      {open && (
        <div className="user-menu">
          <div className="mhead">
            <div className="mname">Mara Velez</div>
            <div className="memail">mara@tokenplayground.co</div>
          </div>
          <div className="mitem" onClick={() => setTweaksOpen(!tweaksOpen)}>
            <Icon name="sliders" size={16} stroke={1.75}/>
            <span>Tweaks panel</span>
            <span className={`switch ${tweaksOpen ? 'on' : ''} ml-auto`}><span className="thumb"/></span>
          </div>
          <div className="mitem" onClick={saveCurrent}>
            <Icon name="plus" size={16} stroke={1.75}/>
            <span>Save current tweaks…</span>
          </div>
          <div className="mitem" onClick={() => { setFavOpen(true); setOpen(false); }}>
            <Icon name="tag" size={16} stroke={1.75}/>
            <span>Favorite tweaks</span>
            <span className="ml-auto" style={{fontSize:11, color:'var(--on-surface-variant)'}}>{favorites.length}</span>
          </div>
          <div className="mitem" onClick={exportFavs}>
            <Icon name="download" size={16} stroke={1.75}/>
            <span>Export favorites (.json)</span>
          </div>
          <div className="mitem" onClick={() => fileRef.current?.click()}>
            <Icon name="folder" size={16} stroke={1.75}/>
            <span>Import favorites…</span>
            <input ref={fileRef} type="file" accept="application/json" style={{display:'none'}} onChange={importFavs}/>
          </div>
          <div className="mdiv"/>
          <div className="mitem">
            <Icon name="palette" size={16} stroke={1.75}/>
            <span>Appearance</span>
          </div>
          <div className="mitem">
            <Icon name="keyboard" size={16} stroke={1.75}/>
            <span>Shortcuts</span>
            <span className="ml-auto"><span className="kbd" style={{fontFamily:'var(--font-mono)',fontSize:11,color:'var(--on-surface-variant)',padding:'2px 6px',border:'var(--stroke-1) solid var(--outline-variant)',borderRadius:'var(--radius-xs)',background:'var(--surface-dim)'}}>?</span></span>
          </div>
          <div className="mdiv"/>
          <div className="mitem">
            <Icon name="user" size={16} stroke={1.75}/>
            <span>Profile</span>
          </div>
          <div className="mitem">
            <Icon name="settings" size={16} stroke={1.75}/>
            <span>Account settings</span>
          </div>
          <div className="mdiv"/>
          <div className="mitem" style={{color:'var(--danger)'}}>
            <Icon name="logout" size={16} stroke={1.75}/>
            <span>Sign out</span>
          </div>
        </div>
      )}
      <FavoritesDialog
        open={favOpen}
        onClose={() => setFavOpen(false)}
        favorites={favorites}
        onApply={applyFav}
        onDelete={deleteFav}
        onRename={renameFav}
      />
    </div>
  );
}

/* ===========================================================
   App
=========================================================== */
function App() {
  const [active, setActive] = useState('tokens.all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [statusFilter, setStatusFilter] = useState(null);
  const [priorityFilter, setPriorityFilter] = useState(null);
  const [showTweaks, setShowTweaks] = useState(false);
  const [tweaks, setTweaks] = useState(TWEAK_DEFAULTS);
  const [navCollapsed, setNavCollapsed] = useState(false);
  const [simpleMode, setSimpleMode] = useState(false);
  const [enterDialogOpen, setEnterDialogOpen] = useState(false);
  const lastFocusRef = useRef(null);
  const openEnterDialog = () => {
    lastFocusRef.current = document.activeElement;
    setEnterDialogOpen(true);
  };
  const closeEnterDialog = () => {
    setEnterDialogOpen(false);
    const el = lastFocusRef.current;
    if (el && typeof el.focus === 'function') setTimeout(() => el.focus(), 0);
  };
  const [favorites, setFavorites] = useState(() => {
    try {
      const raw = localStorage.getItem('tweakFavorites');
      return raw ? JSON.parse(raw) : [];
    } catch { return []; }
  });
  useEffect(() => {
    try { localStorage.setItem('tweakFavorites', JSON.stringify(favorites)); } catch {}
  }, [favorites]);

  // apply tweaks live
  useEffect(() => { applyTweaks(tweaks); }, [tweaks]);

  // persist tweaks via edit-mode protocol (only real edits, not defaults)
  const firstTweak = useRef(true);
  useEffect(() => {
    if (firstTweak.current) { firstTweak.current = false; return; }
    window.parent?.postMessage({ type: '__edit_mode_set_keys', edits: tweaks }, '*');
  }, [tweaks]);

  // edit mode protocol
  useEffect(() => {
    const h = (e) => {
      if (e.data?.type === '__activate_edit_mode') setShowTweaks(true);
      if (e.data?.type === '__deactivate_edit_mode') setShowTweaks(false);
    };
    window.addEventListener('message', h);
    window.parent?.postMessage({ type: '__edit_mode_available' }, '*');
    return () => window.removeEventListener('message', h);
  }, []);

  // cmd-k to focus search
  useEffect(() => {
    const h = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        document.querySelector('.search-bar input')?.focus();
      }
    };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, []);

  // derived filtered rows
  const filtered = useMemo(() => {
    const q = parseTokens(search);
    return ROWS.filter(r => {
      if (!rowMatches(r, q)) return false;
      if (statusFilter && r.status !== statusFilter) return false;
      if (priorityFilter && r.priority !== priorityFilter) return false;
      return true;
    });
  }, [search, statusFilter, priorityFilter]);

  const statusCounts = useMemo(() => {
    const c = {}; ROWS.forEach(r => c[r.status] = (c[r.status]||0)+1); return c;
  }, []);

  return (
    <div className={`app ${navCollapsed ? 'nav-collapsed' : ''}`}>
      <Sidebar active={active} setActive={setActive} collapsed={navCollapsed} setCollapsed={setNavCollapsed}/>

      <main className="main">
        <div className="page-header">
          <div>
            <h1 className="page-title">All tokens</h1>
            <div className="page-subtitle">Play with color, shape, stroke and density. Everything below reads from tokens.</div>
          </div>
          <div className="flex gap-2" style={{alignItems:'center'}}>
            <button className="btn btn-outlined"><Icon name="download" size={16}/> Export</button>
            <button className="btn btn-primary"><Icon name="plus" size={16} stroke={2.25}/> New project</button>
            <UserMenu
              tweaksOpen={showTweaks}
              setTweaksOpen={setShowTweaks}
              tweaks={tweaks}
              setTweaks={setTweaks}
              favorites={favorites}
              setFavorites={setFavorites}
            />
          </div>
        </div>

        <div className="toolbar">
          <div style={{flex:1, minWidth:300}}>
            <SearchBar value={search} setValue={setSearch}/>
          </div>
          <button
            className={`chip ${simpleMode ? 'on' : ''}`}
            onClick={() => setSimpleMode(m => !m)}
            title="Toggle simplified text-only table"
          >
            <Icon name="file" size={14} stroke={2}/> Simple view
          </button>
          <button className="chip" onClick={() => setStatusFilter(null)}><Icon name="filter" size={14} stroke={2}/> All</button>
          {!simpleMode && STATUSES.map(s => (
            <button
              key={s}
              className={`chip ${statusFilter === s ? 'on' : ''}`}
              onClick={() => setStatusFilter(statusFilter === s ? null : s)}
            >
              {s}
              <span className="chip-count">{statusCounts[s] || 0}</span>
            </button>
          ))}
          <div className="ml-auto flex gap-2">
            <button className="btn btn-text" onClick={() => { setSearch(''); setStatusFilter(null); setPriorityFilter(null); }}>
              <Icon name="refresh" size={14} stroke={2}/> Clear
            </button>
          </div>
        </div>

        <div className="table-card">
          <div className="table-top">
            <span className="table-count">
              Showing <b>{filtered.length}</b> of <b>{ROWS.length}</b> projects
            </span>
            <div className="ml-auto flex gap-2">
              <button className="btn btn-outlined"><Icon name="sliders" size={14} stroke={2}/> Columns</button>
              <button className="btn btn-tonal"><Icon name="grid" size={14} stroke={2}/> Group by</button>
            </div>
          </div>
          <div style={{overflow:'auto'}}>
            {simpleMode
              ? <SimpleTable rows={filtered} onOpen={openEnterDialog}/>
              : <Table rows={filtered} selected={selected} setSelected={setSelected} onOpen={openEnterDialog}/>}
          </div>
          <div className="pagination">
            <span>Rows per page: <b style={{color:'var(--on-surface)'}}>25</b></span>
            <div className="pages">
              <button className="page-btn" disabled>‹</button>
              <button className="page-btn current">1</button>
              <button className="page-btn">2</button>
              <button className="page-btn">3</button>
              <button className="page-btn">›</button>
            </div>
          </div>
        </div>
      </main>

      {enterDialogOpen && (
        <div
          onClick={() => closeEnterDialog()}
          onKeyDown={(e) => { if (e.key === 'Escape' || e.key === 'Enter' || e.key === ' ') { e.preventDefault(); closeEnterDialog(); } }}
          tabIndex={-1}
          ref={el => el?.focus()}
          style={{position:'fixed', inset:0, background:'rgba(0,0,0,.35)', zIndex:300, display:'grid', placeItems:'center', outline:'none'}}
        >
          <div
            onClick={e => e.stopPropagation()}
            style={{
              minWidth:320, background:'var(--surface)',
              border:'var(--stroke-1) solid var(--outline-variant)', borderRadius:'var(--radius-lg)',
              boxShadow:'var(--shadow-3)', padding:'24px',
            }}
          >
            <div style={{fontSize:18, fontWeight:600, marginBottom:8}}>Enter item</div>
            <div style={{fontSize:13, color:'var(--on-surface-variant)', marginBottom:20}}>
              Press Enter, Space, or Escape to close.
            </div>
            <div style={{display:'flex', justifyContent:'flex-end'}}>
              <button className="btn btn-primary" onClick={() => closeEnterDialog()}>OK</button>
            </div>
          </div>
        </div>
      )}

      <TweaksPanel
        open={showTweaks}
        vals={tweaks}
        setVals={setTweaks}
        onReset={() => setTweaks(TWEAK_DEFAULTS)}
        onClose={() => setShowTweaks(false)}
        onSave={() => {
          const name = prompt('Name this favorite', `Tweak ${favorites.length + 1}`);
          if (!name || !name.trim()) return;
          setFavorites(list => [...list, { id: Date.now().toString(36), name: name.trim(), vals: { ...tweaks } }]);
        }}
      />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
