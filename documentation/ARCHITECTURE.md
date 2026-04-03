# Architecture Overview

This document provides a high-level overview of the Visual Drumset application architecture, design decisions, and how different parts of the system interact.

## Application Structure

Visual Drumset is a React + TypeScript application built with Vite. It provides a visual interface for creating, editing, and playing drum beats with synchronized audio playback and metronome functionality.

### Component Hierarchy

```
App
└── Body
    ├── VisualDisplay
    │   ├── Buttons (MuteButton, Display16thsButton, EditButton)
    │   ├── SkipLink
    │   └── BeatDisplay
    │       ├── Counts
    │       ├── ShowBeat (display mode)
    │       │   ├── Cymbals → DrumIcon
    │       │   ├── Snares → DrumIcon
    │       │   └── Kicks → DrumIcon
    │       └── EditBeat (edit mode)
    │           ├── Cymbals (edit)
    │           ├── Snares (edit)
    │           └── Kicks (edit)
    ├── Metronome
    │   ├── SkipLink
    │   └── MetronomeContent
    │       ├── ModifyTempoButton (decrease)
    │       ├── Blinker
    │       ├── Tempo
    │       └── ModifyTempoButton (increase)
    ├── BeatSelector
    │   ├── SkipLink
    │   ├── BeatSelectorSelect
    │   └── BeatSelectorActions
    │       ├── BeatSelectorArrows
    │       └── BeatSelectorApply
    └── IO
        ├── ToggleIO
        └── ContentIO
            ├── Import
            ├── Export
            └── SaveScreenshot
```

## State Management

The application uses React Context API for state management, organized into four main context providers:

### Context Provider Hierarchy

```
DrumsProvider
└── IsPlayingProvider
    └── ButtonValuesProvider
        └── SoundsProvider
            └── [Application Components]
```

`BeatPlayer` (`src/context/BeatPlayer.tsx`) is rendered inside `SoundsProvider` and receives `playSound` as a prop.

### Context Providers

1. **DrumsProvider** (`src/context/Drums.tsx`)
   - Manages drum pattern state (cymbals, snares, kicks)
   - Provides setters for updating drum patterns
   - Initializes with default beat pattern

2. **IsPlayingProvider** (`src/context/IsPlaying.tsx`)
   - Manages playback state (isRunning, bpm)
   - Tracks current position (currentBeat, currentSubdivision)
   - Provides position update function

3. **ButtonValuesProvider** (`src/context/buttonValues.tsx`)
   - **`isEditing`**: edit vs view mode; **Escape** clears edit mode
   - **`isDisplaying16ths`**: when false, the UI uses an 8-slot view (eighth-note columns); desktop can toggle full 16ths via `Display16thsButton`
   - Exposed to components through **`useButtonValues()`** (`src/hooks/useButtonValues.ts`)

4. **SoundsProvider** (`src/context/SoundsProvider.tsx`)
   - Manages Web Audio API context for drum voices
   - Handles initialization, buffer reuse, and warm-up
   - Exposes **`playSound`**, **`isMetronomeMuted`**, **`isAllMuted`**, and setters for those flags
   - Renders **BeatPlayer** so pattern hits fire in sync with `IsPlayingProvider`

## Data Flow

### Beat Data Structure

Beats are represented as nested boolean arrays:
- 4 beats per measure
- 4 subdivisions per beat (16th notes)
- Three drum types: cymbals, snares, kicks

See [BEAT_FORMAT.md](./BEAT_FORMAT.md) for detailed structure.

### State Updates

1. **Beat Selection**: User selects beat → `BeatSelector` fetches JSON → Updates `DrumsProvider` state
2. **Beat Editing**: User toggles edit mode → `ButtonValuesProvider` sets `isEditing` → Components switch to edit mode
3. **Playback**: Metronome starts → `IsPlayingProvider` tracks position → `BeatPlayer` checks drum state → `SoundsProvider` plays sounds
4. **Import/Export**: User imports/exports JSON → Validates with Zod → Updates `DrumsProvider` state

## Component Organization

### Display components (`src/components/displays/`)

- **ShowBeat**: Read-only rows for cymbals, snares, kicks
- **Cymbals, Snares, Kicks**: Grids of **`DrumIcon`** cells (click a hit to preview that voice via `playSound`)
- **DrumIcon**: PNG hit control wired to **`useSounds()`**

### Global beat UI (`src/components/globals/`)

- **VisualDisplay**: Layout, skip link, playback styling class, `hide-16ths` class from **`isDisplaying16ths`**
- **BeatDisplay**: Chooses **ShowBeat** vs **EditBeat** from **`useButtonValues().isEditing`**
- **Buttons**: **MuteButton**, **Display16thsButton** (lg screens only), **EditButton**
- **Counts**: Subdivision labels and highlighting (uses **`isDisplaying16ths`** for column layout)
- **Button**: Shared control styling for globals

