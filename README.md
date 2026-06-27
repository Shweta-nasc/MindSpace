# Mind Space

A private luxury digital sanctuary — a single-page React app that organizes ideas,
code, tasks, notes, inspirations, travel dreams, media, and life's journey into one
cohesive, immersive experience. Dark, editorial, and deeply personal.

> Pinterest × a luxury editorial magazine × a premium interactive portfolio.

## Tech stack

- **React 18 + Vite 5**
- **Tailwind CSS** (custom dark luxury theme)
- **Framer Motion** — page transitions, scroll reveals, micro-interactions
- **highlight.js** — syntax-highlighted code snippets
- **lucide-react** — icons
- Canvas particle field for the entry hero
- Custom premium audio & video players

## Sections

Secret entry · Home dashboard · Ideas & Inspiration · Code & Learning ·
Tasks & Projects · Notes & Knowledge · Hobbies · Travel Wishlist · Future Planning ·
Journey & Achievements · Music & Audio · Video Archive · Mood Board.

## Run locally

```bash
npm install
npm run dev      # start the dev server (http://localhost:5173)
npm run build    # production build into dist/
npm run preview  # preview the production build
```

## The password gate

The entry screen uses a **shared-password gate**. The default passphrase is:

```
sanctuary
```

Change it in `src/data/content.js` → `profile.password`.

> ⚠️ **This is a soft gate, not real security.** The password lives in the client
> bundle, so it only keeps casual eyes out. For genuine privacy, layer Netlify's
> password protection / Basic-Auth on top (see `netlify.toml`). Do not store
> sensitive personal data here.

## Customizing content

All sample content lives in **`src/data/content.js`** — profile, ideas, code
snippets, tasks, notes, hobbies, travel, future plans, journey, playlists, tracks,
videos, and the mood board. Edit that one file to make the space yours.

Imagery uses seeded [picsum.photos](https://picsum.photos) URLs so nothing heavy is
bundled. Swap them (and the sample audio/video URLs) with your own assets when ready.

## Deploy to Netlify

The repo includes `netlify.toml` (build command `npm run build`, publish `dist`, with
an SPA redirect). Either connect the GitHub repo in the Netlify UI, or:

```bash
npm run build
npx netlify-cli deploy --prod --dir=dist
```

Built with care.
