# Component Guide

This document provides a reference guide for all components in the Visual Drumset application, organized by category.

## Component Categories

- [Display Components](#display-components)
- [Edit Components](#edit-components)
- [Metronome Components](#metronome-components)
- [File Components](#file-components)
- [Layout Components](#layout-components)

## Display Components

Components that render the current beat pattern in read-only mode.

### VisualDisplay

**Location**: `src/components/displays/VisualDisplay.tsx`

**Purpose**: Main container for the beat visualization. Switches between display and edit modes.

**Props**: None

**State Dependencies**:
- `useEditing()` - Determines if edit mode is active
- `useIsPlaying()` - Determines if playback is active (for styling)

**Children**:
- `MuteButton`
- `EditButton`
- `Counts`
- `ShowBeat` (when not editing) or `EditBeat` (when editing)

**Styling**: 
- Uses `isPlaying` class when playback is active
- Responsive layout with border and padding

### ShowBeat

**Location**: `src/components/displays/ShowBeat.tsx`

**Purpose**: Container for displaying the current beat pattern.

**Props**: None

**Children**:
- `Cymbals` (display)
- `Snares` (display)
- `Kicks` (display)

**Usage**: Rendered when `isEditing` is false.

### Counts

**Location**: `src/components/displays/Counts.tsx`

**Purpose**: Displays beat numbers (1, 2, 3, 4) above the drum patterns.

**Props**: None

**State Dependencies**:
- `useIsPlaying()` - Gets current beat for highlighting

**Features**:
- Shows beat numbers in a grid
- Highlights current beat during playback
- Responsive: hides even beats on mobile, shows all on desktop

### Cymbals (Display)

**Location**: `src/components/displays/Cymbals.tsx`

**Purpose**: Displays cymbal pattern with icons.

**Props**: None

**State Dependencies**:
- `useDrums()` - Gets cymbal pattern
- `useIsPlaying()` - Gets current position for highlighting

**Features**:
- Grid layout (8 columns on mobile, 16 on desktop)
- Shows cymbal icon where pattern has hits
- Highlights active position during playback
- Uses background classes for visual separation

### Snares (Display)

**Location**: `src/components/displays/Snares.tsx`

**Purpose**: Displays snare pattern with icons.

**Props**: Similar to Cymbals component.

### Kicks (Display)

**Location**: `src/components/displays/Kicks.tsx`

**Purpose**: Displays kick/bass pattern with icons.

**Props**: Similar to Cymbals component.

### Icon

**Location**: `src/components/displays/Icon.tsx`

**Purpose**: Reusable icon component for drum types.

**Props**:
- `icon: 'cymbal' | 'snare' | 'bass'` - Icon type
- `isActive: boolean` - Whether this position is currently playing

**Features**:
- Loads appropriate image from `public/icons/`
- Applies grayscale filter when not active (during playback)
- Removes grayscale when active

### EditButton

**Location**: `src/components/displays/EditButton.tsx`

**Purpose**: Button to toggle edit mode.

**Props**: None

**State Dependencies**:
- `useEditing()` - Gets and sets edit mode

**Features**:
- Toggles between edit and display modes
- Shows appropriate icon (edit/view)
- Accessible button with title attribute

### MuteButton

**Location**: `src/components/displays/MuteButton.tsx`

**Purpose**: Button to toggle audio mute state.

**Props**: None

**State Dependencies**:
- `useSounds()` - Gets and sets mute state

**Features**:
- Toggles mute on/off
- Shows mute/unmute icon
- Accessible button with title attribute

## Edit Components

Components for editing beat patterns interactively.

### EditBeat

**Location**: `src/components/edits/EditBeat.tsx`

**Purpose**: Container for edit mode components.

**Props**: None

**Children**:
- `Cymbals` (edit)
- `Snares` (edit)
- `Kicks` (edit)

**Usage**: Rendered when `isEditing` is true.

### Cymbals (Edit)

**Location**: `src/components/edits/Cymbals.tsx`

**Purpose**: Interactive checkboxes for editing cymbal pattern.

**Props**: None

**State Dependencies**:
- `useDrums()` - Gets and sets cymbal pattern

**Features**:
- Checkbox grid matching beat structure
- Updates state on toggle
- Visual feedback for checked/unchecked states

### Snares (Edit)

**Location**: `src/components/edits/Snares.tsx`

**Purpose**: Interactive checkboxes for editing snare pattern.

**Props**: Similar to Cymbals (edit) component.

### Kicks (Edit)

**Location**: `src/components/edits/Kicks.tsx`

**Purpose**: Interactive checkboxes for editing kick pattern.

**Props**: Similar to Cymbals (edit) component.

## Metronome Components

Components for metronome functionality.

### Metronome

**Location**: `src/components/metronome/Metronome.tsx`

**Purpose**: Container for metronome controls.

**Props**: None

**State Dependencies**:
- `useIsPlaying()` - Gets and sets BPM and running state

**Children**:
- `Blinker`
- `Tempo`

**Layout**: Flex container, responsive (column on mobile, row on desktop).

### Blinker

**Location**: `src/components/metronome/Blinker.tsx`

**Purpose**: Visual metronome indicator and timing controller.

**Props**:
- `bpm: number` - Beats per minute
- `isRunning: boolean` - Whether metronome is running
- `setIsRunning: (value: boolean) => void` - Function to set running state
- `setPosition: (beat: number, subdivision: number) => void` - Function to update playback position

**Features**:
- Circular button that flashes green when active
- Plays beep sound on each beat
- Manages timing intervals
- Updates playback position
- Handles AudioContext for beep sound
- Cleans up intervals on unmount

**Timing Logic**:
- Calculates beat interval: `(60 / bpm) * 1000` ms
- Subdivision interval: `beatInterval / 4`
- Updates position every subdivision
- Resets to beat 0, subdivision 0 when starting

### Tempo

**Location**: `src/components/metronome/Tempo.tsx`

**Purpose**: BPM control slider and input.

**Props**:
- `bpm: number` - Current BPM value
- `setBpm: (value: number) => void` - Function to set BPM

**Features**:
- Range slider (40-300 BPM, step 5)
- Number input for precise control
- Visual progress indicator on slider
- Synchronized values between slider and input

## File Components

Components for beat file management (selection, import, export).

### BeatSelector

**Location**: `src/components/files/BeatSelector.tsx`

**Purpose**: Main interface for selecting and loading beats.

**Props**: None

**State Dependencies**:
- `useDrums()` - Sets drum patterns when beat is loaded

**Features**:
- Dropdown with 42 predefined beats
- "Random" option for random beat selection
- Navigation arrows for quick selection
- Apply button to load selected beat
- Validates beat data with Zod before loading

**Beat Loading**:
- Fetches JSON from `public/beats/`
- Validates structure
- Updates all three drum patterns
- Handles errors gracefully

### BeatSelectorSelect

**Location**: `src/components/files/BeatSelectorSelect.tsx`

**Purpose**: Dropdown select for beat selection.

**Props**:
- `selectedBeat: string` - Currently selected beat filename
- `beats: BeatSelect[]` - Array of available beats
- `handleBeatChange: (e: ChangeEvent) => void` - Change handler

**Features**:
- Native select dropdown
- Shows beat numbers (Beat 1, Beat 2, etc.)
- Includes "Random" option

### BeatSelectorArrows

**Location**: `src/components/files/BeatSelectorArrows.tsx`

**Purpose**: Left/right arrows for navigating beats.

**Props**:
- `handleBeatArrow: (direction: 'L' | 'R') => void` - Arrow click handler

**Features**:
- Previous/next navigation
- Wraps around (first ↔ last)
- FontAwesome icons

### BeatSelectorApply

**Location**: `src/components/files/BeatSelectorApply.tsx`

**Purpose**: Button to apply/load selected beat.

**Props**:
- `applyBeat: () => void` - Function to load beat

**Features**:
- Triggers beat loading
- Handles random beat selection
- FontAwesome check icon

### IO

**Location**: `src/components/files/IO.tsx`

**Purpose**: Container for import/export functionality.

**Props**: None

**State**: 
- `isOpen: boolean` - Whether import/export panel is open

**Children**:
- `ToggleIO`
- `ContentIO`

**Features**:
- Collapsible panel
- Toggle button to show/hide

### ToggleIO

**Location**: `src/components/files/ToggleIO.tsx`

**Purpose**: Button to toggle import/export panel.

**Props**:
- `isOpen: boolean` - Current open state
- `handleToggle: () => void` - Toggle function

**Features**:
- Shows/hides import/export controls
- Visual indicator of state

### ContentIO

**Location**: `src/components/files/ContentIO.tsx`

**Purpose**: Container for import and export components.

**Props**:
- `isOpen: boolean` - Whether to show content

**Children**:
- `Import`
- `Export`

**Features**:
- Conditionally renders based on `isOpen`
- Responsive layout

### Import

**Location**: `src/components/files/Import.tsx`

**Purpose**: File upload component for importing beats.

**Props**: None

**State Dependencies**:
- `useDrums()` - Sets drum patterns after import

**Features**:
- File input (accepts `.json` files)
- FileReader API for reading file contents
- Validates imported data with Zod
- Updates all drum patterns on successful import
- Shows alert on validation failure
- Clears file input after import

### Export

**Location**: `src/components/files/Export.tsx`

**Purpose**: Component for exporting current beat to JSON.

**Props**: None

**State Dependencies**:
- `useDrums()` - Gets current drum patterns

**Features**:
- Creates JSON from current beat data
- Generates data URI for download
- Triggers browser download
- Default filename: `beat.json`
- Shows success alert

### Zod

**Location**: `src/components/files/Zod.tsx`

**Purpose**: Beat validation using Zod schema.

**Exports**:
- `isBeatValid(cymbals, snares, kicks): boolean` - Validates beat structure

**Validation Rules**:
- Each drum type must be array of 4 beats
- Each beat must be array of 4 booleans
- All three drum types must be present

**Usage**: Used by `BeatSelector` and `Import` components.

### ButtonIO

**Location**: `src/components/files/ButtonIO.tsx`

**Purpose**: Reusable button component for IO actions.

**Props**:
- `action: string` - Action type (for styling/accessibility)
- `icon: IconDefinition` - FontAwesome icon
- `onMouseDown: () => void` - Click handler

**Features**:
- Consistent button styling
- FontAwesome icon support
- Accessible button element

## Layout Components

Top-level components for application structure.

### App

**Location**: `src/components/App.tsx`

**Purpose**: Root application component.

**Props**: None

**Children**:
- `Body`
- `Footer`

**Layout**: Flex column container.

### Body

**Location**: `src/components/Body.tsx`

**Purpose**: Main content container with context providers.

**Props**: None

**Context Providers** (nested):
- `DrumsProvider`
- `IsPlayingProvider`
- `EditingProvider`
- `SoundsProvider`

**Children**:
- `VisualDisplay`
- `Metronome`
- `BeatSelector`
- `IO`

**Layout**: Flex column, centered, max-width container, responsive padding.

### Footer

**Location**: `src/components/Footer.tsx`

**Purpose**: Footer component (if present).

**Props**: Check component file for details.

## Component Patterns

### State Access Pattern

Most components follow this pattern:

```typescript
import { useDrums } from '@/context/useDrums';

function MyComponent() {
  const { cymbals, setCymbals } = useDrums();
  // Use state...
}
```

### Conditional Rendering Pattern

```typescript
const { isEditing } = useEditing();

return (
  <>
    {isEditing ? <EditComponent /> : <DisplayComponent />}
  </>
);
```

### Event Handler Pattern

```typescript
function handleAction() {
  // Perform action
  setState(newValue);
}

return <button onMouseDown={handleAction}>Action</button>;
```

## Component Dependencies

### Context Dependencies

- **DrumsProvider**: Used by display, edit, and file components
- **IsPlayingProvider**: Used by display and metronome components
- **EditingProvider**: Used by display and edit components
- **SoundsProvider**: Used by display and metronome components

### Utility Dependencies

- **scripts.ts**: Utility functions for styling and calculations
- **FontAwesome**: Icons for buttons and UI elements

## Styling Conventions

- Components use className matching component name (e.g., `.Cymbals`, `.Metronome`)
- Tailwind CSS for utility classes
- Custom CSS in `index.css` for complex selectors
- Responsive design with Tailwind breakpoints

See [STYLING_GUIDE.md](./STYLING_GUIDE.md) for detailed styling information.
