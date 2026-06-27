// ============================================================
//  MIND SPACE — Sample content
//  All copy here is placeholder/personal-feeling sample data.
//  Swap freely; structure is what the components rely on.
// ============================================================

import { img, imgMono } from '../lib/images'

export const profile = {
  name: 'Shweta',
  title: 'Designer · Engineer · Perpetual Curious',
  location: 'Bengaluru, India',
  greeting: 'Welcome back',
  manifesto:
    'A quiet room for loud ideas. Everything I am collecting, building, and dreaming toward — kept in one place that feels like mine.',
  password: 'sanctuary', // shared-password gate (see note in README/AuthContext)
}

// ---------------- Ideas & Inspiration ----------------
export const ideas = [
  {
    id: 'i1',
    type: 'image',
    category: 'Design',
    title: 'Brutalist meets soft light',
    src: img('idea-arch', 800, 1100),
    note: 'Concrete forms photographed during golden hour — warmth against weight.',
  },
  {
    id: 'i2',
    type: 'quote',
    category: 'Philosophy',
    title: null,
    quote: 'Create the thing you wish existed, then quietly leave it for someone to find.',
    author: 'a note to self',
  },
  {
    id: 'i3',
    type: 'image',
    category: 'Interiors',
    title: 'Reading nook, low and warm',
    src: img('idea-interior', 800, 640),
    note: 'Lamps below eye-level. Always lamps below eye-level.',
  },
  {
    id: 'i4',
    type: 'text',
    category: 'Product',
    title: 'Tiny idea: ambient to-do',
    body: 'A task app that fades completed items into the background like footprints in sand — gentle, not gamified.',
  },
  {
    id: 'i5',
    type: 'image',
    category: 'Nature',
    title: 'Fog over the ridgeline',
    src: imgMono('idea-fog', 800, 980),
    note: 'Mono. Negative space as a feeling.',
  },
  {
    id: 'i6',
    type: 'image',
    category: 'Typography',
    title: 'Serif on stone',
    src: img('idea-type', 800, 600),
    note: 'Letterforms want to be carved, not printed.',
  },
  {
    id: 'i7',
    type: 'quote',
    category: 'Craft',
    quote: 'Detail is not decoration. Detail is respect.',
    author: 'studio wall',
  },
  {
    id: 'i8',
    type: 'image',
    category: 'Travel',
    title: 'Blue hour, narrow street',
    src: img('idea-street', 800, 1080),
    note: 'The light between day and night, where cities feel honest.',
  },
  {
    id: 'i9',
    type: 'text',
    category: 'Writing',
    title: 'Opening line I keep',
    body: 'The house remembered us in the way old houses do — slowly, and all at once.',
  },
  {
    id: 'i10',
    type: 'image',
    category: 'Food',
    title: 'Citrus, cut clean',
    src: img('idea-citrus', 800, 800),
    note: 'Colour study. Acid and sugar as a palette.',
  },
  {
    id: 'i11',
    type: 'image',
    category: 'Design',
    title: 'Spiral staircase, top-down',
    src: imgMono('idea-stair', 800, 920),
    note: 'Geometry that feels inevitable.',
  },
  {
    id: 'i12',
    type: 'image',
    category: 'Nature',
    title: 'Tide, long exposure',
    src: img('idea-tide', 800, 560),
    note: 'Stillness made of motion.',
  },
]

export const ideaCategories = ['All', ...Array.from(new Set(ideas.map((i) => i.category)))]

