import {
  LayoutDashboard,
  Sparkles,
  Code2,
  ListChecks,
  NotebookPen,
  Palette,
  Plane,
  Compass,
  Milestone,
  Music4,
  Clapperboard,
  Images,
} from 'lucide-react'

/**
 * Single source of truth for navigation + section metadata.
 * `accent` maps to the cohesive jewel palette (teal / gold / plum).
 */
export const SECTIONS = [
  { id: 'home', label: 'Dashboard', short: 'Home', icon: LayoutDashboard, accent: 'gold' },
  { id: 'ideas', label: 'Ideas & Inspiration', short: 'Ideas', icon: Sparkles, accent: 'teal' },
  { id: 'code', label: 'Code & Learning', short: 'Code', icon: Code2, accent: 'teal' },
  { id: 'tasks', label: 'Tasks & Projects', short: 'Tasks', icon: ListChecks, accent: 'gold' },
  { id: 'notes', label: 'Notes & Knowledge', short: 'Notes', icon: NotebookPen, accent: 'plum' },
  { id: 'hobbies', label: 'Hobbies & Interests', short: 'Hobbies', icon: Palette, accent: 'teal' },
  { id: 'travel', label: 'Travel Wishlist', short: 'Travel', icon: Plane, accent: 'gold' },
  { id: 'future', label: 'Future Planning', short: 'Future', icon: Compass, accent: 'plum' },
  { id: 'journey', label: 'Journey & Achievements', short: 'Journey', icon: Milestone, accent: 'gold' },
  { id: 'music', label: 'Music & Audio', short: 'Music', icon: Music4, accent: 'plum' },
  { id: 'video', label: 'Video Archive', short: 'Video', icon: Clapperboard, accent: 'teal' },
  { id: 'mood', label: 'Mood Board', short: 'Mood', icon: Images, accent: 'plum' },
]

export const accentHex = {
  teal: '#39bdac',
  gold: '#c9a96a',
  plum: '#9a6fa0',
}

export const accentGlow = {
  teal: 'shadow-glow-teal',
  gold: 'shadow-glow-gold',
  plum: 'shadow-glow-plum',
}

export const accentText = {
  teal: 'text-teal-glow',
  gold: 'text-gold-glow',
  plum: 'text-plum-glow',
}
