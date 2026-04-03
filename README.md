# Visual Drumset

Visual Drumset is a browser-based practice tool for **four-on-the-floor style drum patterns**. You can load and edit 16th-note grids for cymbals, snares, and kicks, run a metronome with visual highlighting, import and export beats as JSON, and save a screenshot of the beat display.

## Features

- **Visual grid** for one measure (4 beats × 4 sixteenth-note slots per drum voice)
- **Metronome** with adjustable BPM, subdivision timing, and optional mute for the click only or for all audio
- **42 built-in beats** in `public/beats/`, plus random selection
- **Edit mode** with checkboxes; **Escape** exits edit mode
- **Import / export** of beat JSON validated with [Zod](https://zod.dev/)
- **Save screenshot** of the beat area (uses [html2canvas](https://html2canvas.hertzen.com/))
- **Web Audio** synthesised drums (no sample files for kit voices)

## Stack

- [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite 5](https://vitejs.dev/) with [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react)
- [Tailwind CSS v4](https://tailwindcss.com/) via [@tailwindcss/vite](https://tailwindcss.com/docs/installation/using-vite)
- [Biome](https://biomejs.dev/) for lint and format
- State: React Context + hooks under `src/context/` and `src/hooks/`

## Quick start

Prerequisites: [Node.js](https://nodejs.org/) 18+ (or [Bun](https://bun.sh/) if you use it locally).

```bash
git clone <repository-url>
cd visual-drumset
npm install   # or: bun install
npm run dev   # or: bun dev
```

Then open the URL shown in the terminal (default [http://localhost:5173](http://localhost:5173)).

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server with HMR |
| `npm run build` | `tsc -b` then production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run lint` | `biome check .` |
| `npm run lint:fix` | Biome check with write |
| `npm run format` | Biome format |
| `npm run check` | Same as `lint` |
| `npm run check:write` | Lint + format with fixes |

## Documentation

Project docs live in [`documentation/`](documentation/):

| Doc | Purpose |
|-----|---------|
| [ARCHITECTURE.md](documentation/ARCHITECTURE.md) | App structure, providers, data flow |
| [STATE_MANAGEMENT.md](documentation/STATE_MANAGEMENT.md) | Contexts and hooks |
| [COMPONENT_GUIDE.md](documentation/COMPONENT_GUIDE.md) | Component inventory |
| [USER_GUIDE.md](documentation/USER_GUIDE.md) | How to use the app |
| [AUDIO_SYSTEM.md](documentation/AUDIO_SYSTEM.md) | Web Audio behaviour |
| [METRONOME.md](documentation/METRONOME.md) | Timing and metronome UI |
| [BEAT_FORMAT.md](documentation/BEAT_FORMAT.md) | JSON beat schema |
| [STYLING_GUIDE.md](documentation/STYLING_GUIDE.md) | CSS and Tailwind patterns |
| [DEVELOPMENT_SETUP.md](documentation/DEVELOPMENT_SETUP.md) | Tooling and workflow |
| [GIT_COMMITS.md](documentation/GIT_COMMITS.md) | Commit message convention |

## Licence / project

Private package (`"private": true` in `package.json`). See repository settings for licence and contribution policy.
