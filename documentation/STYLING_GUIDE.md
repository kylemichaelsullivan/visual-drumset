# Styling Guide

This document describes the styling approach, conventions, and patterns used in Visual Drumset.

## Overview

Visual Drumset uses a combination of:
- **Tailwind CSS**: Utility-first CSS framework for most styling
- **Custom CSS**: Additional styles in `index.css` for complex selectors and browser-specific styles
- **Component Classes**: CSS classes matching component names for scoped styling

## Tailwind CSS

### Configuration

Tailwind CSS is configured via the Vite plugin (`@tailwindcss/vite`) in `vite.config.ts`:

```typescript
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});
```

### Import

Tailwind is imported in `src/index.css`:

```css
@import 'tailwindcss';
```

### Usage

Components use Tailwind utility classes directly in JSX:

```tsx
<div className='flex flex-col gap-4 p-4 border'>
  <button className='bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded'>
    Click Me
  </button>
</div>
```

## Custom CSS

### Location

Custom styles are in `src/index.css`, imported after Tailwind.

### Purpose

Custom CSS is used for:
- Complex selectors that are difficult with utilities
- Browser-specific styles (e.g., range input styling)
- Component-scoped styles using class selectors
- Responsive behavior that requires media queries

### Key Custom Styles

#### Main Layout

```css
main {
  min-height: calc(100vh - 3.625rem);
}
```

Ensures main content fills viewport minus footer height.

#### Links

```css
a {
  text-decoration: none;
}

a:hover,
a:focus-visible {
  text-decoration: underline;
}
```

Consistent link styling with hover and focus states.

#### Interactive Elements

```css
button,
input[type='checkbox'] {
  cursor: pointer;
}
```

Pointer cursor for all interactive elements.

#### Custom Grid

```css
.grid-cols-16 {
  grid-template-columns: repeat(16, minmax(0, 1fr));
}
```

Custom grid utility for 16-column layout (used for beat display).

#### Visual Display

```css
.VisualDisplay {
  min-height: 14rem;
}
```

Minimum height for the main display area.

#### Responsive Beat Display

```css
/* Mobile: Hide even beats */
.VisualDisplay .Counts .Count:nth-of-type(even),
.VisualDisplay .Cymbals .Cymbal:nth-of-type(even),
.VisualDisplay .Snares .Snare:nth-of-type(even),
.VisualDisplay .Kicks .Kick:nth-of-type(even) {
  display: none;
}

/* Desktop: Show all beats */
@media (min-width: 640px) {
  .sm\:grid-cols-16 {
    grid-template-columns: repeat(16, minmax(0, 1fr));
  }

  .VisualDisplay .Counts .Count:nth-of-type(even),
  .VisualDisplay .Cymbals .Cymbal:nth-of-type(even),
  .VisualDisplay .Snares .Snare:nth-of-type(even),
  .VisualDisplay .Kicks .Kick:nth-of-type(even) {
    display: block;
  }
}
```

Responsive behavior: hides even beats on mobile, shows all on desktop.

#### Playback States

```css
.VisualDisplay.isPlaying .Icon img {
  filter: grayscale(1);
}

.VisualDisplay.isPlaying .Icon.active img {
  filter: grayscale(0);
}
```

Grayscale filter during playback, removed for active position.

#### Tempo Slider

Complex range input styling for cross-browser compatibility:

```css
.Tempo input[type='range'] {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  border-radius: 1rem;
  height: 0.5rem;
}

/* Webkit (Chrome, Safari) */
.Tempo input[type='range']::-webkit-slider-runnable-track {
  /* Track styling */
}

.Tempo input[type='range']::-webkit-slider-thumb {
  /* Thumb styling */
}

/* Firefox */
.Tempo input[type='range']::-moz-range-track {
  /* Track styling */
}

.Tempo input[type='range']::-moz-range-thumb {
  /* Thumb styling */
}
```

## Component Class Naming

### Convention

Components use CSS classes matching their component name:

```tsx
function Cymbals() {
  return <div className='Cymbals grid grid-cols-8'>...</div>;
}

function Metronome() {
  return <div className='Metronome flex flex-col'>...</div>;
}
```

### Benefits

- Easy to identify component in DOM
- Scoped styling with class selectors
- Clear relationship between component and styles

### Usage in Custom CSS

```css
/* Target specific component */
.Cymbals {
  /* Component-specific styles */
}

/* Target nested elements */
.VisualDisplay .Cymbals {
  /* Scoped to VisualDisplay context */
}
```

## Responsive Design

### Approach

Mobile-first responsive design using Tailwind breakpoints.

### Breakpoints

- **Default**: Mobile (< 640px)
- **sm**: 640px and up (tablet/desktop)

### Examples

#### Grid Layout

```tsx
<div className='grid grid-cols-8 sm:grid-cols-16'>
  {/* 8 columns on mobile, 16 on desktop */}
</div>
```

#### Flex Direction

```tsx
<div className='flex flex-col sm:flex-row'>
  {/* Column on mobile, row on desktop */}
</div>
```

#### Spacing