// ---------------- Code & Learning ----------------
export const codeSnippets = [
  {
    id: 'c1',
    title: 'Debounce, the clean way',
    language: 'javascript',
    category: 'Utilities',
    description: 'Trailing-edge debounce I reach for in every project.',
    code: `export function debounce(fn, wait = 300) {
  let t
  return (...args) => {
    clearTimeout(t)
    t = setTimeout(() => fn.apply(this, args), wait)
  }
}`,
  },
  {
    id: 'c2',
    title: 'Glassmorphism surface',
    language: 'css',
    category: 'CSS',
    description: 'The smoked-glass recipe used across this site.',
    code: `.glass {
  background: linear-gradient(180deg,
    rgba(31,31,38,0.66),
    rgba(16,16,20,0.55));
  backdrop-filter: blur(18px) saturate(130%);
  border: 1px solid rgba(255,255,255,0.06);
}`,
  },
  {
    id: 'c3',
    title: 'Group rows by key',
    language: 'python',
    category: 'Python',
    description: 'Tiny grouping helper without importing the world.',
    code: `from collections import defaultdict

def group_by(rows, key):
    out = defaultdict(list)
    for row in rows:
        out[key(row)].append(row)
    return dict(out)`,
  },
  {
    id: 'c4',
    title: 'useMediaQuery hook',
    language: 'javascript',
    category: 'React',
    description: 'Reactive breakpoints without a dependency.',
    code: `import { useState, useEffect } from 'react'

export function useMediaQuery(query) {
  const [matches, setMatches] = useState(
    () => window.matchMedia(query).matches
  )
  useEffect(() => {
    const m = window.matchMedia(query)
    const on = () => setMatches(m.matches)
    m.addEventListener('change', on)
    return () => m.removeEventListener('change', on)
  }, [query])
  return matches
}`,
  },
  {
    id: 'c5',
    title: 'Recent items, deduped',
    language: 'sql',
    category: 'SQL',
    description: 'Latest row per user with a window function.',
    code: `SELECT *
FROM (
  SELECT *,
    ROW_NUMBER() OVER (
      PARTITION BY user_id
      ORDER BY created_at DESC
    ) AS rn
  FROM events
) ranked
WHERE rn = 1;`,
  },
  {
    id: 'c6',
    title: 'Prefers-reduced-motion guard',
    language: 'javascript',
    category: 'Accessibility',
    description: 'Respect the people who ask for calm.',
    code: `const reduce = window.matchMedia(
  '(prefers-reduced-motion: reduce)'
).matches

export const motionSafe = (animation) =>
  reduce ? { duration: 0 } : animation`,
  },
]

export const codeLanguages = ['All', ...Array.from(new Set(codeSnippets.map((c) => c.category)))]

export const learningResources = [
  { id: 'l1', title: 'Refactoring UI', kind: 'Book', by: 'Wathan & Schoger', tag: 'Design' },
  { id: 'l2', title: 'The Animation API deep-dive', kind: 'Course', by: 'Framer Motion docs', tag: 'React' },
  { id: 'l3', title: 'Designing Data-Intensive Apps', kind: 'Book', by: 'Martin Kleppmann', tag: 'Systems' },
  { id: 'l4', title: 'Type scales & rhythm', kind: 'Article', by: 'Practical Typography', tag: 'Typography' },
]

// ---------------- Tasks & Projects ----------------
export const taskGroups = [
  {
    id: 'daily',
    label: 'Today',
    accent: 'teal',
    tasks: [
      { id: 't1', text: 'Morning pages — three longhand', done: true, priority: 'low' },
      { id: 't2', text: 'Ship the entry-screen animation', done: true, priority: 'high' },
      { id: 't3', text: 'Review pull requests', done: false, priority: 'medium' },
      { id: 't4', text: '45 min deep-work: masonry layout', done: false, priority: 'high' },
      { id: 't5', text: 'Walk without the phone', done: false, priority: 'low' },
    ],
  },
  {
    id: 'weekly',
    label: 'This Week',
    accent: 'gold',
    tasks: [
      { id: 't6', text: 'Finish Mind Space v1', done: false, priority: 'high' },
      { id: 't7', text: 'Sketch the travel section moodboard', done: true, priority: 'medium' },
      { id: 't8', text: 'Read two chapters of DDIA', done: false, priority: 'medium' },
      { id: 't9', text: 'Call grandma', done: false, priority: 'high' },
    ],
  },
  {
    id: 'long',
    label: 'Long Term',
    accent: 'plum',
    tasks: [
      { id: 't10', text: 'Launch personal portfolio refresh', done: false, priority: 'high' },
      { id: 't11', text: 'Learn film photography properly', done: false, priority: 'low' },
      { id: 't12', text: 'Save for the Kyoto trip', done: true, priority: 'medium' },
      { id: 't13', text: 'Write one essay a month', done: false, priority: 'medium' },
    ],
  },
]

