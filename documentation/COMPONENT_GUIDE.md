# Component Guide

Reference for React components in Visual Drumset. Hooks live in **`src/hooks/`** (`useDrums`, `useIsPlaying`, `useSounds`, `useButtonValues`).

## Layout

### App

**`src/components/App.tsx`** — Root flex column with **Body** and **Footer**.

### Body

**`src/components/Body.tsx`** — Nests providers:

`DrumsProvider` → `IsPlayingProvider` → `ButtonValuesProvider` → `SoundsProvider`

Renders **VisualDisplay**, **Metronome**, **BeatSelector**, **IO**.

### Footer

**`src/components/Footer.tsx`** — Footer content.

### SkipLink

**`src/components/SkipLink.tsx`** — Skip-navigation control (used under beat display, metronome, beat selector).

## Globals (beat chrome)

### VisualDisplay

**`src/components/globals/VisualDisplay.tsx`** — Outer frame: **Buttons**, **SkipLink**, **BeatDisplay**. Applies `isPlaying` and `hide-16ths` classes from **`useIsPlaying`** / **`useButtonValues`**.

### BeatDisplay

**`src/components/globals/BeatDisplay.tsx`** — If **`useButtonValues().isEditing`**: **EditBeat**; else **ShowBeat**.

### Buttons

**`src/components/globals/Buttons.tsx`** — Row: **MuteButton**, **Display16thsButton**, **EditButton**.

### Button

**`src/components/globals/Button.tsx`** — Shared styled control for globals (icon + title).

### MuteButton

**`src/components/globals/MuteButton.tsx`** — Pointer timing: **single tap** toggles **`isMetronomeMuted`**; **double tap** toggles **`isAllMuted`** (see tooltips in UI).

### Display16thsButton

**`src/components/globals/Display16thsButton.tsx`** — **`hidden sm:block`**: toggles **`isDisplaying16ths`** (8 vs 16 columns on wide viewports).

### EditButton

**`src/components/globals/EditButton.tsx`** — Toggles **`isEditing`** via **`useButtonValues`**.

### Counts

**`src/components/globals/Counts.tsx`** — Subdivision labels; grid follows **`isDisplaying16ths`**.

## Display rows (`src/components/displays/`)

### ShowBeat

Wraps cymbal, snare, kick **display** rows.

### Cymbals / Snares / Kicks

Read-only grids; each hit cell is a **DrumIcon**. Layout uses `grid-cols-8` or `grid-cols-8 sm:grid-cols-16` based on **`isDisplaying16ths`**.

### DrumIcon

**`src/components/displays/DrumIcon.tsx`** — **`IconButton`** with PNG from **`/icons/drumset/`**; **click** calls **`playSound(icon)`**.

## Edit rows (`src/components/edits/`)

### EditBeat

Container for edit **Cymbals**, **Snares**, **Kicks** checkbox grids.

### Cymbals / Snares / Kicks (edits)

Checkbox grids updating **`useDrums`** setters.

## Metronome (`src/components/metronome/`)

### Metronome

Skip link + **MetronomeContent** wrapper.

### MetronomeContent

Bordered flex row/column: **ModifyTempoButton** (−), **Blinker**, **Tempo**, **ModifyTempoButton** (+). Reads **`useIsPlaying`**.

### Blinker

Timing interval, **`setPosition`**, flash UI, metronome beep (respects **`useSounds`** mute flags).

### Tempo

BPM slider and number input.

### ModifyTempoButton

Nudges BPM using **`useIsPlaying`**.

## Files (`src/components/files/`)

### BeatSelector

Fetches **`/beats/*.json`**, validates with **`isBeatValid`**, updates drums. **SkipLink** to IO.

### BeatSelectorSelect

`<select>` of Beat 1–42 plus **Random**.

### BeatSelectorActions

**BeatSelectorArrows** + **BeatSelectorApply**.

### BeatSelectorArrows

Previous, random (dice), next — calls handler with **`L` | `R` | `random`**.

### BeatSelectorApply

Loads the currently selected beat from the dropdown.

### IO / ToggleIO / ContentIO

Collapsible import/export/screenshot region.

### Import / Export

JSON file pick and download (`beat.json`).

### SaveScreenshot

Captures **`.BeatDisplay`** with **html2canvas** (clone styling for hide-16ths / icons).

### ButtonIO

Icon button used by IO actions.

### Zod

**`isBeatValid(cymbals, snares, kicks)`** using Zod **`counts`** shape.

## Shared

### Icon

**`src/components/Icon.tsx`** — PNG under **`/icons/drumset/`** or SVG under **`/icons/`** per **`filetype`**.

### IconButton

**`src/components/IconButton.tsx`** — Clickable icon control (SVG UI icons and drum hits).

## Patterns

- Prefer **`@/hooks/...`** for context access.
- Component name is usually the first class on the root element for CSS scoping.
- Many interactive controls use **`onMouseDown`** or **`onPointerDown`** (see **MuteButton**, **Button**).

See [STYLING_GUIDE.md](./STYLING_GUIDE.md) and [ARCHITECTURE.md](./ARCHITECTURE.md).