### Edit Components (`src/components/edits/`)

Components for editing beat patterns:
- **EditBeat**: Container for edit components
- **Cymbals, Snares, Kicks**: Interactive checkboxes for editing patterns

### Metronome components (`src/components/metronome/`)

- **Metronome**: Region wrapper and skip link
- **MetronomeContent**: Border, flex layout, tempo controls
- **Blinker**: Timing, position updates, click sound (respects **`isMetronomeMuted`** / **`isAllMuted`**)
- **Tempo**: BPM slider and field
- **ModifyTempoButton**: Nudge BPM up or down

### File components (`src/components/files/`)

- **BeatSelector**, **BeatSelectorSelect**, **BeatSelectorActions**, **BeatSelectorArrows**, **BeatSelectorApply**
- **IO**, **ToggleIO**, **ContentIO**, **Import**, **Export**, **SaveScreenshot**, **ButtonIO**
- **Zod.tsx**: **`isBeatValid`** helper (Zod-backed)

### Shared UI

- **Icon**, **IconButton**: SVG assets under `public/icons/`; drum PNGs under **`public/icons/drumset/`**
- **SkipLink**: Keyboard-accessible skip navigation

### Layout Components

- **App**: Root component
- **Body**: Main content container with context providers
- **Footer**: Footer component

## Key Design Decisions

### 1. Context API Over Prop Drilling

**Decision**: Use React Context API for state management instead of prop drilling.

**Rationale**: 
- Multiple components need access to the same state
- Reduces prop passing complexity
- Makes state updates more predictable
- Easier to add new features that need shared state

### 2. Separate Context Providers

**Decision**: Split state into multiple context providers rather than one large context.

**Rationale**:
- Better separation of concerns
- Components only subscribe to contexts they need
- Easier to understand and maintain
- Prevents unnecessary re-renders

### 3. Custom Hooks for Context Access

**Decision**: Create custom hooks (`useDrums`, `useButtonValues`, `useIsPlaying`, `useSounds`) in **`src/hooks/`** instead of using `useContext` directly.

**Rationale**:
- Provides type safety
- Centralizes error handling (undefined context)
- Makes context usage more consistent
- Easier to refactor if context structure changes

### 4. BeatPlayer Beside SoundsProvider Children

**Decision**: Render **`BeatPlayer`** inside **`SoundsProvider`** (same module tree) and pass **`playSound`** in as a prop.

**Rationale**:
- Keeps playback scheduling next to the audio implementation
- Avoids circular imports while still using a small, testable **`BeatPlayer`** module

### 5. Zod Validation

**Decision**: Use Zod for beat data validation.

**Rationale**:
- Type-safe validation
- Clear error messages
- Reusable validation logic
- Prevents invalid data from entering the system

### 6. Web Audio API for Sound Generation

**Decision**: Generate sounds programmatically using Web Audio API instead of audio files.

**Rationale**:
- No external dependencies
- Smaller bundle size
- More control over sound characteristics
- Works offline

## File Structure

```
src/
├── components/          # React components
│   ├── displays/       # Beat rows (read-only)
│   ├── edits/          # Edit mode rows
│   ├── files/          # Beats, IO, screenshot
│   ├── globals/        # VisualDisplay, buttons, Counts, BeatDisplay
│   └── metronome/      # Metronome UI
├── context/            # Context providers + BeatPlayer
├── hooks/              # useDrums, useIsPlaying, useSounds, useButtonValues
├── types/              # TypeScript type definitions
├── index.css           # Global styles
├── main.tsx            # Application entry point
└── scripts.ts          # Utility functions
```

## Type System

The application uses TypeScript for type safety. Key types are defined in `src/types/`:

- **beat.ts**: Beat data structure types
- **counts.ts**: Count/subdivision type definitions
- **drums.ts**: Drum type union (`'cymbal' | 'snare' | 'bass'`)

## Styling Approach

- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS**: Additional styles in `index.css` for complex selectors
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Component Classes**: Components use className matching their component name

See [STYLING_GUIDE.md](./STYLING_GUIDE.md) for detailed styling information.

## Build System

- **Vite**: Fast build tool and dev server
- **TypeScript**: Type checking and compilation
- **Biome**: Linting and formatting
- **Path Aliases**: `@/` maps to `src/` for cleaner imports

## Performance Considerations

1. **Memoization**: Context values are memoized to reduce unnecessary re-renders
2. **Refs for Audio**: AudioContext and noise buffers live in refs
3. **Conditional Rendering**: Edit rows replace display rows only in edit mode
4. **Lazy Initialization**: Buffers are created during warm-up / first playback

## Future Architecture Considerations

- Consider code splitting for large components
- Evaluate state management library if complexity grows
- Consider adding unit tests for context providers
- Evaluate performance optimizations as beat library grows