export const projects = [
  { id: 'p1', name: 'Mind Space', progress: 72, status: 'In progress', accent: 'teal' },
  { id: 'p2', name: 'Portfolio v3', progress: 35, status: 'Designing', accent: 'gold' },
  { id: 'p3', name: 'Field-notes app', progress: 18, status: 'Exploring', accent: 'plum' },
]

// ---------------- Notes & Knowledge ----------------
export const notes = [
  {
    id: 'n1',
    title: 'On taste',
    pinned: true,
    tags: ['craft', 'mindset'],
    date: '2026-06-10',
    excerpt: 'Taste is the gap between what you make and what you admire.',
    body: 'Taste is the gap between what you can make and what you can recognize as good. The gap is uncomfortable, and the discomfort is the whole point — it is the engine. Close it slowly. Never resent it.',
  },
  {
    id: 'n2',
    title: 'Reading list — summer',
    pinned: true,
    tags: ['books'],
    date: '2026-06-02',
    excerpt: 'Six books, no pressure, one at a time.',
    body: 'Klara and the Sun · The Overstory · A Little Life (again) · Tomorrow, and Tomorrow, and Tomorrow · Pachinko · The Default Mode. Rule: abandon freely, finish nothing out of guilt.',
  },
  {
    id: 'n3',
    title: 'Studio setup notes',
    pinned: false,
    tags: ['workspace', 'gear'],
    date: '2026-05-21',
    excerpt: 'Warm lamps, cool monitor, plants that forgive me.',
    body: 'Two warm lamps below eye-level. Monitor at arm length, top edge at brow. Snake plant + pothos (low maintenance). Keep the desk 80% empty. Sound: brown noise or rain, never lyrics while writing.',
  },
  {
    id: 'n4',
    title: 'Decision journal: side project',
    pinned: false,
    tags: ['decisions', 'work'],
    date: '2026-05-08',
    excerpt: 'Why I said no to the freelance gig.',
    body: 'Said no. Reason: it traded 6 weeks of my best hours for money I do not currently need, against momentum I cannot easily rebuild. Revisit only if runway drops below comfort.',
  },
  {
    id: 'n5',
    title: 'Recipe — the only dal',
    pinned: false,
    tags: ['food', 'home'],
    date: '2026-04-29',
    excerpt: 'Toor dal, tadka twice, lime at the end.',
    body: 'Pressure cook toor dal with turmeric. First tadka into the dal. Second tadka — ghee, cumin, dried chili, hing, garlic — poured on top at the table so it crackles. Lime, not lemon, at the end.',
  },
  {
    id: 'n6',
    title: 'Phrases worth keeping',
    pinned: false,
    tags: ['writing', 'language'],
    date: '2026-04-12',
    excerpt: 'A magpie list of words and turns.',
    body: 'sillage · the blue hour · liminal · sotto voce · hiraeth · the grain of a voice · a considered silence · load-bearing detail.',
  },
]

export const noteTags = ['All', ...Array.from(new Set(notes.flatMap((n) => n.tags)))]

// ---------------- Hobbies & Interests ----------------
export const hobbies = [
  {
    id: 'h1',
    name: 'Film Photography',
    level: 'Building the eye',
    progress: 55,
    accent: 'teal',
    image: imgMono('hobby-film', 800, 600),
    note: 'Portra 400, a beat-up Olympus, and patience.',
  },
  {
    id: 'h2',
    name: 'Ceramics',
    level: 'Happily clumsy',
    progress: 30,
    accent: 'gold',
    image: img('hobby-ceramic', 800, 600),
    note: 'Wonky bowls are still bowls.',
  },
  {
    id: 'h3',
    name: 'Trail Running',
    level: 'Consistent',
    progress: 70,
    accent: 'plum',
    image: img('hobby-run', 800, 600),
    note: 'Hills are just slow conversations with gravity.',
  },
  {
    id: 'h4',
    name: 'Reading',
    level: 'Lifelong',
    progress: 88,
    accent: 'teal',
    image: img('hobby-read', 800, 600),
    note: '24 / 30 books this year.',
  },
  {
    id: 'h5',
    name: 'Cooking',
    level: 'Confident',
    progress: 64,
    accent: 'gold',
    image: img('hobby-cook', 800, 600),
    note: 'Improvising more, measuring less.',
  },
  {
    id: 'h6',
    name: 'Synth & Ambient',
    level: 'Beginner',
    progress: 22,
    accent: 'plum',
    image: imgMono('hobby-synth', 800, 600),
    note: 'Making slow, warm drones at midnight.',
  },
]

