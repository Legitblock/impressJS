# LegitBlock 3D Architecture Presentation

Interactive 3D presentation exploring the **LegitBlock** cryptographic governance architecture, built using [impress.js](https://impress.js.org/) and powered by [@tekromancy/tekromancy](https://github.com/tekromancy/tekromancy) elemental visual effects engine.

---

## ⚡ Features

- **3D Celestial Flight Path**: 11 stations rendered across a spherical coordinate system (Radius = 9,000px) in full 3D space with CSS3 transforms and impress.js.
- **Tekromancy Procedural Visual FX**:
  - ⚡ **Lightning**: Stroboscopic flashes and targeted electric strikes on blockchain blocks.
  - 🔥 **Fire**: Convective redline burns and thermal combustion on document diffs.
  - 💨 **Smoke**: Volumetric gas billows during document replacement.
  - ⚛️ **Plasma**: Ionized gas arcs and containment fields during quorum balloting.
  - ❄️ **Ice**: Dendritic frost crystallization locking 32 organizational templates.
  - 💧 **Water**: Fluid ripples and rain downpours.
- **Heads-Up Display (HUD)**:
  - Top telemetry bar with station jump menu, navigation buttons, and 3D constellation overview toggle (`Key 'O'`).
  - Web Audio procedural synthesizer sound engine (`Key 'M'` to mute/unmute).
  - Bottom progress indicator with keyboard shortcut hints.
- **Interactive FX Controls**: Each station features buttons allowing attendees to trigger live elemental physics and cryptographic simulations directly on the slide content.

---

## 🚀 Development & Build

### Install Dependencies
```bash
pnpm install
```

### Start Development Server
```bash
pnpm dev
```
Runs at `http://localhost:3003`.

### Production Build
```bash
pnpm build
```
Generates production-ready static assets in `./dist`.

### Preview Production Build
```bash
pnpm preview
```

---

## ⌨️ Keyboard Navigation

| Key | Action |
| :--- | :--- |
| <kbd>Space</kbd> / <kbd>→</kbd> | Advance to next station |
| <kbd>←</kbd> / <kbd>Backspace</kbd> | Return to previous station |
| <kbd>O</kbd> | Toggle 3D Constellation Overview |
| <kbd>L</kbd> | Trigger high-voltage lightning flash |
| <kbd>F</kbd> | Trigger convective fire burst |
| <kbd>P</kbd> | Trigger plasma orb strike |
| <kbd>M</kbd> | Toggle synthesizer sound effects |
