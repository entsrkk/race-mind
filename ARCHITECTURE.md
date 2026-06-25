# Architecture

This document explains RaceMind's architecture at a practical level for developers and agents who need to understand the project before changing or extending it.

RaceMind is a desktop companion and tool that helps Drivers who play Assetto Corsa Competizione. Its main responsibilities are fuel planning through the Fuel Calculator and racing-guide access through GuidePage.

## System Overview

RaceMind is a desktop app with two main layers:

- **Electron Main/Preload Layer**: Owns the desktop window, IPC, custom title-bar actions, and external-link handling.
- **React Renderer Layer**: Owns the UI, page navigation, Fuel Calculator, GuidePage, and renderer state.

High-level structure:

```text
Electron Main Process
  -> BrowserWindow
  -> IPC handlers
  -> shell.openExternal

Electron Preload
  -> contextBridge
  -> window.ipcRenderer

React Renderer
  -> App layout
  -> Sidebar / TitleBar
  -> HomePage / FuelPage / GuidePage
  -> Zustand stores
  -> Static guide data
```

## Electron Layer

Electron acts as RaceMind's desktop shell:

- Creates the `BrowserWindow` that displays the renderer.
- Removes the default application menu for a custom desktop-app experience.
- Supports window controls such as minimize, maximize/restore, and close through IPC.
- Opens external URLs in the main process through `shell.openExternal`.
- Loads the Vite dev server in development and `dist/index.html` in production.

Renderer code should not call Node or Electron APIs directly. It should use only the APIs exposed by preload so the `contextBridge` security boundary remains clear.

## Preload and IPC

The preload layer exposes renderer-safe APIs through `window.ipcRenderer`.

Important exposed APIs:

- `minimize()`
- `maximize()`
- `close()`
- `isMaximized()`
- `openExternal(url)`
- `on/off/send/invoke` for general IPC usage

When adding a new IPC channel, update all relevant files together:

- `electron/main.ts`
- `electron/preload.ts`
- `electron/electron-env.d.ts`

## React Renderer Layer

The renderer is a React app with `App.tsx` as the main layout. Its core UI structure is:

- `TitleBar`: Custom title bar and window controls.
- `Sidebar`: Navigation between Home, Fuel Calculator, and GuidePage.
- `main`: Displays the active page based on `activeTab`.

RaceMind does not currently use a separate routing library. Page switching is handled through Zustand state.

## State Management

RaceMind uses Zustand for state shared across components:

- `useAppStore`: Stores `activeTab` for selecting the main app page.
- `useGuideStore`: Stores `searchQuery` and `activeCategory` for GuidePage.

Page-local state should stay in local component state with `useState`. Examples include Fuel Calculator form inputs and the selected guide in GuidePage.

## Fuel Calculator Flow

Fuel Calculator receives Race Parameters from the Driver:

- Race Duration
- Lap Time
- Fuel per Lap
- Safety Margin

It then calculates:

- **Laps** = Race Duration / Lap Time
- **Fuel Required** = Laps * Fuel per Lap
- **Recommended Fuel** = Fuel Required + Safety Margin converted into fuel using Fuel per Lap

The important domain rule is that Fuel Required and Recommended Fuel must remain distinct. Drivers should be able to see both the exact estimate before margin and RaceMind's recommendation after applying Safety Margin.

## GuidePage Flow

GuidePage uses static data from `src/data/guides.json`, grouped by guide category:

- Track Guides
- Car Setup Guides
- Weather Conditions
- Game Settings
- Rating Points

Search uses `searchQuery` from Zustand and debounce behavior from the shared hook to avoid filtering immediately on every keystroke.

When adding a new guide category, update the data schema, category type, category config, and guide-reading logic together.

## Styling and UI System

RaceMind uses Tailwind CSS as the primary styling system and Mantine components for controls where they are useful, such as `Slider`.

Current UI direction:

- Dark desktop cockpit style
- Dark panels
- Blue accents
- Desktop-app layout
- Lucide React icons

Avoid inline styles except for Electron-specific cases such as custom-title-bar draggable regions.

## Build and Verification

Main commands:

```bash
npm run dev
npm run lint
npm run build
npm run preview
```

Choose verification based on risk:

- Documentation-only change: Read the edited file back and check content/encoding.
- React, TypeScript, or UI change: Run `npm run lint`.
- Electron, config, build, or important logic change: Run `npm run build` when appropriate.

## Extension Principles

- Read `CONTEXT.md` before changing domain language or logic related to Driver, Fuel Calculator, or GuidePage.
- Keep each change scoped to the current task.
- Do not edit generated output such as `dist`, `dist-electron`, `release`, or `node_modules`.
- If adding IPC, preserve the boundary between main, preload, and renderer.
- If adding shared state, use Zustand only when the state genuinely needs to be shared across components.
