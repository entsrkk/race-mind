# Agent Guide for RaceMind

## 1. Project Overview

RaceMind is a desktop companion and tool that helps Drivers who play Assetto Corsa Competizione. Its current focus is fuel planning and racing-guide access in one desktop app.

Core RaceMind features:

- **Fuel Calculator**: Calculates Fuel Required and Recommended Fuel from Race Duration, Lap Time, Fuel per Lap, and Safety Margin.
- **GuidePage**: Displays racing guides for Assetto Corsa Competizione, including Track Guides, Car Setup Guides, Weather Conditions, Game Settings, and Rating Points.

When describing product behavior in the racing domain, refer to the end user as a **Driver** instead of a generic user/player.

## 2. Tech Stack

- Framework: Electron 30 + Vite 5 + React 19
- Language: TypeScript strict mode
- State management: Zustand
- Styling: Tailwind CSS v4 + Mantine v9
- Icons: Lucide React
- Build/packaging: vite-plugin-electron and electron-builder

Main commands:

- `npm run dev`: Starts the Vite dev server for the renderer with Electron integration.
- `npm run lint`: Runs ESLint for TypeScript and TSX files.
- `npm run build`: Runs `tsc`, `vite build`, and `electron-builder`.

Do not run `npm install` before every verification by default. Run it only when dependency state is broken, `node_modules` is missing, `package.json` or `package-lock.json` changed, or an npm command fails because dependencies are unavailable.

## 3. Important Structure

- `src/App.tsx`: Main renderer layout. Shows `HomePage`, `FuelPage`, or `GuidePage` based on `activeTab`.
- `src/store/appStore.ts`: Zustand store for app navigation state.
- `src/store/guideStore.ts`: Zustand store for guide search query and active guide category.
- `electron/main.ts`: Electron main process, BrowserWindow setup, IPC handlers, and external-link handling.
- `electron/preload.ts`: Exposes `window.ipcRenderer` to the renderer through `contextBridge`.
- `electron/electron-env.d.ts`: Type declarations for the Electron preload API.
- `CONTEXT.md`: Primary source for domain language and RaceMind terminology.

Generated output and dependency folders should not be edited manually:

- `node_modules`
- `dist`
- `dist-electron`
- `release`

## 4. Agent Working Rules

- Respond to the user in Thai by default. Use another language only when the user explicitly requests it.
- Before editing code, summarize the intended approach or short plan in chat, especially for changes that touch behavior, UI, or multiple files.
- Before editing code, do not read many additional files on your own. Tell the user which files you need to read and why, then read only the files required for that specific task.
- Read `CONTEXT.md` before changing features related to Fuel Calculator, GuidePage, copywriting, or domain terminology.
- Keep changes scoped to the user's request. Avoid unrelated refactors.
- Do not edit generated output or dependency folders unless the user explicitly asks.
- If you see file changes you did not make, treat them as user work and do not revert them without permission.
- This project may not always be inside an active git repository. Do not include commit steps by default.

## 5. React, TypeScript, and State Rules

- Preserve TypeScript strict mode. Avoid `any` unless it is genuinely necessary and clearly justified.
- Use Zustand for state shared across components, such as active tab, guide search, and active category.
- Use local `useState` for page/component-specific state, such as form inputs or selected guide.
- Prefer derived values from existing state when values can be computed directly. Do not create duplicate state unless needed.
- Use `useMemo`, `useCallback`, and `React.memo` only where they reduce meaningful rerenders or match the existing file pattern.
- Preserve current component boundaries: pages in `src/pages`, reusable UI in `src/components`, shared hooks in `src/hooks`.

## 6. UI and Styling Rules

- Use Tailwind CSS as the primary styling approach.
- Avoid inline styles except for Electron-specific cases such as `WebkitAppRegion`.
- Use Mantine components when they are useful for more complex controls, such as `Slider`.
- Use Lucide React icons when an appropriate icon exists.
- Preserve RaceMind's current visual tone: dark desktop cockpit style, dark panels, blue accents, and a layout suited to a desktop app.
- Do not broadly change copy or domain terms without checking `CONTEXT.md`.
- Ensure text does not overflow buttons, cards, or panels, and keep layouts usable on the narrow viewports the app supports.