// ---------------- Travel Wishlist ----------------
export const travel = [
  {
    id: 'tr1',
    place: 'Kyoto',
    country: 'Japan',
    season: 'Autumn',
    image: img('travel-kyoto', 800, 1000),
    note: 'Temples in red maple. Slow tea. Quiet mornings in Arashiyama.',
    saved: true,
  },
  {
    id: 'tr2',
    place: 'Lofoten',
    country: 'Norway',
    season: 'Winter',
    image: img('travel-lofoten', 800, 1000),
    note: 'Aurora over fishing cabins. The cold that makes you feel awake.',
    saved: false,
  },
  {
    id: 'tr3',
    place: 'Lisbon',
    country: 'Portugal',
    season: 'Spring',
    image: img('travel-lisbon', 800, 1000),
    note: 'Tiled facades, custard tarts, fado drifting from a doorway.',
    saved: true,
  },
  {
    id: 'tr4',
    place: 'Patagonia',
    country: 'Chile',
    season: 'Summer',
    image: imgMono('travel-patagonia', 800, 1000),
    note: 'Wind, granite towers, and the smallness that heals.',
    saved: false,
  },
  {
    id: 'tr5',
    place: 'Marrakech',
    country: 'Morocco',
    season: 'Autumn',
    image: img('travel-marrakech', 800, 1000),
    note: 'Riads, spice light, rooftops at the call to prayer.',
    saved: false,
  },
]

// ---------------- Future Planning ----------------
export const futureRoadmap = [
  { id: 'f1', when: 'Next 3 months', title: 'Ship Mind Space & portfolio', detail: 'Two flagship pieces, public.', accent: 'teal' },
  { id: 'f2', when: 'This year', title: 'A real photography series', detail: '36 frames, one theme, printed.', accent: 'gold' },
  { id: 'f3', when: 'Next year', title: 'Kyoto in autumn', detail: 'Three weeks, no laptop.', accent: 'plum' },
  { id: 'f4', when: 'Someday', title: 'A small studio space', detail: 'Light, plants, a kiln, a desk.', accent: 'gold' },
]

export const aspirations = [
  { id: 'a1', text: 'Write something a stranger keeps' },
  { id: 'a2', text: 'Speak passable Japanese' },
  { id: 'a3', text: 'Run a half-marathon trail' },
  { id: 'a4', text: 'Mentor one person well' },
  { id: 'a5', text: 'Design with less, always' },
]

// ---------------- Journey & Achievements ----------------
export const journey = [
  {
    id: 'j1',
    year: '2019',
    title: 'First line of code',
    body: 'A clumsy HTML page with a marquee. I was hooked before it even rendered right.',
    media: img('journey-2019', 700, 480),
    kind: 'Beginning',
  },
  {
    id: 'j2',
    year: '2021',
    title: 'Shipped my first product',
    body: 'A tiny tool used by forty people. Forty felt like forty thousand.',
    media: img('journey-2021', 700, 480),
    kind: 'Milestone',
  },
  {
    id: 'j3',
    year: '2023',
    title: 'Design + engineering, fused',
    body: 'Stopped choosing between the two. Started building things that felt as good as they worked.',
    media: imgMono('journey-2023', 700, 480),
    kind: 'Turning point',
  },
  {
    id: 'j4',
    year: '2024',
    title: 'Spoke at a meetup',
    body: 'Forty minutes on motion design. Hands shook. Did it anyway.',
    media: img('journey-2024', 700, 480),
    kind: 'Achievement',
  },
  {
    id: 'j5',
    year: '2026',
    title: 'Built my mind-space',
    body: 'A private place for everything I am becoming. You are looking at it.',
    media: img('journey-2026', 700, 480),
    kind: 'Now',
  },
]

