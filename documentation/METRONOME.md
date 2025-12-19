# Metronome Documentation

This document describes the metronome functionality in Visual Drumset, including timing, visual feedback, and audio synchronization.

## Overview

The metronome provides visual and audio feedback to help users keep time while playing or practicing beats. It runs at an adjustable BPM (beats per minute) and divides each beat into 4 subdivisions.

## Components

### Metronome Container

The `Metronome` component (`/src/components/metronome/Metronome.tsx`) serves as the container that combines:
- `Blinker` - Visual and audio indicator
- `Tempo` - BPM control input

### Blinker Component

The `Blinker` component (`/src/components/metronome/Blinker.tsx`) is the core metronome engine that:
- Manages timing intervals
- Updates playback position
- Provides visual feedback (flashing circle)
- Generates audio beeps
- Controls start/stop state

### Tempo Component

The `Tempo` component (`/src/components/metronome/Tempo.tsx`) provides:
- BPM input field (number input)
- BPM slider control
- Visual feedback of current tempo

## Timing System

### Beat Calculation

The metronome calculates intervals based on BPM:

```typescript
const beatInterval = (60 / bpm) * 1000;  // Milliseconds per beat
const subdivisionInterval = beatInterval / 4;  // Milliseconds per subdivision
```

**Example at 120 BPM:**
- Beat interval: `(60 / 120) * 1000 = 500ms` per beat
- Subdivision interval: `500 / 4 = 125ms` per subdivision

### Position Tracking

The metronome tracks two position values:

1. **Beat**: 0-3 (which of the 4 beats in the measure)
2. **Subdivision**: 0-3 (which of the 4 subdivisions within the beat)

**Position Updates:**
- Every `subdivisionInterval` milliseconds, subdivision increments
- When subdivision reaches 4, it resets to 0 and beat increments
- When beat reaches 4, it resets to 0 (loops the measure)

```typescript
positionRef.current.subdivision++;
if (positionRef.current.subdivision >= 4) {
  positionRef.current.subdivision = 0;
  positionRef.current.beat++;
  if (positionRef.current.beat >= 4) {
    positionRef.current.beat = 0;
  }
}
```

## Visual Feedback

### Blinker Display

The blinker shows two states:

1. **Stopped**: Shows a play icon (▶)
2. **Running**: Shows a circle that flashes green on each beat

```typescript
{isRunning ? (
  <div className={`${isLit ? 'bg-green-400' : 'bg-gray-200'} rounded-full w-full h-full`} />
) : (
  <FontAwesomeIcon icon={faPlay} />
)}
```

### Flash Animation

On each beat (subdivision 0), the blinker flashes:

```typescript
const flash = useCallback(() => {
  setIsLit(true);
  setTimeout(() => {
    setIsLit(false);
  }, 100);  // Flash duration: 100ms
}, []);
```

The circle changes from gray (`bg-gray-200`) to green (`bg-green-400`) for 100ms.

## Audio Feedback

### Beep Generation

The metronome generates an 800 Hz sine wave beep on each beat:

```typescript
const beep = useCallback(() => {
  if (isMuted) return;
  
  const context = getAudioContext();
  if (context.state === 'suspended') {
    context.resume().catch(() => {});
  }
  
  const o = context.createOscillator();
  o.type = 'sine';
  o.frequency.value = 800;  // 800 Hz
  o.connect(context.destination);
  o.start();
  o.stop(context.currentTime + 0.1);  // 100ms duration
}, [getAudioContext, isMuted]);
```

### Beep Timing

- Beeps occur on **subdivision 0** of each beat
- Only the first subdivision of each beat gets a beep
- Subdivisions 1, 2, and 3 are silent

## State Management

### IsPlayingProvider Context

The metronome uses the `IsPlayingProvider` context for state:

```typescript
const {
  bpm,           // Current BPM value
  setBpm,        // Function to update BPM
  isRunning,     // Whether metronome is running
  setIsRunning,  // Function to start/stop
  setPosition,   // Function to update position
} = useIsPlaying();
```

### Position Updates

The `Blinker` component updates position via `setPosition()`:

```typescript
setPosition(positionRef.current.beat, positionRef.current.subdivision);
```

This position is used by:
- `BeatPlayer` component to trigger drum sounds
- Display components to highlight active positions
- Other components that need to know current playback position

## Start/Stop Behavior

### Starting the Metronome

When started:
1. Position resets to beat 0, subdivision 0
2. Immediate beep and flash on start
3. Interval timer begins
4. Position updates every subdivision interval

