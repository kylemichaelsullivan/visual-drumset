# Architecture Overview

This document provides a high-level overview of the Visual Drumset application architecture, design decisions, and how different parts of the system interact.

## Application Structure

Visual Drumset is a React + TypeScript application built with Vite. It provides a visual interface for creating, editing, and playing drum beats with synchronized audio playback and metronome functionality.

### Component Hierarchy

```
App
└── Body
    ├── VisualDisplay
    │   ├── MuteButton
    │   ├── EditButton
    │   ├── Counts
    │   ├── ShowBeat (display mode)
    │   │   ├── Cymbals
    │   │   ├── Snares
    │   │   └── Kicks
    │   └── EditBeat (edit mode)
    │       ├── Cymbals (edit)
    │       ├── Snares (edit)
    │       └── Kicks (edit)
    ├── Metronome
    │   ├── Blinker
    │   └── Tempo
    ├── BeatSelector
    │   ├── BeatSelectorSelect
    │   ├── BeatSelectorArrows
    │   └── BeatSelectorApply
    └── IO
        ├── ToggleIO
        └── ContentIO
            ├── Import
            └── Export
```

## State Management

The application uses React Context API for state management, organized into four main context providers:

### Context Provider Hierarchy

```
DrumsProvider
└── IsPlayingProvider
    └── EditingProvider
        └── SoundsProvider
            └── [Application Components]
```

### Context Providers

1. **DrumsProvider** (`src/context/Drums.tsx`)
   - Manages drum pattern state (cymbals, snares, kicks)
   - Provides setters for updating drum patterns
   - Initializes with default beat pattern

2. **IsPlayingProvider** (`src/context/IsPlaying.tsx`)
   - Manages playback state (isRunning, bpm)
   - Tracks current position (currentBeat, currentSubdivision)
   - Provides position update function

3. **EditingProvider** (`src/context/Editing.tsx`)
   - Manages edit mode state
   - Handles Escape key to exit edit mode
   - Prevents playback while editing

4. **SoundsProvider** (`src/context/SoundsProvider.tsx`)
   - Manages Web Audio API context
   - Handles audio initialization and warm-up
   - Provides sound playback function
   - Manages mute state
   - Contains BeatPlayer component for automatic playback

## Data Flow

### Beat Data Structure

Beats are represented as nested boolean arrays:
- 4 beats per measure
- 4 subdivisions per beat (16th notes)
- Three drum types: cymbals, snares, kicks

See [BEAT_FORMAT.md](./BEAT_FORMAT.md) for detailed structure.

### State Updates

1. **Beat Selection**: User selects beat → `BeatSelector` fetches JSON → Updates `DrumsProvider` state
2. **Beat Editing**: User toggles edit mode → `EditingProvider` sets `isEditing` → Components switch to edit mode
3. **Playback**: Metronome starts → `IsPlayingProvider` tracks position → `BeatPlayer` checks drum state → `SoundsProvider` plays sounds
4. **Import/Export**: User imports/exports JSON → Validates with Zod → Updates `DrumsProvider` state

## Component Organization

### Display Components (`src/components/displays/`)

Components that render the current beat pattern:
- **VisualDisplay**: Main container, switches between display/edit modes
- **ShowBeat**: Displays current beat pattern (read-only)
- **Counts**: Shows beat numbers (1, 2, 3, 4)
- **Cymbals, Snares, Kicks**: Display drum patterns with icons
- **EditButton**: Toggles edit mode
- **MuteButton**: Toggles audio mute state
- **Icon**: Reusable icon component

### Edit Components (`src/components/edits/`)

Components for editing beat patterns:
- **EditBeat**: Container for edit components
- **Cymbals, Snares, Kicks**: Interactive checkboxes for editing patterns

### Metronome Components (`src/components/metronome/`)

Metronome functionality:
- **Metronome**: Container component
- **Blinker**: Visual indicator and timing logic
- **Tempo**: BPM control slider

### File Components (`src/components/files/`)

Beat file management:
- **BeatSelector**: Main beat selection interface
- **BeatSelectorSelect**: Dropdown for beat selection
- **BeatSelectorArrows**: Navigation arrows
- **BeatSelectorApply**: Apply button
- **IO**: Import/Export container
- **Import**: File upload component
- **Export**: JSON download component
- **Zod**: Beat validation schema

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

**Decision**: Create custom hooks (`useDrums`, `useEditing`, `useIsPlaying`, `useSounds`) instead of using `useContext` directly.

**Rationale**:
- Provides type safety
- Centralizes error handling (undefined context)
- Makes context usage more consistent
- Easier to refactor if context structure changes

### 4. BeatPlayer as Part of SoundsProvider

**Decision**: Include `BeatPlayer` component inside `SoundsProvider` rather than as a separate component.

**Rationale**:
- `BeatPlayer` needs access to `playSound` function
- Keeps audio-related logic together
- Ensures `BeatPlayer` only renders when audio is available

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
│   ├── displays/       # Display components
│   ├── edits/          # Edit components
│   ├── files/          # File I/O components
│   └── metronome/      # Metronome components
├── context/            # Context providers and hooks
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

1. **Memoization**: Context values are memoized to prevent unnecessary re-renders
2. **Refs for Audio**: AudioContext stored in refs to avoid re-creation
3. **Conditional Rendering**: Edit components only render when in edit mode
4. **Lazy Initialization**: Audio buffers initialized on first use

## Future Architecture Considerations

- Consider code splitting for large components
- Evaluate state management library if complexity grows
- Consider adding unit tests for context providers
- Evaluate performance optimizations as beat library grows
