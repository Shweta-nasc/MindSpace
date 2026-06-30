/**
 * Three large, heavily-blurred floating blobs colored from the theme.
 * Pure CSS transform animation — cheap and GPU-accelerated.
 */
const POS = [
  { className: 'left-[-8%] top-[6%] h-[42vw] w-[42vw]', anim: 'blob-float-1 28s', dur: '28s' },
  { className: 'right-[-10%] top-[18%] h-[38vw] w-[38vw]', anim: 'blob-float-2 34s', dur: '34s' },
  { className: 'left-[28%] bottom-[-14%] h-[46vw] w-[46vw]', anim: 'blob-float-3 40s', dur: '40s' },
]

export default function Blobs({ theme }) {
  return (
    <div className="absolute inset-0 overflow-hidden">
      {POS.map((p, i) => (
        <div
          key={i}
          className={`gpu absolute rounded-full ${p.className}`}
          style={{
            background: `radial-gradient(circle, ${theme.blobs[i % theme.blobs.length]}, transparent 68%)`,
            filter: 'blur(60px)',
            animation: `${p.anim} ease-in-out infinite`,
          }}
        />
      ))}
    </div>
  )
}