```typescript
// Reset position when starting
positionRef.current = { beat: 0, subdivision: 0 };
setPosition(0, 0);
beep();
flash();

const interval = setInterval(() => {
  // Update position and trigger beep/flash on beats
}, subdivisionInterval);
```

### Stopping the Metronome

When stopped:
1. Interval timer is cleared
2. Position resets to 0, 0
3. Visual returns to play icon
4. Audio stops

```typescript
if (!isRunning) {
  positionRef.current = { beat: 0, subdivision: 0 };
  setPosition(0, 0);
  return;
}
```

## BPM Control

### Default BPM

The metronome starts at **120 BPM**:

```typescript
const [bpm, setBpm] = useState(120);
```

### BPM Input

Users can adjust BPM via:
- **Number input**: Direct numeric entry
- **Range slider**: Visual slider control

Both are provided by the `Tempo` component and update the same `bpm` state.

### BPM Range

While there's no explicit min/max in the code, typical ranges:
- **Minimum**: ~40 BPM (very slow)
- **Maximum**: ~300 BPM (very fast)
- **Practical range**: 60-200 BPM for most use cases

### Real-time Updates

When BPM changes while metronome is running:
- Current interval is cleared
- New interval is calculated based on new BPM
- New interval timer starts immediately
- Position continues from current position (doesn't reset)

## Integration with Beat Playback

### BeatPlayer Synchronization

The `BeatPlayer` component watches metronome position:

```typescript
const { currentBeat, currentSubdivision } = useIsPlaying();

useEffect(() => {
  // Check if drums should play at this position
  if (cymbals[currentBeat]?.[currentSubdivision]) {
    playSound('cymbal');
  }
  // ... similar for snares and kicks
}, [currentBeat, currentSubdivision, cymbals, snares, kicks]);
```

### Synchronized Playback

- Metronome position drives beat playback
- Drum sounds trigger when position matches beat data
- All sounds are synchronized to the same timing source
- Visual display highlights active positions

## User Interaction

### Starting/Stopping

Click the blinker button to start/stop:

```typescript
<button
  type='button'
  onMouseDown={() => setIsRunning(() => !isRunning)}
>
```

### Editing Mode

When in editing mode (`isEditing === true`), the metronome continues to run, but:
- `BeatPlayer` does not trigger sounds (prevents audio during editing)
- Visual feedback still works
- Position tracking continues

## Visual Display Integration

### Active Position Highlighting

Display components use metronome position to highlight active beats:

- `Counts` component shows which beat/subdivision is active
- `Cymbals`, `Snares`, `Kicks` components highlight active positions
- Visual feedback helps users see where they are in the beat

### CSS Classes

When metronome is running, the `VisualDisplay` gets an `isPlaying` class:

```typescript
<div className={`VisualDisplay ... ${isPlaying ? 'isPlaying' : ''}`}>
```

This class can be used for additional styling (e.g., grayscale filter on inactive icons).

## Performance Considerations

### Interval Management

- Uses `setInterval` for timing (not `requestAnimationFrame`)
- Interval is cleared on stop or unmount
- New interval created when BPM changes

### Position Ref

Position is stored in a ref to avoid unnecessary re-renders:

```typescript
const positionRef = useRef({ beat: 0, subdivision: 0 });
```

State updates only occur when position actually changes.

## Browser Compatibility

### Timing Accuracy

- `setInterval` timing can drift slightly
- More accurate on desktop browsers
- Mobile browsers may have less precise timing
- For very high BPM, timing may become less accurate

### Audio Context

- Metronome uses same AudioContext as drum sounds
- Handles suspension/resume like main audio system
- Respects mute state

## Limitations

1. **Fixed Subdivisions**: Always 4 subdivisions per beat (cannot change to 3, 5, etc.)
2. **Fixed Time Signature**: Always 4/4 time (4 beats per measure)
3. **No Accent Beats**: All beats sound the same (no emphasis on beat 1)
4. **Timing Drift**: `setInterval` can accumulate small timing errors over time
5. **No Tap Tempo**: Cannot tap to set BPM

## Future Enhancements

Potential improvements:
- Tap tempo functionality
- Variable time signatures (3/4, 6/8, etc.)
- Accent on beat 1 (louder beep)
- Visual count-in before starting
- Subdivision options (triplets, etc.)
- More accurate timing (Web Audio API scheduling)
- Preset BPM values
- BPM history/recall
