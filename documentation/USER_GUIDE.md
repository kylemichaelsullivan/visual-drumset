# User Guide

This guide explains how to use the Visual Drumset application to view, play, edit, and manage drum beats.

## Getting Started

### First Launch

1. Open the application in your web browser
2. You'll see the default beat pattern loaded
3. The interface shows:
   - Visual beat display (top)
   - Metronome controls (middle)
   - Beat selector (below metronome)
   - Import/Export controls (bottom)

### Browser Requirements

- Modern browser with Web Audio API support
- Chrome, Firefox, Safari, or Edge (latest versions)
- JavaScript enabled

## Understanding the Interface

### Visual Display

The main display shows the current beat pattern:

- **Beat Numbers**: Shows subdivisions `1 e & a 2 e & a 3 e & a 4 e & a` (shows as `1 & 2 & 3 & 4 &` on mobile)
- **Cymbals**: Top row with cymbal icons
- **Snares**: Middle row with snare icons
- **Kicks**: Bottom row with kick icons

**During Playback**:
- Active position is highlighted
- Icons turn from grayscale to color when active
- Position moves from left to right, top to bottom

### Controls

- **Mute Button**: Toggles audio on/off (top right)
- **Edit Button**: Switches between view and edit modes (top right)
- **Metronome Blinker**: Start/stop playback (green circle when active)
- **Tempo Slider**: Adjust beats per minute (40-300 BPM)
- **Beat Selector**: Choose from 42 predefined beats or random

## Basic Operations

### Playing a Beat

1. **Select a Beat**:
   - Use the dropdown to choose a beat (Beat 1 through Beat 42)
   - Or click "Random" for a random beat
   - Click the checkmark button to load the beat

2. **Start Playback**:
   - Click the metronome blinker (play button)
   - The blinker turns green and flashes on each beat
   - You'll hear a beep on each beat
   - Drum sounds play according to the pattern

3. **Adjust Tempo**:
   - Drag the tempo slider left/right
   - Or type a number in the tempo input (40-300)
   - Changes take effect immediately

4. **Stop Playback**:
   - Click the metronome blinker again
   - Playback stops and position resets

### Viewing Beats

- **Beat Display**: Shows all hits as icons
- **Active Position**: Highlighted during playback
- **Beat Numbers**: Shows which beat you're on (1, 2, 3, 4)

**Mobile View**:
- Shows all 4 beats but only the downbeat (1) and eighth note (&) subdivisions: `1 & 2 & 3 & 4 &`
- Desktop shows all 16 subdivisions: `1 e & a 2 e & a 3 e & a 4 e & a`

### Editing Beats

1. **Enter Edit Mode**:
   - Click the Edit button (pencil icon)
   - The display switches to edit mode with checkboxes

2. **Modify the Pattern**:
   - Click checkboxes to add/remove hits
   - Each checkbox represents one 16th note position
   - Changes are immediate

3. **Exit Edit Mode**:
   - Click the Edit button again (eye icon)
   - Or press the Escape key
   - Returns to view mode

**Note**: Playback is disabled while in edit mode.

### Selecting Beats

**Using the Dropdown**:
1. Click the beat selector dropdown
2. Choose a beat number (1-42) or "Random"
3. Click the checkmark button to load

**Using Arrow Buttons**:
1. Click left arrow (◀) for previous beat
2. Click right arrow (▶) for next beat
3. Beat loads automatically when using arrows

**Random Beat**:
- Select "Random" from dropdown
- Click checkmark
- Loads a random beat from the 42 available

## Advanced Features

### Importing Beats

1. **Open Import Panel**:
   - Click the Import/Export toggle button
   - Import controls appear

2. **Select File**:
   - Click "Choose File" button
   - Select a `.json` file from your computer
   - File must match the beat format (see [BEAT_FORMAT.md](./BEAT_FORMAT.md))

3. **Upload**:
   - Click the upload button (↑ icon)
   - Beat loads if valid
   - Error message appears if format is invalid

**File Format Requirements**:
- Must be valid JSON
- Must have `cymbals`, `snares`, and `kicks` arrays
- Each array must have 4 beats with 4 subdivisions each
- All values must be `true` or `false`

### Exporting Beats

1. **Open Export Panel**:
   - Click the Import/Export toggle button
   - Export controls appear

