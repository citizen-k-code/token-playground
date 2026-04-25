export const OWNERS = [
  { n: 'Mara Velez', c: '#2e5aac' }, { n: 'Omar Khatri', c: '#0e7a4d' },
  { n: 'Priya Shah', c: '#8a5a00' }, { n: 'Ines Dubois', c: '#a6343e' },
  { n: 'Theo Lund', c: '#5e35b1' }, { n: 'Sana Koh', c: '#00796b' },
  { n: 'Jules Rhee', c: '#c0392b' }, { n: 'Bea Okafor', c: '#455a64' },
];
export const STATUSES = ['Active','Paused','Draft','Archived','Review'];
export const PRIORITIES = ['Low','Medium','High','Urgent'];
export const REGIONS = ['EMEA','AMER','APAC','LATAM'];

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

export const ROWS = Array.from({ length: 42 }, (_, i) => {
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
    memberStatus: ['active', 'inactive', 'ongoing'][i % 3],
    prospect: i % 4 === 0 ? 'yes' : 'no',
  };
});

export const statusBadge = (s) => {
  const map = { Active:'success', Paused:'warning', Draft:'neutral', Archived:'neutral', Review:'info' };
  return map[s] || 'neutral';
};
export const memberStatusBadge = (s) => {
  const map = { active:'success', inactive:'neutral', ongoing:'info' };
  return map[s] || 'neutral';
};
export const priorityBadge = (p) => {
  const map = { Low:'neutral', Medium:'info', High:'warning', Urgent:'destructive' };
  return map[p];
};
export const fmtMoney = n => '$' + n.toLocaleString();
export const fmtDate = d => new Date(d).toLocaleDateString('en', { month: 'short', day: 'numeric' });
export const initials = n => n.split(' ').map(w=>w[0]).slice(0,2).join('');
