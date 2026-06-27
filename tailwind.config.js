/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Deep charcoal / near-black backgrounds
        ink: {
          950: '#070708',
          900: '#0b0b0d',
          850: '#101013',
          800: '#15151a',
          700: '#1c1c22',
          600: '#26262e',
        },
        // Layered graphite + smoked glass surfaces
        graphite: {
          DEFAULT: '#16161b',
          light: '#1f1f26',
          smoke: 'rgba(30, 30, 38, 0.55)',
        },
        // Warm white / soft ivory text
        ivory: {
          DEFAULT: '#f5f1e8',
          soft: '#e9e4d8',
          muted: '#b7b2a6',
          faint: '#8a867c',
        },
        // Jewel teal accent
        teal: {
          glow: '#6fe3d2',
          DEFAULT: '#39bdac',
          deep: '#1f7d72',
        },
        // Muted plum
        plum: {
          glow: '#c89ccb',
          DEFAULT: '#9a6fa0',
          deep: '#5e4262',
        },
        // Metallic gold
        gold: {
          glow: '#e7cf9a',
          DEFAULT: '#c9a96a',
          deep: '#8f7642',
        },
      },
      fontFamily: {
        display: ['Fraunces', 'Playfair Display', 'Georgia', 'serif'],
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        luxe: '0.18em',
        wide2: '0.28em',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.04), 0 20px 60px -20px rgba(0,0,0,0.8)',
        'glow-teal': '0 0 40px -8px rgba(57,189,172,0.45)',
        'glow-gold': '0 0 40px -8px rgba(201,169,106,0.4)',
        'glow-plum': '0 0 40px -8px rgba(154,111,160,0.4)',
        lift: '0 30px 80px -30px rgba(0,0,0,0.9)',
      },
      backgroundImage: {
        'grain': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.5'/%3E%3C/svg%3E\")",
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s cubic-bezier(0.22,1,0.36,1) both',
        shimmer: 'shimmer 3s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'spin-slow': 'spin-slow 24s linear infinite',
      },
    },
  },
  plugins: [],
}