```tsx
<div className='gap-2 sm:gap-4'>
  {/* Smaller gap on mobile, larger on desktop */}
</div>
```

### Responsive Patterns

1. **Hide/Show Elements**: Use `hidden sm:block` or custom CSS
2. **Layout Changes**: Flex direction, grid columns
3. **Spacing Adjustments**: Padding, gaps, margins
4. **Text Sizing**: Font sizes (if needed)

## Color Scheme

### Default Colors

Uses Tailwind's default color palette:
- **Gray Scale**: For backgrounds, borders, text
- **Green**: For active states (metronome blinker)
- **Black**: For icons, text, slider thumbs

### Usage Examples

```tsx
// Background
className='bg-gray-200'

// Border
className='border'

// Active state
className='bg-green-400'

// Text
className='text-black'
```

## Typography

### Font

Uses browser default font stack (system fonts).

### Sizing

- Default text size from browser
- No custom font sizes currently
- Relies on browser defaults for accessibility

## Spacing System

### Tailwind Spacing Scale

Uses Tailwind's default spacing scale (0.25rem increments):
- `p-2`: 0.5rem (8px)
- `p-4`: 1rem (16px)
- `gap-2`: 0.5rem
- `gap-4`: 1rem

### Common Patterns

```tsx
// Container padding
className='p-4'

// Gaps between items
className='gap-4'

// Margins
className='mx-auto' // Center horizontally
```

## Layout Patterns

### Flexbox

Primary layout method:

```tsx
// Column layout
className='flex flex-col'

// Row layout
className='flex flex-row'

// Centering
className='flex justify-center items-center'

// Space between
className='flex justify-between'
```

### Grid

Used for beat display:

```tsx
// 8 columns (mobile)
className='grid grid-cols-8'

// 16 columns (desktop)
className='grid grid-cols-16 sm:grid-cols-16'
```

### Container

Main content container:

```tsx
className='w-full max-w-screen-xl p-4 mx-auto'
```

- Full width with max-width constraint
- Centered horizontally
- Responsive padding

## Interactive States

### Hover

```tsx
className='hover:ring-1'
className='hover:bg-blue-600'
```

### Focus

```tsx
className='focus-visible:outline-none'
```

### Active

```tsx
className='active' // Custom class for playback position
```

## Accessibility

### Focus Indicators

```css
a:focus-visible {
  text-decoration: underline;
}
```

### Cursor Indicators

```css
button,
input[type='checkbox'] {
  cursor: pointer;
}
```

### Semantic HTML

- Use appropriate HTML elements
- Button elements for interactive actions
- Input elements with proper types
- Title attributes for tooltips

## Browser Compatibility

### CSS Features Used

- Flexbox (widely supported)
- CSS Grid (widely supported)
- CSS Custom Properties (for slider progress)
- Media queries (widely supported)

### Vendor Prefixes

Used for range input styling:
- `-webkit-` for Chrome/Safari
- `-moz-` for Firefox

### Fallbacks

- Graceful degradation for unsupported features
- Default browser styles as fallback

## Styling Best Practices

### 1. Use Tailwind for Most Styling

Prefer Tailwind utilities over custom CSS:

```tsx
// Good
<div className='flex flex-col gap-4 p-4'>

// Avoid (unless necessary)
<div style={{ display: 'flex', flexDirection: 'column' }}>
```

### 2. Component Classes for Scoping

Use component class names for scoped styles:

```css
.Cymbals {
  /* Scoped to Cymbals component */
}
```

### 3. Responsive First

Design for mobile first, enhance for desktop:

```tsx
className='grid-cols-8 sm:grid-cols-16'
```

### 4. Consistent Spacing

Use Tailwind spacing scale consistently:

```tsx
className='gap-4 p-4' // Consistent 1rem spacing
```

### 5. Semantic Class Names

Use descriptive class names:

```tsx
className='VisualDisplay' // Clear component name
```

### 6. Avoid Inline Styles

Prefer classes over inline styles (except for dynamic values):

```tsx
// Good
<div className='p-4'>

// Acceptable (dynamic value)
<div style={{ '--slider-progress': `${percentage}%` }}>
```

## Custom Utilities

### Grid Columns

Custom utility for 16-column grid:

```css
.grid-cols-16 {
  grid-template-columns: repeat(16, minmax(0, 1fr));
}
```

Used for beat display (16 subdivisions).

## Future Enhancements

Potential styling improvements:

- **Dark Mode**: Add dark mode support
- **Custom Theme**: Define custom color palette
- **Animations**: Add transitions and animations
- **Custom Fonts**: Add custom typography
- **CSS Variables**: Use CSS variables for theming
- **Container Queries**: Use container queries for responsive design

## Tools and Resources

### Tailwind CSS

- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Tailwind CSS Vite Plugin](https://tailwindcss.com/docs/guides/vite)

### CSS Resources

- [MDN CSS Reference](https://developer.mozilla.org/en-US/docs/Web/CSS)
- [Can I Use](https://caniuse.com/) for browser compatibility

### Development Tools

- Browser DevTools for inspecting styles
- Tailwind CSS IntelliSense extension for autocomplete
- Biome for CSS formatting
