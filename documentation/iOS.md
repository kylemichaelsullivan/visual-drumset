# iOS Support

This document describes iOS-specific behavior, known WebKit quirks, and the patterns Visual Drumset uses so the app stays aligned and usable on iPhone and iPad (Safari and other browsers that use WebKit).

Chrome, Firefox, and Edge on iOS all use **WebKit**. Fixes aimed at Safari on iPad apply to those browsers too.

## Why iOS Needs Special Care

Several UI pieces rely on native form controls and CSS that WebKit treats differently from desktop Chrome/Firefox:

| Area | What goes wrong on iOS without fixes |
| --- | --- |
| Edit-mode checkboxes | Default margins / intrinsic sizing left-align controls under centered count labels |
| Tempo range + number | Vertical misalignment; default spinner / track chrome |
| Playback icon grayscale | Unprefixed `filter` alone is less reliable; prefer `-webkit-filter` + `filter` |
| Audio | `AudioContext` stays suspended until a user gesture |

Canonical implementation lives in:

- `src/index.css` — form resets, grid centering, range/thumb styling, grayscale prefixes
- `src/components/edits/{Cymbals,Snares,Kicks}.tsx` — checkbox cells
- `src/components/displays/{Cymbals,Snares,Kicks}.tsx` — icon cells (same column track)
- `src/components/globals/Counts.tsx` — count labels
- `src/context/SoundsProvider.tsx` — Web Audio resume / user-gesture behavior

See also [AUDIO_SYSTEM.md](./AUDIO_SYSTEM.md) and [STYLING_GUIDE.md](./STYLING_GUIDE.md).

## Beat Grid Alignment

### Problem

In edit mode, bare `<input type="checkbox">` elements were direct CSS Grid children. Count labels used centered text. On iOS, native checkboxes keep default margins and do not center in the grid track the same way, so hits sat **left of** `1`, `&`, `2`, `&`, etc.

### Fix

1. **Same cell structure in edit and display** — Each subdivision is a full-width cell (`.Cymbal` / `.Snare` / `.Kick`) that flex-centers its content. Edit mode wraps the checkbox; display mode wraps the drum icon.
2. **Shared track CSS** in `src/index.css`:
   - Grids (`.Counts`, `.Cymbals`, `.Snares`, `.Kicks`): `justify-items: center` and `align-items: center`
   - Cells: `display: flex`, centered content, `width: 100%`, `min-width: 0`, `box-sizing: border-box`
3. **16ths visibility** — When even columns are shown (`sm` and not `.hide-16ths`), use `display: flex` (not `display: block`) so centering is preserved.

### Checkbox margin reset

```css
input[type='checkbox'] {
  display: block;
  margin: 0;
  padding: 0;
  vertical-align: middle;
  place-self: center;
}
```

This removes WebKit’s default checkbox offset so flex/grid centering is predictable.

### Edit cell pattern

```tsx
<div className='Cymbal flex justify-center items-center py-2'>
  <input type='checkbox' /* ... */ />
</div>
```

Keep the subdivision class (`.Cymbal` / `.Snare` / `.Kick`) on the **cell**, not only on the input, so `nth-of-type(even)` hide-16ths rules continue to match.

## Form Controls

### Number inputs (tempo BPM)

iOS / WebKit number fields often have uneven intrinsic padding and spinner UI that throws off flex alignment next to the range slider.

Resets in `src/index.css`:

- Zero margin, `line-height: normal`, vertical middle alignment
- Hide WebKit spin buttons (`::-webkit-inner-spin-button` / `::-webkit-outer-spin-button`)
- Firefox: `-moz-appearance: textfield`
- `.Tempo input[type='number']`: fixed `height: 2rem`, `align-self: center`, `box-sizing: border-box`

### Range inputs (tempo slider)

Cross-browser styling already used `-webkit-` and `-moz-` track/thumb pseudos. iOS-relevant details:

- `-webkit-appearance: none` (and `-moz-` / standard `appearance`) on the input and thumb
- `display: block` + `align-self: center` on the range so it sits on the metronome flex baseline
- `border: none` on the WebKit thumb (avoids default chrome shifting the knob)
- Transparent input background; painted track via `::-webkit-slider-runnable-track` / `::-moz-range-track`
- Progress fill via `--slider-progress` set inline from `Tempo.tsx`

