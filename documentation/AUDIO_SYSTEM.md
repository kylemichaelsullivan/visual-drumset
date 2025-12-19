# Audio System Documentation

This document describes the audio playback system in Visual Drumset, which uses the Web Audio API to generate and play drum sounds programmatically.

## Overview

Visual Drumset generates all sounds programmatically using the Web Audio API. This approach eliminates the need for audio files, resulting in a smaller bundle size and more control over sound characteristics.

## Architecture

### SoundsProvider

The audio system is managed by the `SoundsProvider` component (`src/context/SoundsProvider.tsx`), which:

1. Creates and manages the AudioContext
2. Generates audio buffers for drum sounds
3. Provides the `playSound` function to components
4. Manages mute state
5. Contains the `BeatPlayer` component for automatic playback

### AudioContext Management

The AudioContext is created lazily and stored in a ref:

```typescript
const audioContextRef = useRef<AudioContext | null>(null);

const getAudioContext = useCallback(() => {
  if (!audioContextRef.current) {
    audioContextRef.current = new AudioContext();
  }
  return audioContextRef.current;
}, []);
```

**Why use a ref?**
- Prevents re-creation on every render
- Maintains the same AudioContext instance
- Allows cleanup on unmount

## Sound Generation

### Drum Sounds

Drum sounds are generated using noise buffers with filtering:

#### Cymbal

- **Type**: White noise with high-pass filter
- **Duration**: 0.05 seconds
- **Filter**: High-pass at 8000 Hz
- **Characteristic**: Bright, sharp attack

```typescript
const buffer = createNoiseBuffer(0.05, ctx);
playNoise(buffer, 8000, ctx); // High frequency filter
```

#### Snare

- **Type**: White noise with high-pass filter
- **Duration**: 0.08 seconds
- **Filter**: High-pass at 850 Hz
- **Characteristic**: Mid-range crack

```typescript
const buffer = createNoiseBuffer(0.08, ctx);
playNoise(buffer, 850, ctx); // Lower frequency filter
```

#### Kick/Bass

- **Type**: Sine wave oscillator
- **Frequency**: 110 Hz (A2)
- **Envelope**: Exponential decay over 0.2 seconds
- **Characteristic**: Deep, punchy low-end

```typescript
const o = ctx.createOscillator();
o.type = 'sine';
o.frequency.value = 110;
// Gain envelope for decay
g.gain.setValueAtTime(1, ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);
```

### Noise Buffer Creation

Noise buffers are created by generating random values:

```typescript
function createNoiseBuffer(duration: number, ctx: AudioContext): AudioBuffer {
  const buf = ctx.createBuffer(1, ctx.sampleRate * duration, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) {
    data[i] = Math.random() * 2 - 1; // Random values between -1 and 1
  }
  return buf;
}
```

### Playing Noise

Noise is played through a high-pass filter:

```typescript
function playNoise(
  buffer: AudioBuffer,
  filterFreq: number,
  ctx: AudioContext
): void {
  const src = ctx.createBufferSource();
  src.buffer = buffer;
  const filter = ctx.createBiquadFilter();
  filter.type = 'highpass';
  filter.frequency.value = filterFreq;
  src.connect(filter);
  filter.connect(ctx.destination);
  src.start();
}
```

## Metronome Sound

The metronome uses a simple sine wave oscillator (`src/components/metronome/Blinker.tsx`):

```typescript
const o = context.createOscillator();
o.type = 'sine';
o.frequency.value = 800; // 800 Hz beep
o.connect(context.destination);
o.start();
o.stop(context.currentTime + 0.1); // 100ms duration
```

**Characteristics**:
- Frequency: 800 Hz
- Duration: 0.1 seconds
- Type: Sine wave
- Purpose: Clear, audible click for timing

## Audio Initialization

### Warm-up Process

The audio system goes through a warm-up process on mount:

1. **Delay**: 150ms delay to let the page settle
2. **Context Resume**: Attempts to resume AudioContext if suspended
3. **Buffer Initialization**: Creates noise buffers for cymbal and snare
4. **Pipeline Warm-up**: Plays very short sounds through each audio path
5. **Ready Flag**: Sets `isReadyRef.current = true` after warm-up

**Why warm-up?**
- Some browsers have latency on first audio playback
- Warming up the audio pipeline reduces initial delay
- Ensures AudioContext is ready for user interaction

### Suspension Handling

Browsers suspend AudioContext until user interaction. The system handles this:

```typescript
if (ctx.state === 'suspended') {
  ctx.resume()
    .then(() => {
      playSoundInternal(drum, ctx);
    })
    .catch(() => {
      // Silently fail if resume fails
    });
  return;
}
```

**Behavior**:
- Attempts to resume suspended context
- Fails silently if resume is not possible (no user interaction yet)
- Will work once user interacts with the page

## BeatPlayer Component

