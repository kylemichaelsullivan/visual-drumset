# Development Setup Guide

This guide will help you set up the Visual Drumset development environment and get started with development.

## Prerequisites

### Required Software

1. **Node.js** (v18 or higher recommended)
   - Download from [nodejs.org](https://nodejs.org/)
   - Verify installation: `node --version`

2. **Bun** (Package manager and runtime)
   - Install from [bun.sh](https://bun.sh/)
   - Verify installation: `bun --version`
   - Alternative: You can use `npm` or `yarn` if preferred

3. **Git**
   - Download from [git-scm.com](https://git-scm.com/)
   - Verify installation: `git --version`

### Recommended Tools

- **Code Editor**: VS Code, Cursor, or your preferred editor
- **Browser**: Modern browser with Web Audio API support (Chrome, Firefox, Safari, Edge)

## Installation

### 1. Clone the Repository

```bash
git clone <repository-url>
cd visual-drumset
```

### 2. Install Dependencies

Using Bun (recommended):
```bash
bun install
```

Using npm:
```bash
npm install
```

Using yarn:
```bash
yarn install
```

### 3. Verify Installation

Check that all dependencies are installed:
```bash
bun list
# or
npm list
```

## Available Scripts

### Development

```bash
bun dev
# or
npm run dev
```

Starts the Vite development server with hot module replacement (HMR). The application will be available at `http://localhost:5173` (or the next available port).

### Build

```bash
bun run build
# or
npm run build
```

Builds the application for production. Output is generated in the `dist/` directory.

### Preview Production Build

```bash
bun run preview
# or
npm run preview
```

Serves the production build locally for testing.

### Linting

```bash
bun run lint
# or
npm run lint
```

Runs Biome linter to check for code issues.

### Fix Linting Issues

```bash
bun run lint:fix
# or
npm run lint:fix
```

Automatically fixes linting issues where possible.

### Formatting

```bash
bun run format
# or
npm run format
```

Formats code using Biome formatter.

### Check Formatting

```bash
bun run format:check
# or
npm run format:check
```

Checks if code is properly formatted without making changes.

### Combined Checks

```bash
bun run check
# or
npm run check
```

Runs both linting and formatting checks.

```bash
bun run check:write
# or
npm run check:write
```

Runs checks and automatically fixes issues.

## Development Workflow

### 1. Start Development Server

```bash
bun dev
```

### 2. Make Changes

- Edit files in `src/`
- Changes will hot-reload automatically
- Check browser console for errors

### 3. Test Changes

- Test in browser
- Check for console errors
- Verify functionality works as expected

### 4. Format and Lint

Before committing:
```bash
bun run check:write
```

### 5. Build and Test Production

```bash
bun run build
bun run preview
```

## Project Structure

```
visual-drumset/
├── public/              # Static assets
│   ├── beats/          # Predefined beat JSON files
│   └── icons/          # Drum icon images
├── src/
│   ├── components/     # React components
│   ├── context/        # Context providers and hooks
│   ├── types/          # TypeScript type definitions
│   ├── index.css       # Global styles
│   └── main.tsx        # Application entry point
├── documentation/      # Project documentation
├── biome.json          # Biome configuration
├── package.json        # Dependencies and scripts
├── tsconfig.json       # TypeScript configuration
├── vite.config.ts      # Vite configuration
└── tailwind.config.js  # Tailwind CSS configuration
```

## Code Style Guidelines

### Biome Configuration

The project uses [Biome](https://biomejs.dev/) for linting and formatting. Configuration is in `biome.json`.

Key settings:
- **Indent Style**: Tabs
- **Indent Width**: 2 spaces
- **Line Width**: 80 characters
- **Quote Style**: Single quotes
- **Semicolons**: Always

### TypeScript

- Strict mode enabled
- Path aliases: `@/` maps to `src/`
- Use type imports: `import type { ... }`

### React

- Use functional components
- Prefer hooks over class components
- Use TypeScript for props and state

### Commit Messages

Follow the format outlined in [GIT_COMMITS.md](./GIT_COMMITS.md):
```
TYPE: Commit Message in Title Case
```

## TypeScript Configuration

The project uses strict TypeScript settings:
- `strict: true`
- `noUnusedLocals: true`
- `noUnusedParameters: true`
- `noFallthroughCasesInSwitch: true`

Path aliases are configured:
- `@/*` → `./src/*`

## Vite Configuration

Key Vite settings:
- React plugin enabled
- Tailwind CSS plugin enabled
- Path alias `@/` configured

## Browser Support

The application requires:
- Web Audio API support
- ES2020 JavaScript features
- Modern CSS (Flexbox, Grid)

Tested browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Common Issues

### Port Already in Use

If port 5173 is in use, Vite will automatically try the next available port. You can also specify a port:

```bash
bun dev -- --port 3000
```

### Audio Not Working

- Ensure browser supports Web Audio API
- Check browser console for errors
- Some browsers require user interaction before playing audio
- Check that audio is not muted in the application

### Type Errors

Run TypeScript compiler:
```bash
bun run build
```

This will show all type errors.

### Import Errors

Ensure path aliases are working:
- Check `tsconfig.json` for path configuration
- Check `vite.config.ts` for alias configuration
- Use `@/` prefix for imports from `src/`

### Styling Issues

- Ensure Tailwind CSS is properly configured
- Check that `@import 'tailwindcss';` is in `index.css`
- Verify Tailwind classes are being applied

## IDE Setup

### VS Code / Cursor

Recommended extensions:
- **Biome**: Official Biome extension for formatting and linting
- **TypeScript**: Built-in TypeScript support
- **Tailwind CSS IntelliSense**: Autocomplete for Tailwind classes

### Settings

Add to `.vscode/settings.json`:
```json
{
  "editor.defaultFormatter": "biomejs.biome",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "quickfix.biome": "explicit",
    "source.organizeImports.biome": "explicit"
  }
}
```

## Testing

Currently, the project does not include automated tests. Manual testing is performed:
1. Start dev server
2. Test all features in browser
3. Check console for errors
4. Test on different browsers

## Getting Help

- Check existing documentation in `documentation/`
- Review code comments
- Check browser console for errors
- Review commit history for context

## Next Steps

After setup:
1. Read [ARCHITECTURE.md](./ARCHITECTURE.md) to understand the codebase
2. Review [STATE_MANAGEMENT.md](./STATE_MANAGEMENT.md) for state patterns
3. Check [COMPONENT_GUIDE.md](./COMPONENT_GUIDE.md) for component details
4. Start making changes!
