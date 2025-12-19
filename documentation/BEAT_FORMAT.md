# Beat Format Documentation

This document describes the beat data structure and file format used in Visual Drumset.

## Overview

Beats in Visual Drumset are represented as JSON files containing three arrays: `cymbals`, `snares`, and `kicks`. Each array represents a drum pattern with 4 beats, each containing 4 subdivisions (16th notes).

## JSON Schema

### Structure

```json
{
  "cymbals": [
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean]
  ],
  "snares": [
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean]
  ],
  "kicks": [
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean],
    [boolean, boolean, boolean, boolean]
  ]
}
```

### Example Beat File

```json
{
  "cymbals": [
    [true, false, true, false],
    [true, false, true, false],
    [true, false, true, false],
    [true, false, true, false]
  ],
  "snares": [
    [false, false, false, false],
    [true, false, false, false],
    [false, false, false, false],
    [true, false, false, false]
  ],
  "kicks": [
    [true, false, false, false],
    [false, false, false, false],
    [true, false, false, false],
    [false, false, false, false]
  ]
}
```

## Data Structure Details

### Beat Organization

- **4 Beats**: Each measure contains 4 beats (quarter notes)
- **4 Subdivisions**: Each beat is divided into 4 subdivisions (16th notes)
- **Total**: 16 positions per measure (4 beats × 4 subdivisions)

### Subdivision Notation

The subdivisions follow standard counting notation:
- Position 0: **1** (downbeat)
- Position 1: **e** (first 16th)
- Position 2: **&** (eighth note)
- Position 3: **a** (last 16th)

### Drum Types

1. **Cymbals** (`cymbals`): High-frequency percussion (hi-hat, crash, etc.)
2. **Snares** (`snares`): Snare drum hits
3. **Kicks** (`kicks`): Bass/kick drum hits

## TypeScript Types

### Count Type

```typescript
type count = [boolean, boolean, boolean, boolean];
```

A single beat with 4 subdivisions.

### Counts Type

```typescript
export type counts = [count, count, count, count];
```

Four beats making up a complete measure.

### Beat Type

```typescript
export type beat = {
  cymbals: counts;
  snares: counts;
  kicks: counts;
};
```

Complete beat structure with all three drum types.

## Validation

Beats are validated using Zod schemas defined in `src/components/files/Zod.tsx`:

```typescript
const countSchema = z.array(z.boolean()).length(4);
const countsSchema = z.array(countSchema).length(4);
```

### Validation Rules

1. Each drum type must be an array of exactly 4 elements
2. Each beat must be an array of exactly 4 booleans
3. All values must be booleans (`true` or `false`)
4. All three drum types (`cymbals`, `snares`, `kicks`) must be present

### Validation Function

```typescript
export function isBeatValid(cymbals: counts, snares: counts, kicks: counts)
```

Returns `true` if all three arrays pass validation, `false` otherwise. Displays an alert if validation fails.

## File Locations

### Predefined Beats

Predefined beats are stored in `public/beats/`:
- `beat-1.json` through `beat-42.json`
- Loaded via fetch when selected from `BeatSelector`

### User Beats

Users can:
- Import beats from JSON files via the Import component
- Export current beats to JSON via the Export component

## Creating Custom Beats

### Manual Creation

1. Create a JSON file with the structure shown above
2. Ensure all arrays have exactly 4 beats with 4 subdivisions each
3. Use `true` for hits, `false` for rests
4. Validate using the Import component (it will check the format)

### Example: Simple Backbeat

```json
{
  "cymbals": [
    [true, false, true, false],
    [true, false, true, false],
    [true, false, true, false],
    [true, false, true, false]
  ],
  "snares": [
    [false, false, false, false],
    [true, false, false, false],
    [false, false, false, false],
    [true, false, false, false]
  ],
  "kicks": [
    [true, false, false, false],
    [false, false, false, false],
    [true, false, false, false],
    [false, false, false, false]
  ]
}
```

This creates a simple backbeat pattern:
- Cymbals on every 8th note
- Snares on beats 2 and 4
- Kicks on beats 1 and 3

### Example: Shuffle Pattern

```json
{
  "cymbals": [
    [true, false, false, true],
    [false, true, false, false],
    [true, false, false, true],
    [false, true, false, false]
  ],
  "snares": [
    [false, false, false, false],
    [true, false, false, false],
    [false, false, false, false],
    [true, false, false, false]
  ],
  "kicks": [
    [true, false, false, false],
    [false, false, false, false],
    [true, false, false, false],
    [false, false, false, false]
  ]
}
```

## Reading Beat Data

### In Components

```typescript
import { useDrums } from '@/context/useDrums';

function MyComponent() {
  const { cymbals, snares, kicks } = useDrums();
  
  // Access specific beat and subdivision
  const hasCymbal = cymbals[beatIndex]?.[subdivisionIndex];
}
```

### From JSON Files

```typescript
const response = await fetch('path/to/beat.json');
const beatJSON = await response.json();
const { cymbals, snares, kicks } = beatJSON;

// Validate before using
if (isBeatValid(cymbals, snares, kicks)) {
  // Use the beat data
}
```

## Updating Beat Data

### Setting New Beats

```typescript
import { useDrums } from '@/context/useDrums';

function MyComponent() {
  const { setCymbals, setSnares, setKicks } = useDrums();
  
  // Set new beat pattern
  setCymbals(() => newCymbalsArray);
  setSnares(() => newSnaresArray);
  setKicks(() => newKicksArray);
}
```

## Common Patterns

### Empty Beat (All Rests)

```json
{
  "cymbals": [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ],
  "snares": [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ],
  "kicks": [
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false],
    [false, false, false, false]
  ]
}
```

### All Hits (Every Subdivision)

```json
{
  "cymbals": [
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true]
  ],
  "snares": [
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true]
  ],
  "kicks": [
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true],
    [true, true, true, true]
  ]
}
```

## Limitations

1. **Fixed Structure**: Currently supports only 4/4 time with 16th note subdivisions
2. **No Velocity**: All hits are binary (on/off), no velocity/volume information
3. **No Time Signatures**: Only 4/4 time is supported
4. **No Tempo Data**: Tempo is controlled separately by the metronome

## Future Enhancements

Potential additions to the beat format:
- Velocity/volume per hit
- Support for different time signatures
- Variable subdivision counts
- Swing/shuffle quantization
- Pattern variations and fills
