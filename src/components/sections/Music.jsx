import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { Play, Pause, SkipBack, SkipForward, Volume2, Music4 } from 'lucide-react'
import Page from '../ui/Page'
import SectionHeader from '../ui/SectionHeader'
import SmartImage from '../ui/SmartImage'
import Reveal from '../ui/Reveal'
import { playlists, tracks } from '../../data/content'
import { accentHex } from '../../lib/sections'
import { fadeUp, stagger, ease } from '../../lib/motion'

function fmt(s) {
  if (!s || Number.isNaN(s)) return '0:00'
  const m = Math.floor(s / 60)
  const sec = Math.floor(s % 60)
  return `${m}:${sec.toString().padStart(2, '0')}`
}

export default function Music() {
  const audioRef = useRef(null)
  const [index, setIndex] = useState(0)
  const [playing, setPlaying] = useState(false)
  const [time, setTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume] = useState(0.8)

  const current = tracks[index]

  useEffect(() => {
    const a = audioRef.current
    if (!a) return
    if (playing) a.play().catch(() => setPlaying(false))
    else a.pause()
  }, [playing, index])

  useEffect(() => {
    if (audioRef.current) audioRef.current.volume = volume
  }, [volume])

  const select = (i) => {
    setIndex(i)
    setPlaying(true)
  }
  const prev = () => setIndex((i) => (i - 1 + tracks.length) % tracks.length)
  const next = () => setIndex((i) => (i + 1) % tracks.length)

  const onSeek = (e) => {
    const t = Number(e.target.value)
    setTime(t)
    if (audioRef.current) audioRef.current.currentTime = t
  }

  return (
    <Page wide>
      <SectionHeader
        eyebrow="Music & Audio"
        title="Sounds for"
        accent="every mood"
        lede="Playlists for focus, for golden hours, for midnight. A small player that stays out of the way."
      />

      {/* Playlists */}
      <motion.div
        variants={stagger(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-3"
      >
        {playlists.map((p) => (
          <motion.div
            key={p.id}
            variants={fadeUp}
            whileHover={{ y: -5 }}
            transition={{ duration: 0.35, ease }}
            className="sweep group overflow-hidden rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02]"
          >
            <div className="relative">
              <SmartImage src={p.cover} alt={p.name} className="h-40" imgClassName="transition-transform duration-[1.4s] group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-ink-900 to-transparent" />
              <span
                className="absolute bottom-3 left-4 grid h-9 w-9 place-items-center rounded-full"
                style={{ background: `${accentHex[p.accent]}30`, color: accentHex[p.accent] }}
              >
                <Music4 size={16} />
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-display text-xl text-ivory">{p.name}</h3>
              <p className="text-sm text-ivory-muted">{p.mood}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>

      {/* Player + tracklist */}
      <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_1.2fr]">
        {/* Now playing */}
        <Reveal className="card-surface flex flex-col items-center p-7 text-center">
          <div className="relative">
            <motion.div
              animate={playing ? { rotate: 360 } : { rotate: 0 }}
              transition={playing ? { duration: 16, repeat: Infinity, ease: 'linear' } : { duration: 0.4 }}
              className="h-44 w-44 overflow-hidden rounded-full border border-white/10 shadow-glow"
            >
              <SmartImage src={current.cover} alt={current.title} className="h-full w-full" />
            </motion.div>
            <span className="absolute inset-0 m-auto h-4 w-4 rounded-full bg-ink-950 ring-2 ring-white/10" />
          </div>

          <h3 className="mt-6 font-display text-2xl text-ivory">{current.title}</h3>
          <p className="text-sm text-ivory-muted">{current.artist}</p>

          {/* seek */}
          <div className="mt-5 w-full">
            <input
              type="range"
              className="media-range w-full"
              min={0}
              max={duration || 0}
              value={time}
              onChange={onSeek}
              style={{
                background: `linear-gradient(90deg, ${accentHex.gold} ${(time / (duration || 1)) * 100}%, rgba(255,255,255,0.12) ${(time / (duration || 1)) * 100}%)`,
              }}
            />
            <div className="mt-1.5 flex justify-between text-[0.7rem] tabular-nums text-ivory-faint">
              <span>{fmt(time)}</span>
              <span>{fmt(duration)}</span>
            </div>
          </div>

          {/* controls */}
          <div className="mt-4 flex items-center gap-6">
            <button onClick={prev} className="text-ivory-muted transition-colors hover:text-ivory">
              <SkipBack size={22} />
            </button>
            <button
              onClick={() => setPlaying((p) => !p)}
              className="grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-teal-glow via-gold-glow to-plum-glow text-ink-950 transition-transform hover:scale-105 active:scale-95"
            >
              {playing ? <Pause size={22} fill="currentColor" /> : <Play size={22} fill="currentColor" className="ml-0.5" />}
            </button>
            <button onClick={next} className="text-ivory-muted transition-colors hover:text-ivory">
              <SkipForward size={22} />
            </button>
          </div>

          {/* volume */}
          <div className="mt-6 flex w-full max-w-[200px] items-center gap-3">
            <Volume2 size={16} className="text-ivory-faint" />
            <input
              type="range"
              className="media-range w-full"
              min={0}
              max={1}
              step={0.01}
              value={volume}
              onChange={(e) => setVolume(Number(e.target.value))}
            />
          </div>
        </Reveal>

        {/* Track list */}
        <Reveal className="rounded-[1.5rem] border border-white/[0.07] bg-white/[0.02] p-3 sm:p-4">
          <ul>
            {tracks.map((t, i) => {
              const active = i === index
              return (
                <li key={t.id}>
                  <button
                    onClick={() => select(i)}
                    className={`group flex w-full items-center gap-4 rounded-2xl px-3 py-3 text-left transition-colors ${
                      active ? 'bg-white/[0.05]' : 'hover:bg-white/[0.03]'
                    }`}
                  >
                    <span className="relative h-12 w-12 shrink-0 overflow-hidden rounded-xl">
                      <SmartImage src={t.cover} alt={t.title} className="h-full w-full" />
                      <span className="absolute inset-0 grid place-items-center bg-ink-950/40 opacity-0 transition-opacity group-hover:opacity-100">
                        {active && playing ? <Pause size={16} className="text-ivory" /> : <Play size={16} className="text-ivory" />}
                      </span>
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className={`block truncate font-medium ${active ? 'text-gold-glow' : 'text-ivory'}`}>
                        {t.title}
                      </span>
                      <span className="block truncate text-sm text-ivory-muted">{t.artist}</span>
                    </span>
                    {active && (
                      <span className="flex items-end gap-0.5" aria-hidden>
                        {[0, 1, 2].map((b) => (
                          <motion.span
                            key={b}
                            className="w-0.5 rounded-full bg-gold-glow"
                            animate={playing ? { height: [4, 14, 6, 12, 4] } : { height: 4 }}
                            transition={playing ? { duration: 1, repeat: Infinity, delay: b * 0.15 } : {}}
                          />
                        ))}
                      </span>
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </Reveal>
      </div>

      <audio
        ref={audioRef}
        src={current.src}
        preload="metadata"
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onTimeUpdate={(e) => setTime(e.currentTarget.currentTime)}
        onEnded={next}
      />

      <p className="mt-6 text-center text-xs text-ivory-faint/70">
        Sample audio is royalty-free (SoundHelix). Swap <span className="font-mono">tracks[].src</span> with your own files.
      </p>
    </Page>
  )
}