### Metronome row

`.Tempo` uses `align-items: center`. Plus/minus controls are absolutely positioned on `.MetronomeContent` (`top-1/2` + translate). Prefer keeping that row a single flex line with consistent control heights on iPad.

## Playback Grayscale

During playback, inactive hit icons are gray; the active slot is full color.

```css
.VisualDisplay.isPlaying .Icon img {
  -webkit-filter: grayscale(100%);
  filter: grayscale(100%);
}

.VisualDisplay.isPlaying .Icon.active img {
  -webkit-filter: grayscale(0%);
  filter: grayscale(0%);
}
```

Always set **both** `-webkit-filter` and `filter`. Prefer `grayscale(100%)` / `grayscale(0%)` over unitless `1` / `0` for clearer WebKit behavior.

## Colors and Native Controls

Native iOS checkboxes use the system accent (often bright blue) unless styled. This app’s chrome is black / gray / white.

If checkboxes must match that palette on iPad:

1. **`accent-color: #000`** — tints the native control when custom painting is unavailable
2. **`appearance: none`** (with `-webkit-` / `-moz-` prefixes) plus explicit border / background — full control
3. **Checked state** — solid black fill remains readable even if a checkmark `background-image` fails

Alignment fixes (cell wrappers + margin reset) should stay in place even when colors are customized; do not put checkboxes back as bare grid items.

## Audio on iOS

iOS Safari (and WebKit browsers) require a **user gesture** before audio can play. The app resumes a suspended `AudioContext` on interaction (play / mute / drum tap, etc.).

Practical rules:

- Do not expect sound on first paint without a tap
- Prefer starting or resuming audio from click / pointer / touch handlers
- If sound is silent on iPad, confirm a control was tapped and that Mute is off

Details: [AUDIO_SYSTEM.md](./AUDIO_SYSTEM.md) → Browser Compatibility / Known Issues.

## Viewport and Layout Notes

- `main` uses `min-height: calc(100vh - 3.625rem)` to leave room for the footer. iOS dynamic toolbars can still affect `100vh`; if layout jumps become an issue, consider a `100dvh` fallback alongside `100vh`.
- Beat icons under `.VisualDisplay` (excluding `.Buttons`) are capped with `max-width` / `max-height: min(5vw, 2rem)` so the grid stays usable on narrow iPhone widths and wide iPad layouts.
- Below the `sm` breakpoint (640px), even subdivision columns (`e` / `a`) stay hidden via CSS regardless of the 16ths toggle; test both compact and 16ths-visible layouts on iPad.

## Testing Checklist (iPhone / iPad)

Use a real device or Safari Web Inspector with a connected device when possible.

**Alignment**

- [ ] Edit mode: checkboxes centered under `1 & 2 & 3 & 4 &` (and under `e` / `a` when 16ths are visible on a wide viewport)
- [ ] Display mode: drum icons share the same columns as Counts
- [ ] Toggling 16ths does not break centering

**Controls**

- [ ] Tempo slider thumb and track align with play control and BPM field
- [ ] +/- tempo buttons remain vertically centered on the metronome bar
- [ ] BPM number field does not show spin-button chrome that shifts the row

**Playback / audio**

- [ ] After a tap, metronome and drum hits produce sound
- [ ] While playing, inactive icons are gray and the active slot is full color
- [ ] Mute and volume controls behave as on desktop

**Browsers**

- [ ] Safari
- [ ] Chrome on iOS (WebKit)
- [ ] Optional: Firefox / Edge on iOS

## Guidelines for Future Changes

1. **Do not** place form controls as lone grid items when they must line up with text/icons — wrap them in the same flex-centered cell pattern.
2. **Do** reset checkbox / number margins when adding new form UI.
3. **Do** keep `-webkit-` prefixes for `appearance`, `filter`, and range pseudos that already use them.
4. **Do** verify edit + display grids together after any change to `.Count` / `.Cymbal` / `.Snare` / `.Kick` or hide-16ths selectors.
5. **Do** treat “works in desktop Chrome” as insufficient for layout that touches native controls; confirm on iPad WebKit.
