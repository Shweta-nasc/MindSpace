import { useState } from 'react'

/**
 * Lazy-loading image with a graphite shimmer skeleton and a soft
 * fade-in once loaded. Falls back gracefully if the network image fails.
 */
export default function SmartImage({ src, alt = '', className = '', imgClassName = '', ...rest }) {
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)

  return (
    <div className={`relative overflow-hidden bg-ink-800 ${className}`}>
      {!loaded && !failed && (
        <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-ink-700 via-ink-800 to-ink-850" />
      )}
      {failed ? (
        <div className="absolute inset-0 grid place-items-center bg-gradient-to-br from-ink-700 to-ink-850">
          <span className="font-display text-2xl text-ivory-faint/40">Mind&nbsp;Space</span>
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => setFailed(true)}
          className={`h-full w-full object-cover transition-all duration-700 ease-out ${
            loaded ? 'scale-100 opacity-100 blur-0' : 'scale-105 opacity-0 blur-md'
          } ${imgClassName}`}
          {...rest}
        />
      )}
    </div>
  )
}