The `BeatPlayer` component (`src/context/BeatPlayer.tsx`) automatically plays sounds based on the current playback position:

### How It Works

1. **Position Tracking**: Monitors `currentBeat` and `currentSubdivision` from `IsPlayingProvider`
2. **State Reading**: Reads drum patterns from `DrumsProvider`
3. **Hit Detection**: Checks if there's a hit at the current position
4. **Sound Playback**: Calls `playSound` for each active drum

### Implementation

```typescript
useEffect(() => {
  if (!isRunning || isEditing) return;
  
  const position = { beat: currentBeat, subdivision: currentSubdivision };
  
  // Check each drum type
  if (cymbals[position.beat]?.[position.subdivision]) {
    playSound('cymbal');
  }
  if (snares[position.beat]?.[position.subdivision]) {
    playSound('snare');
  }
  if (kicks[position.beat]?.[position.subdivision]) {
    playSound('bass');
  }
}, [isRunning, isEditing, currentBeat, currentSubdivision, cymbals, snares, kicks, playSound]);
```

### Position Change Detection

The component tracks previous position to avoid duplicate playback:

```typescript
const prevPositionRef = useRef<{ beat: number; subdivision: number } | null>(null);

// Skip if position hasn't actually changed
if (
  prevPositionRef.current &&
  prevPositionRef.current.beat === position.beat &&
  prevPositionRef.current.subdivision === position.subdivision
) {
  return;
}
```

## Mute Functionality

Audio can be muted via the `MuteButton` component:

```typescript
const [isMuted, setIsMuted] = useState<boolean>(false);

const playSound = useCallback((drum: drums) => {
  if (isMuted) return; // Early return if muted
  // ... play sound
}, [isMuted, ...]);
```

**Behavior**:
- Mute state is stored in `SoundsProvider`
- `playSound` checks mute state before playing
- Applies to both drum sounds and metronome beep
- Visual indicator shows mute state

## Simultaneous Playback

The system supports simultaneous playback of multiple sounds:

- Each call to `playSound` creates independent audio nodes
- Multiple sounds can play at the same time
- No mixing or limiting - all sounds play at full volume

**Example**: If cymbal, snare, and kick all hit at the same position, all three sounds play simultaneously.

## Performance Considerations

### Buffer Reuse

Noise buffers are created once and reused:

```typescript
const noiseBuffersRef = useRef<NoiseBuffers>({
  cymbal: null,
  snare: null,
});

// Initialize once
if (!noiseBuffersRef.current.cymbal) {
  noiseBuffersRef.current.cymbal = createNoiseBuffer(0.05, ctx);
}
```

**Benefits**:
- Reduces CPU usage
- Consistent sound characteristics
- Faster playback (no buffer creation delay)

### Audio Node Cleanup

Audio nodes are automatically cleaned up by the browser when they finish playing. No manual cleanup is needed for:
- Oscillators (stop automatically)
- Buffer sources (finish when buffer ends)
- Gain nodes (garbage collected)

### Context Cleanup

AudioContext is cleaned up on unmount:

```typescript
useEffect(() => {
  return () => {
    if (audioContextRef.current) {
      audioContextRef.current.close().catch(() => {
        // Silently handle cleanup errors
      });
      audioContextRef.current = null;
    }
  };
}, []);
```

## Browser Compatibility

### Web Audio API Support

The Web Audio API is supported in:
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (iOS 6+)
- Opera: Full support

### Known Issues

1. **iOS Safari**: Requires user interaction before audio can play
2. **Chrome Autoplay Policy**: AudioContext starts suspended until user interaction
3. **Firefox**: May have slight latency on first sound

### Fallback Behavior

The system handles errors gracefully:
- Silently catches audio errors
- Attempts to resume suspended contexts
- Fails gracefully if audio is not available

## Timing and Synchronization

### Timing Source

The metronome (`Blinker` component) is the timing source:
- Uses `setInterval` for timing
- Calculates interval based on BPM: `(60 / bpm) * 1000` ms per beat
- Subdivision interval: `beatInterval / 4`

### Synchronization

- `Blinker` updates position via `setPosition`
- `BeatPlayer` reacts to position changes
- Sounds play when position matches a hit

**Potential Issues**:
- `setInterval` is not perfectly accurate
- Browser throttling can affect timing
- Audio latency can cause slight delays

**Mitigation**:
- Short buffer durations reduce latency
- Warm-up process helps reduce initial delay
- Browser handles audio scheduling

## Future Enhancements

Potential improvements:
- **Velocity/Volume Control**: Add gain control per hit
- **Sound Customization**: Allow users to adjust filter frequencies
- **Audio Effects**: Add reverb, delay, or compression
- **Sample Support**: Option to use audio samples instead of generated sounds
- **Better Timing**: Use Web Audio API scheduling for more accurate timing
- **Polyphonic Limiting**: Prevent audio clipping with many simultaneous sounds
