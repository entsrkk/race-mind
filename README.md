# RaceMind

> Desktop companion for Assetto Corsa Competizione (ACC) — fuel planning and racing guides in one app.

![Version](https://img.shields.io/badge/version-1.0.0--beta-blue)
![Platform](https://img.shields.io/badge/platform-Windows-lightgrey)
![License](https://img.shields.io/badge/license-private-red)

---

## What is RaceMind?

RaceMind is a Windows desktop app built for ACC drivers who want to plan their race strategy without switching between browser tabs. It combines a fuel calculator and curated racing guides into a single, lightweight interface.

---

## Features

| Feature | Description |
|---|---|
| **Fuel Calculator** | Calculate Fuel Required and Recommended Fuel based on Race Duration, Lap Time, Fuel per Lap, and Safety Margin |
| **Guide Page** | Browse Track Guides, Car Setup Guides, Weather Conditions, Game Settings, and Rating Points for ACC |

---

## Tech Stack

| Layer | Technology |
|---|---|
| Desktop shell | Electron 30 |
| Build tool | Vite 5 |
| UI framework | React 19 |
| Language | TypeScript (strict) |
| State management | Zustand |
| Styling | Tailwind CSS v4 |
| Component library | Mantine v9 |
| Icons | Lucide React |
| Packaging | electron-builder |

---

## Installation

1. Download `RaceMindSetup.exe` from the [latest release](https://github.com/entsrkk/race-mind/releases/latest)
2. Run the installer and follow the on-screen instructions
3. Launch RaceMind from the Desktop shortcut

### System Requirements

- Windows 10/11 (x64)

---

## Domain Glossary

| Term | Definition |
|---|---|
| **Driver** | The user of RaceMind — someone planning fuel and reading guides for ACC |
| **Race Duration** | Total race length used for fuel planning |
| **Lap Time** | Driver's average lap time |
| **Fuel per Lap** | Fuel consumed per lap |
| **Fuel Required** | Minimum fuel needed before applying Safety Margin |
| **Recommended Fuel** | Final fuel recommendation after adding Safety Margin |
| **Safety Margin** | Extra laps added to reduce the risk of running out of fuel |

---

## Scope

RaceMind currently supports **Assetto Corsa Competizione only**. Multi-simulator support is not planned until a deliberate design decision is made to expand beyond ACC.

---

## Internal Docs

| File | Purpose |
|---|---|
| [`CONTEXT.md`](CONTEXT.md) | Domain language definitions and terminology conventions |
| [`AGENTS.md`](AGENTS.md) | Guide for AI agents contributing to this project |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Technical architecture overview |