2. **Export Current Beat**:
   - Click the download button (↓ icon)
   - File downloads as `beat.json`
   - Success message appears

**Use Cases**:
- Save edited beats
- Share beats with others
- Backup favorite patterns
- Create custom beat library

### Muting Audio

- Click the mute button (speaker icon) to toggle audio
- Mutes both drum sounds and metronome beep
- Visual indicator shows mute state
- Useful for quiet practice or focusing on visual patterns

## Tips and Tricks

### Practice Tips

1. **Start Slow**: Use lower BPM (60-80) to learn new patterns
2. **Visual Learning**: Watch the pattern while it plays
3. **Edit and Experiment**: Try modifying beats to understand rhythm
4. **Use Mute**: Practice with visuals only, then add audio

### Beat Selection

- **Beat 1**: Simple backbeat (good starting point)
- **Higher Numbers**: More complex patterns
- **Random**: Great for discovering new patterns

### Editing Tips

- **Start Simple**: Begin with basic patterns
- **Use Symmetry**: Many beats have repeating patterns
- **Test as You Go**: Exit edit mode and play to hear changes
- **Save Your Work**: Export beats you create

### Keyboard Shortcuts

- **Escape**: Exit edit mode (when editing)

## Understanding Beat Structure

### Beat Organization

- **4 Beats**: Each measure has 4 beats (1, 2, 3, 4)
- **4 Subdivisions**: Each beat has 4 positions (16th notes)
- **Total**: 16 positions per measure

### Subdivision Counting

The subdivisions follow standard counting:
- Position 1: **1** (downbeat)
- Position 2: **e** (first 16th)
- Position 3: **&** (eighth note)
- Position 4: **a** (last 16th)

### Reading the Display

- **Empty Box**: No hit at that position
- **Icon**: Hit at that position
- **Highlighted**: Currently playing position
- **Grayscale Icon**: Hit exists but not currently playing
- **Color Icon**: Hit exists and is currently playing

## Troubleshooting

### Audio Not Playing

**Possible Causes**:
- Browser doesn't support Web Audio API
- Audio is muted (check mute button)
- No user interaction yet (click somewhere on the page)
- Browser autoplay restrictions

**Solutions**:
- Click anywhere on the page first
- Check that mute is off
- Try a different browser
- Check browser console for errors

### Beat Won't Load

**Possible Causes**:
- Invalid file format
- File is corrupted
- Missing required fields

**Solutions**:
- Check file format matches beat structure
- Validate JSON syntax
- Ensure all three drum types are present
- See [BEAT_FORMAT.md](./BEAT_FORMAT.md) for format details

### Playback Stops Unexpectedly

**Possible Causes**:
- Entered edit mode (playback stops automatically)
- Browser tab lost focus (some browsers pause)
- Audio context suspended

**Solutions**:
- Exit edit mode to resume
- Click on the page to resume
- Restart playback

### Display Looks Wrong

**Possible Causes**:
- Browser zoom level
- Screen size/resolution
- CSS not loading

**Solutions**:
- Reset browser zoom to 100%
- Try different screen size
- Refresh the page
- Check browser console for errors

## Creating Custom Beats

### Method 1: Edit Existing Beat

1. Load any beat
2. Enter edit mode
3. Modify checkboxes
4. Export to save

### Method 2: Import from File

1. Create JSON file following beat format
2. Import the file
3. Use and export as needed

### Beat Format Example

See [BEAT_FORMAT.md](./BEAT_FORMAT.md) for detailed format documentation.

Quick example:
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

## Best Practices

1. **Save Your Work**: Export beats you create or modify
2. **Start Simple**: Begin with basic patterns before complex ones
3. **Use Appropriate Tempo**: Match tempo to your skill level
4. **Practice Regularly**: Use the visual guide to improve timing
5. **Experiment**: Try different patterns to learn rhythm concepts

## Getting Help

- Check this user guide for common questions
- Review [BEAT_FORMAT.md](./BEAT_FORMAT.md) for file format details
- Check browser console for error messages
- Ensure you're using a supported browser

## Feature Limitations

Current limitations to be aware of:

- **Fixed Time Signature**: Only 4/4 time supported
- **Fixed Subdivisions**: Only 16th note subdivisions
- **No Velocity**: All hits are the same volume
- **No Pattern Variations**: Each beat is a single measure
- **Browser Audio**: Requires Web Audio API support

These may be addressed in future updates.
