// ============================================================
//  MIND SPACE — Per-section atmosphere themes
//  Each section owns a palette, mesh gradient, blobs, particle
//  style, light rays, decoration glyphs, and cutout keywords.
//  Colors are intentionally muted — quiet luxury, never loud.
// ============================================================

// Particle "kinds" understood by the canvas renderer:
//   dust     — slow drifting motes (default)
//   node     — motes + faint connecting lines (network)
//   streak   — node + very low-opacity vertical code rain
//   star     — twinkling points
//   bokeh    — large soft blurred orbs
//   confetti — slow drifting flecks in accent colors
//   wave     — horizontally drifting motes (audio)

export const THEMES = {
  home: {
    id: 'home',
    mood: 'Quiet luxury',
    base: '#0b0a09',
    accent: '#c9a96a',
    accent2: '#b9895c',
    accent3: '#e7cf9a',
    mesh: [
      { c: 'rgba(201,169,106,0.16)', x: '16%', y: '12%', s: '42%' },
      { c: 'rgba(150,110,70,0.16)', x: '88%', y: '20%', s: '40%' },
      { c: 'rgba(120,95,70,0.14)', x: '50%', y: '110%', s: '55%' },
    ],
    blobs: ['rgba(201,169,106,0.20)', 'rgba(150,110,70,0.18)', 'rgba(231,207,154,0.12)'],
    particle: { kind: 'star', color: '231,207,154', count: 'low', twinkle: true },
    rays: { color: 'rgba(231,207,154,0.10)' },
    decor: ['StickyNote', 'NotebookPen', 'Star', 'Coffee', 'BookOpen', 'Sparkles'],
    cutouts: ['coffee', 'notebook', 'workspace', 'desk', 'aesthetic-room', 'plant'],
  },

  ideas: {
    id: 'ideas',
    mood: 'Creative studio',
    base: '#0c0913',
    accent: '#b78cd9',
    accent2: '#e08ab5',
    accent3: '#7aa2e3',
    mesh: [
      { c: 'rgba(160,110,210,0.18)', x: '14%', y: '14%', s: '44%' },
      { c: 'rgba(224,138,181,0.16)', x: '86%', y: '18%', s: '42%' },
      { c: 'rgba(110,140,230,0.16)', x: '52%', y: '108%', s: '52%' },
    ],
    blobs: ['rgba(160,110,210,0.22)', 'rgba(224,138,181,0.18)', 'rgba(110,140,230,0.18)'],
    particle: { kind: 'bokeh', color: '199,156,225', count: 'med', twinkle: true },
    rays: { color: 'rgba(199,156,225,0.12)' },
    decor: ['Lightbulb', 'PenTool', 'Palette', 'MessageCircle', 'Sparkles', 'StickyNote'],
    cutouts: ['lightbulb', 'sketchbook', 'architecture', 'paint', 'art-studio', 'design'],
  },

  code: {
    id: 'code',
    mood: 'Modern AI lab',
    base: '#06080f',
    accent: '#5b8cff',
    accent2: '#7c6bf0',
    accent3: '#49c9e6',
    mesh: [
      { c: 'rgba(63,96,200,0.20)', x: '12%', y: '10%', s: '42%' },
      { c: 'rgba(110,90,220,0.18)', x: '90%', y: '24%', s: '40%' },
      { c: 'rgba(40,120,180,0.16)', x: '50%', y: '112%', s: '54%' },
    ],
    blobs: ['rgba(63,96,200,0.22)', 'rgba(110,90,220,0.20)', 'rgba(40,150,200,0.16)'],
    particle: { kind: 'streak', color: '91,140,255', count: 'high', connect: true },
    rays: { color: 'rgba(91,140,255,0.12)' },
    grid: true,
    decor: ['Terminal', 'Braces', 'GitBranch', 'Cpu', 'Binary', 'Network'],
    cutouts: ['laptop', 'circuit', 'keyboard', 'server', 'robot', 'technology'],
  },

  tasks: {
    id: 'tasks',
    mood: 'Mission control',
    base: '#080a0e',
    accent: '#7fa7d6',
    accent2: '#5fb6b0',
    accent3: '#9fb4cc',
    mesh: [
      { c: 'rgba(90,130,180,0.16)', x: '18%', y: '12%', s: '42%' },
      { c: 'rgba(70,150,150,0.14)', x: '85%', y: '22%', s: '40%' },
      { c: 'rgba(110,130,160,0.14)', x: '50%', y: '110%', s: '52%' },
    ],
    blobs: ['rgba(90,130,180,0.18)', 'rgba(70,150,150,0.16)', 'rgba(120,140,170,0.14)'],
    particle: { kind: 'node', color: '127,167,214', count: 'med', connect: true },
    rays: { color: 'rgba(127,167,214,0.10)' },
    grid: true,
    decor: ['ListChecks', 'Target', 'GitBranch', 'LayoutGrid', 'CheckCheck', 'Milestone'],
    cutouts: ['blueprint', 'planner', 'whiteboard', 'desk', 'calendar', 'workspace'],
  },

  notes: {
    id: 'notes',
    mood: 'Digital library',
    base: '#0c0a07',
    accent: '#c2a274',
    accent2: '#a98c63',
    accent3: '#d9c29a',
    mesh: [
      { c: 'rgba(180,150,100,0.16)', x: '16%', y: '14%', s: '44%' },
      { c: 'rgba(150,120,80,0.14)', x: '86%', y: '20%', s: '40%' },
      { c: 'rgba(120,100,70,0.14)', x: '50%', y: '110%', s: '52%' },
    ],
    blobs: ['rgba(180,150,100,0.18)', 'rgba(150,120,80,0.16)', 'rgba(200,175,130,0.12)'],
    particle: { kind: 'dust', color: '210,190,150', count: 'med' },
    rays: { color: 'rgba(210,190,150,0.10)' },
    paper: true,
    decor: ['BookOpen', 'FileText', 'Bookmark', 'Library', 'Network', 'NotebookPen'],
    cutouts: ['books', 'library', 'paper', 'documents', 'reading', 'archive'],
  },

  hobbies: {
    id: 'hobbies',
    mood: 'Creative lifestyle',
    base: '#0d0a08',
    accent: '#e08a5e',
    accent2: '#d65f8f',
    accent3: '#e3c463',
    mesh: [
      { c: 'rgba(224,138,94,0.18)', x: '14%', y: '12%', s: '44%' },
      { c: 'rgba(214,95,143,0.16)', x: '88%', y: '20%', s: '42%' },
      { c: 'rgba(60,80,140,0.16)', x: '50%', y: '110%', s: '54%' },
    ],
    blobs: ['rgba(224,138,94,0.20)', 'rgba(214,95,143,0.18)', 'rgba(70,90,150,0.18)'],
    particle: { kind: 'bokeh', color: '227,170,110', count: 'med', twinkle: true },
    rays: { color: 'rgba(227,170,110,0.12)' },
    decor: ['Camera', 'Headphones', 'Palette', 'Leaf', 'Gamepad2', 'Disc3'],
    cutouts: ['camera', 'headphones', 'vinyl', 'plants', 'coffee', 'guitar'],
  },

  travel: {
    id: 'travel',
    mood: 'Luxury travel journal',
    base: '#070a0e',
    accent: '#4fb0c4',
    accent2: '#e0915e',
    accent3: '#8a7ec4',
    mesh: [
      { c: 'rgba(50,130,160,0.18)', x: '14%', y: '14%', s: '44%' },
      { c: 'rgba(224,145,94,0.16)', x: '88%', y: '74%', s: '46%' },
      { c: 'rgba(120,110,180,0.16)', x: '60%', y: '6%', s: '44%' },
    ],
    blobs: ['rgba(50,150,170,0.20)', 'rgba(224,145,94,0.18)', 'rgba(120,110,180,0.16)'],
    particle: { kind: 'star', color: '160,210,220', count: 'med', twinkle: true },
    rays: { color: 'rgba(120,200,210,0.14)' },
    aurora: true,
    decor: ['Plane', 'Map', 'MapPin', 'Mountain', 'Compass', 'Ticket'],
    cutouts: ['mountains', 'airplane', 'beach', 'europe', 'passport', 'map'],
  },

  future: {
    id: 'future',
    mood: 'Future vision',
    base: '#070812',
    accent: '#9aa6d6',
    accent2: '#7c6bd0',
    accent3: '#c4cae0',
    mesh: [
      { c: 'rgba(90,100,180,0.18)', x: '16%', y: '12%', s: '42%' },
      { c: 'rgba(110,90,200,0.16)', x: '86%', y: '20%', s: '42%' },
      { c: 'rgba(150,160,200,0.12)', x: '50%', y: '110%', s: '54%' },
    ],
    blobs: ['rgba(90,100,190,0.20)', 'rgba(110,90,200,0.18)', 'rgba(160,170,210,0.12)'],
    particle: { kind: 'star', color: '196,202,224', count: 'high', twinkle: true },
    rays: { color: 'rgba(196,202,224,0.12)' },
    constellation: true,
    decor: ['Star', 'Orbit', 'Rocket', 'Telescope', 'Sparkles', 'Compass'],
    cutouts: ['planet', 'rocket', 'galaxy', 'stars', 'space', 'nebula'],
  },

  journey: {
    id: 'journey',
    mood: 'Success timeline',
    base: '#0b0907',
    accent: '#d8b56a',
    accent2: '#c98f48',
    accent3: '#f0d89a',
    mesh: [
      { c: 'rgba(216,181,106,0.18)', x: '16%', y: '12%', s: '44%' },
      { c: 'rgba(201,143,72,0.16)', x: '86%', y: '22%', s: '42%' },
      { c: 'rgba(150,110,60,0.14)', x: '50%', y: '110%', s: '52%' },
    ],
    blobs: ['rgba(216,181,106,0.22)', 'rgba(201,143,72,0.18)', 'rgba(240,216,154,0.14)'],
    particle: { kind: 'confetti', color: '240,216,154', count: 'med', twinkle: true },
    rays: { color: 'rgba(240,216,154,0.16)' },
    decor: ['Award', 'Medal', 'Trophy', 'TrendingUp', 'Star', 'Milestone'],
    cutouts: ['trophy', 'medal', 'celebration', 'fireworks', 'summit', 'award'],
  },

  music: {
    id: 'music',
    mood: 'Music studio',
    base: '#0b0710',
    accent: '#b06ab3',
    accent2: '#6a7bd0',
    accent3: '#d66a7e',
    mesh: [
      { c: 'rgba(150,80,170,0.18)', x: '14%', y: '14%', s: '44%' },
      { c: 'rgba(90,100,200,0.16)', x: '86%', y: '20%', s: '42%' },
      { c: 'rgba(200,70,100,0.14)', x: '50%', y: '110%', s: '52%' },
    ],
    blobs: ['rgba(150,80,170,0.22)', 'rgba(90,100,200,0.18)', 'rgba(200,80,110,0.16)'],
    particle: { kind: 'wave', color: '199,130,205', count: 'med' },
    rays: { color: 'rgba(199,130,205,0.12)' },
    decor: ['Disc3', 'Music4', 'Headphones', 'AudioLines', 'Radio', 'Mic2'],
    cutouts: ['headphones', 'vinyl', 'guitar', 'concert', 'piano', 'studio'],
  },

  video: {
    id: 'video',
    mood: 'Cinema',
    base: '#0a0607',
    accent: '#c06a7e',
    accent2: '#d8b56a',
    accent3: '#8a5560',
    mesh: [
      { c: 'rgba(150,60,80,0.18)', x: '16%', y: '12%', s: '44%' },
      { c: 'rgba(180,150,90,0.14)', x: '86%', y: '22%', s: '40%' },
      { c: 'rgba(90,40,55,0.18)', x: '50%', y: '110%', s: '54%' },
    ],
    blobs: ['rgba(160,70,90,0.20)', 'rgba(190,160,100,0.16)', 'rgba(100,45,60,0.18)'],
    particle: { kind: 'bokeh', color: '210,170,120', count: 'low', twinkle: true },
    rays: { color: 'rgba(216,181,106,0.16)' },
    spotlight: true,
    decor: ['Film', 'Clapperboard', 'Video', 'MonitorPlay', 'Camera', 'Aperture'],
    cutouts: ['cinema', 'film', 'projector', 'theater', 'camera', 'movie'],
  },

  mood: {
    id: 'mood',
    mood: 'Pinterest premium',
    base: '#0b090c',
    accent: '#cf9bb4',
    accent2: '#9b8fcf',
    accent3: '#c9b79a',
    mesh: [
      { c: 'rgba(200,150,175,0.16)', x: '14%', y: '14%', s: '44%' },
      { c: 'rgba(150,140,200,0.16)', x: '86%', y: '20%', s: '42%' },
      { c: 'rgba(200,180,150,0.14)', x: '50%', y: '110%', s: '52%' },
    ],
    blobs: ['rgba(200,150,175,0.18)', 'rgba(150,140,200,0.18)', 'rgba(200,180,150,0.14)'],
    particle: { kind: 'bokeh', color: '207,155,180', count: 'med', twinkle: true },
    rays: { color: 'rgba(207,155,180,0.12)' },
    decor: ['Image', 'Shapes', 'Palette', 'Frame', 'Sparkles', 'Camera'],
    cutouts: ['fashion', 'architecture', 'interior', 'nature', 'design', 'minimal'],
  },
}

export const DEFAULT_THEME = 'home'

export const getTheme = (id) => THEMES[id] || THEMES[DEFAULT_THEME]

// Build a layered radial-gradient background string from a theme's mesh stops.
export const meshBackground = (theme) =>
  theme.mesh
    .map((m) => `radial-gradient(${m.s} ${m.s} at ${m.x} ${m.y}, ${m.c}, transparent 60%)`)
    .join(',')

// Count presets scaled later by viewport area.
export const PARTICLE_COUNT = { low: 26, med: 44, high: 64 }
