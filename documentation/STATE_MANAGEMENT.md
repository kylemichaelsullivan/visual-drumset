# State Management Documentation

This document describes the state management approach in Visual Drumset, including React Context usage, custom hooks, and state update patterns.

## Overview

Visual Drumset uses React Context for state, with **four providers** and small **`src/hooks/`** wrappers around each context. This avoids prop drilling and keeps access type-safe.

## Context Provider Hierarchy

The context providers are nested in a specific order:

```
DrumsProvider
└── IsPlayingProvider
    └── ButtonValuesProvider
        └── SoundsProvider
            └── [Application Components]
```

Nesting matters because inner consumers may read outer contexts, and **`BeatPlayer`** (inside **`SoundsProvider`**) coordinates **`playSound`** with **`useIsPlaying`** and **`useDrums`**.

## Context Providers

### 1. DrumsProvider

**Location**: `src/context/Drums.tsx`

**Purpose**: Manages the drum pattern state (cymbals, snares, kicks).

**State**:
- `cymbals: counts` - Cymbal pattern array
- `snares: counts` - Snare pattern array
- `kicks: counts` - Kick pattern array

**Setters**:
- `setCymbals: Dispatch<SetStateAction<counts>>`
- `setSnares: Dispatch<SetStateAction<counts>>`
- `setKicks: Dispatch<SetStateAction<counts>>`

**Initial State**:
- Cymbals: Every 8th note (beat 1 & 3 of each subdivision)
- Snares: Beats 2 and 4 (backbeat)
- Kicks: Beats 1 and 3

**Usage**:
```typescript
import { useDrums } from '@/hooks/useDrums';

function MyComponent() {
  const { cymbals, snares, kicks, setCymbals, setSnares, setKicks } = useDrums();
  
  // Read state
  const hasCymbal = cymbals[0]?.[0];
  
  // Update state
  setCymbals(() => newCymbalsArray);
}
```

**When to Use**:
- Reading or displaying drum patterns
- Editing beat patterns
- Loading beats from files
- Importing/exporting beats

### 2. IsPlayingProvider

**Location**: `src/context/IsPlaying.tsx`

**Purpose**: Manages playback state and position tracking.

**State**:
- `isRunning: boolean` - Whether metronome/playback is active
- `bpm: number` - Beats per minute (default: 120)
- `currentBeat: number` - Current beat index (0-3)
- `currentSubdivision: number` - Current subdivision index (0-3)

**Setters**:
- `setIsRunning: Dispatch<SetStateAction<boolean>>`
- `setBpm: Dispatch<SetStateAction<number>>`
- `setPosition: (beat: number, subdivision: number) => void`

**Usage**:
```typescript
import { useIsPlaying } from '@/hooks/useIsPlaying';

function MyComponent() {
  const { 
    isRunning, 
    bpm, 
    currentBeat, 
    currentSubdivision,
    setIsRunning,
    setBpm,
    setPosition
  } = useIsPlaying();
  
  // Start playback
  setIsRunning(true);
  
  // Update tempo
  setBpm(140);
  
  // Update position (typically called by Blinker)
  setPosition(2, 1);
}
```

**When to Use**:
- Controlling metronome start/stop
- Adjusting tempo
- Tracking playback position
- Syncing visual indicators with playback

### 3. ButtonValuesProvider

**Location**: `src/context/buttonValues.tsx`

**Purpose**: UI mode flags shared by the beat display and **`BeatPlayer`**.

**State**:
- `isEditing: boolean` — edit mode vs read-only beat view
- `isDisplaying16ths: boolean` — when `false`, grids use 8 columns (eighth-note slots); desktop users can toggle with **`Display16thsButton`**

**Setters**:
- `setIsEditing`, `setIsDisplaying16ths`

**Behaviour**:
- **Escape** sets `isEditing` to `false`
- **`BeatPlayer`** skips firing hits while `isEditing` is true

**Usage**:
```typescript
import { useButtonValues } from '@/hooks/useButtonValues';

function MyComponent() {
  const { isEditing, setIsEditing, isDisplaying16ths, setIsDisplaying16ths } =
    useButtonValues();
}
```

### 4. SoundsProvider

**Location**: `src/context/SoundsProvider.tsx`

**Purpose**: Web Audio for drum voices, mute flags, and **`BeatPlayer`**.

**State**:
- `isMetronomeMuted: boolean` — silences only the metronome click (`Blinker`)
- `isAllMuted: boolean` — silences click and all **`playSound`** output

**API**:
- `playSound(drum: drums)` — cymbal, snare, or bass
- `setIsMetronomeMuted`, `setIsAllMuted`

**Details**:
- Lazy **`AudioContext`**, warm-up, reused noise buffers for cymbal/snare
- Renders **`BeatPlayer`** with `playSound` prop

**Usage**:
```typescript
import { useSounds } from '@/hooks/useSounds';

function MyComponent() {
  const {
    playSound,
    isMetronomeMuted,
    isAllMuted,
    setIsMetronomeMuted,
    setIsAllMuted,
  } = useSounds();
}
```

See **`MuteButton`**: single tap toggles metronome mute; double tap toggles all mute (within a short window).

## Custom Hooks

Each context has a corresponding custom hook that provides type safety and error handling:

### useDrums

```typescript
export function useDrums() {
  const context = useContext(DrumsContext);
  if (context === undefined) {
    throw new Error('useDrums must be used within a DrumsProvider');
  }
  return context;
}
```