export const achievements = [
  { id: 'ac1', label: 'Books read', value: '24', suffix: '/30' },
  { id: 'ac2', label: 'Projects shipped', value: '11' },
  { id: 'ac3', label: 'Countries visited', value: '9' },
  { id: 'ac4', label: 'Day writing streak', value: '63' },
]

// ---------------- Music & Audio ----------------
export const playlists = [
  {
    id: 'pl1',
    name: 'Deep Focus',
    mood: 'For long, quiet work',
    accent: 'teal',
    cover: imgMono('music-focus', 600, 600),
  },
  {
    id: 'pl2',
    name: 'Golden Hour',
    mood: 'Warm, unhurried evenings',
    accent: 'gold',
    cover: img('music-golden', 600, 600),
  },
  {
    id: 'pl3',
    name: 'Midnight Ambient',
    mood: 'Drones and rain',
    accent: 'plum',
    cover: imgMono('music-midnight', 600, 600),
  },
]

// Royalty-free sample audio (SoundHelix) — replace with your own files.
export const tracks = [
  { id: 'm1', title: 'Slow Tide', artist: 'Ambient Study', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3', cover: imgMono('track-tide', 300, 300) },
  { id: 'm2', title: 'Paper Lanterns', artist: 'Lo-fi Rooms', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3', cover: img('track-lantern', 300, 300) },
  { id: 'm3', title: 'Northern Light', artist: 'Field & Synth', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3', cover: imgMono('track-north', 300, 300) },
  { id: 'm4', title: 'Citrus Morning', artist: 'Kitchen Tapes', src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3', cover: img('track-citrus', 300, 300) },
]

// ---------------- Video Archive ----------------
// Royalty-free sample clips (Google sample bucket) — replace with your own.
export const videos = [
  {
    id: 'v1',
    title: 'Morning ritual',
    meta: 'Personal · 0:34',
    poster: img('video-morning', 800, 480),
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
  },
  {
    id: 'v2',
    title: 'City in the rain',
    meta: 'Travel · 1:12',
    poster: imgMono('video-rain', 800, 480),
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4',
  },
  {
    id: 'v3',
    title: 'Studio time-lapse',
    meta: 'Process · 0:48',
    poster: img('video-studio', 800, 480),
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4',
  },
  {
    id: 'v4',
    title: 'Trail, early light',
    meta: 'Outdoors · 1:30',
    poster: img('video-trail', 800, 480),
    src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyrides.mp4',
  },
]

// ---------------- Mood Board ----------------
export const moodBoard = [
  { id: 'mb1', src: img('mood-1', 600, 800), label: 'Texture' },
  { id: 'mb2', src: imgMono('mood-2', 600, 520), label: 'Form' },
  { id: 'mb3', src: img('mood-3', 600, 760), label: 'Colour' },
  { id: 'mb4', src: img('mood-4', 600, 600), label: 'Light' },
  { id: 'mb5', src: imgMono('mood-5', 600, 880), label: 'Line' },
  { id: 'mb6', src: img('mood-6', 600, 560), label: 'Warmth' },
  { id: 'mb7', src: img('mood-7', 600, 720), label: 'Quiet' },
  { id: 'mb8', src: imgMono('mood-8', 600, 640), label: 'Edge' },
  { id: 'mb9', src: img('mood-9', 600, 820), label: 'Depth' },
  { id: 'mb10', src: img('mood-10', 600, 540), label: 'Grain' },
]

// ---------------- Dashboard derived highlights ----------------
export const dashboardStats = [
  { id: 'd1', label: 'Active tasks', value: taskGroups.reduce((a, g) => a + g.tasks.filter((t) => !t.done).length, 0) },
  { id: 'd2', label: 'Ideas saved', value: ideas.length },
  { id: 'd3', label: 'Notes', value: notes.length },
  { id: 'd4', label: 'Dream trips', value: travel.length },
]
