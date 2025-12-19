# State Management Documentation

This document describes the state management approach in Visual Drumset, including React Context usage, custom hooks, and state update patterns.

## Overview

Visual Drumset uses React Context API for state management, organized into four main context providers. This approach avoids prop drilling and provides a clean way to share state across components.

## Context Provider Hierarchy

The context providers are nested in a specific order:

```
DrumsProvider
└── IsPlayingProvider
    └── EditingProvider
        └── SoundsProvider
            └── [Application Components]
```

This nesting order is important because:
- Inner providers can access outer providers' contexts
- Components receive all contexts through the provider tree
- State updates are isolated to their respective contexts

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
import { useDrums } from '@/context/useDrums';

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
import { useIsPlaying } from '@/context/useIsPlaying';

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

### 3. EditingProvider

**Location**: `src/context/Editing.tsx`

**Purpose**: Manages edit mode state.

**State**:
- `isEditing: boolean` - Whether the application is in edit mode

**Setters**:
- `setIsEditing: Dispatch<SetStateAction<boolean>>`

**Special Features**:
- Listens for Escape key to exit edit mode
- Prevents playback while editing (checked by BeatPlayer)

**Usage**:
```typescript
import { useEditing } from '@/context/useEditing';

function MyComponent() {
  const { isEditing, setIsEditing } = useEditing();
  
  // Toggle edit mode
  setIsEditing(!isEditing);
  
  // Check if editing
  if (isEditing) {
    // Show edit UI
  }
}
```

**When to Use**:
- Toggling edit mode
- Conditionally rendering edit vs. display components
- Preventing actions during editing

### 4. SoundsProvider

**Location**: `src/context/SoundsProvider.tsx`

**Purpose**: Manages audio playback and Web Audio API.

**State**:
- `isMuted: boolean` - Whether audio is muted

**Functions**:
- `playSound: (drum: drums) => void` - Play a drum sound
- `setIsMuted: Dispatch<SetStateAction<boolean>>`

**Special Features**:
- Manages AudioContext lifecycle
- Initializes and warms up audio buffers
- Handles AudioContext suspension/resume
- Contains BeatPlayer component for automatic playback

**Usage**:
```typescript
import { useSounds } from '@/context/useSounds';

function MyComponent() {
  const { playSound, isMuted, setIsMuted } = useSounds();
  
  // Play a sound
  playSound('cymbal');
  
  // Toggle mute
  setIsMuted(!isMuted);
}
```

**When to Use**:
- Playing drum sounds programmatically
- Managing mute state
- Audio-related functionality

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

### useEditing

Similar pattern for edit mode state.

### useSounds

Similar pattern for audio state.

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
3. `EditingProvider` updates `isEditing` state
4. `VisualDisplay` conditionally renders `EditBeat` instead of `ShowBeat`
5. User toggles checkboxes in edit components
6. Edit components update `DrumsProvider` state
7. Changes are immediately reflected

### Muting Audio

1. User clicks mute button
2. `MuteButton` calls `setIsMuted(!isMuted)`
3. `SoundsProvider` updates `isMuted` state
4. `playSound` checks `isMuted` and returns early if true
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
- `EditingProvider`: Edit mode
- `SoundsProvider`: Audio

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
const { isEditing } = useEditing();
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