**Benefits**:
- Type-safe context access
- Clear error message if used outside provider
- Consistent API across all contexts

### useIsPlaying

Similar pattern for playback state.

### useButtonValues

Wraps `ButtonValuesContext`; throws if used outside **`ButtonValuesProvider`**.

### useSounds

Wraps `SoundsContext`; throws if used outside **`SoundsProvider`**.

## State Update Patterns

### Functional Updates

When updating state based on previous state, use functional updates:

```typescript
// Good: Functional update
setCymbals((prev) => {
  const newCymbals = [...prev];
  newCymbals[0][0] = !newCymbals[0][0];
  return newCymbals;
});

// Also acceptable: Direct replacement
setCymbals(() => newCymbalsArray);
```

### Batch Updates

React automatically batches state updates in event handlers:

```typescript
function handleBeatLoad(beatData: beat) {
  // These are batched together
  setCymbals(() => beatData.cymbals);
  setSnares(() => beatData.snares);
  setKicks(() => beatData.kicks);
}
```

### Preventing Unnecessary Re-renders

Context values are memoized to prevent unnecessary re-renders:

```typescript
const value = useMemo(
  () => ({ cymbals, snares, kicks, setCymbals, setSnares, setKicks }),
  [cymbals, snares, kicks]
);
```

Components only re-render when the actual values change, not when the context object reference changes.

## State Flow Examples

### Loading a Beat

1. User selects beat from `BeatSelector`
2. `BeatSelector` fetches JSON file
3. Validates data with Zod
4. Updates `DrumsProvider` state:
   ```typescript
   setCymbals(() => cymbals);
   setSnares(() => snares);
   setKicks(() => kicks);
   ```
5. Display components re-render with new data

### Starting Playback

1. User clicks metronome blinker
2. `Blinker` calls `setIsRunning(true)`
3. `IsPlayingProvider` updates `isRunning` state
4. `Blinker` starts interval and calls `setPosition`
5. `BeatPlayer` (in `SoundsProvider`) reads position and drum state
6. `BeatPlayer` calls `playSound` for active hits
7. Visual display updates to show active positions

### Editing a Beat

1. User clicks edit button
2. `EditButton` calls `setIsEditing(true)`
3. `ButtonValuesProvider` updates `isEditing` state
4. `BeatDisplay` renders `EditBeat` instead of `ShowBeat`
5. User toggles checkboxes in edit components
6. Edit components update `DrumsProvider` state
7. Changes are immediately reflected

### Muting Audio

1. User clicks mute button
2. `MuteButton` updates `isMetronomeMuted` and/or `isAllMuted`
3. **`Blinker`** skips the beep when either mute flag applies
4. **`playSound`** returns early when `isAllMuted` is true
5. Visual mute indicator updates

## Best Practices

### 1. Use Custom Hooks

Always use the custom hooks instead of `useContext` directly:

```typescript
// Good
const { cymbals } = useDrums();

// Avoid
const context = useContext(DrumsContext);
```

### 2. Keep Contexts Focused

Each context should manage a single concern:
- `DrumsProvider`: Drum patterns
- `IsPlayingProvider`: Playback state
- `ButtonValuesProvider`: Edit mode and 16ths visibility
- `SoundsProvider`: Audio and mute flags

### 3. Memoize Context Values

Context values should be memoized to prevent unnecessary re-renders:

```typescript
const value = useMemo(
  () => ({ /* context value */ }),
  [/* dependencies */]
);
```

### 4. Use Functional Updates When Needed

Use functional updates when the new state depends on the previous state:

```typescript
setIsRunning((prev) => !prev);
```

### 5. Handle Undefined Context

Custom hooks handle undefined context, but if using `useContext` directly, always check:

```typescript
const context = useContext(MyContext);
if (!context) {
  throw new Error('Component must be within provider');
}
```

## Common Patterns

### Conditional Rendering Based on State

```typescript
const { isEditing } = useButtonValues();
const { isRunning } = useIsPlaying();

return (
  <>
    {isEditing ? <EditBeat /> : <ShowBeat />}
    {isRunning && <PlaybackIndicator />}
  </>
);
```

### Reading State for Display

```typescript
const { cymbals, snares, kicks } = useDrums();
const { currentBeat, currentSubdivision } = useIsPlaying();

const isActive = cymbals[currentBeat]?.[currentSubdivision];
```

### Updating State from User Input

```typescript
const { setCymbals } = useDrums();

function handleToggle(beat: number, sub: number) {
  setCymbals((prev) => {
    const newCymbals = prev.map((b, i) =>
      i === beat ? b.map((s, j) => (j === sub ? !s : s)) : b
    );
    return newCymbals as counts;
  });
}
```

## Troubleshooting

### Context is Undefined

**Error**: "useDrums must be used within a DrumsProvider"

**Solution**: Ensure the component is rendered within the provider hierarchy. Check `Body.tsx` to see the provider structure.

### State Not Updating

**Issue**: State changes but UI doesn't update

**Solution**: 
- Check that you're using the setter function correctly
- Verify the component is within the provider
- Check for memoization issues

### Unnecessary Re-renders

**Issue**: Components re-render too frequently

**Solution**:
- Ensure context values are memoized
- Check dependencies in `useMemo`
- Consider splitting contexts if needed

## Future Considerations

Potential improvements:
- Add state persistence (localStorage)
- Add undo/redo functionality
- Consider state management library if complexity grows
- Add state debugging tools
