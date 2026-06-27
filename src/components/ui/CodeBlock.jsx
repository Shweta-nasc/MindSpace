import { useEffect, useRef, useState } from 'react'
import { Copy, Check } from 'lucide-react'
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import css from 'highlight.js/lib/languages/css'
import python from 'highlight.js/lib/languages/python'
import sql from 'highlight.js/lib/languages/sql'

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('css', css)
hljs.registerLanguage('python', python)
hljs.registerLanguage('sql', sql)

/**
 * Editor-styled code block with a faux window chrome, language badge,
 * syntax highlighting, and copy-to-clipboard.
 */
export default function CodeBlock({ code, language = 'javascript', title }) {
  const ref = useRef(null)
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (ref.current) {
      ref.current.removeAttribute('data-highlighted')
      hljs.highlightElement(ref.current)
    }
  }, [code, language])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard blocked */
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#0c0c0f]">
      <div className="flex items-center justify-between border-b border-white/[0.06] bg-white/[0.02] px-4 py-2.5">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" />
          </span>
          {title && <span className="ml-2 text-xs text-ivory-faint">{title}</span>}
        </div>
        <div className="flex items-center gap-3">
          <span className="rounded-md bg-white/[0.05] px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-wide text-ivory-muted">
            {language}
          </span>
          <button
            onClick={copy}
            className="inline-flex items-center gap-1.5 text-xs text-ivory-faint transition-colors hover:text-ivory"
          >
            {copied ? <Check size={13} className="text-teal-glow" /> : <Copy size={13} />}
            {copied ? 'Copied' : 'Copy'}
          </button>
        </div>
      </div>
      <pre className="overflow-x-auto p-4 sm:p-5">
        <code ref={ref} className={`language-${language} hljs`}>
          {code}
        </code>
      </pre>
    </div>
  )
}
