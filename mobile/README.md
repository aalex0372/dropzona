# DROPZONE Mobile (iOS adaptive)

Mobile-optimized build of DROPZONE — Live Skin Drops. Designed for iOS with safe areas, bottom tab bar, and touch-friendly UI.

## Run locally

From project root:

```bash
# Python 3
python3 -m http.server 8080

# or npx
npx serve mobile -p 8080
```

Then open `http://localhost:8080` on your iPhone (same network) or use Safari DevTools device mode.

## Features

- **iOS safe areas** — Respects notch and home indicator (`env(safe-area-inset-*)`).
- **Bottom tab bar** — Live | Drops | Profile (viewer) or Dashboard | Drops | Profile (streamer).
- **Hamburger drawer** — Full navigation (Browse, My Drops, Profile, Settings, Streamer pages) from the menu button.
- **Touch targets** — Buttons and list rows use at least 44px height for easy tapping.
- **Same app logic** — Streams, feed, role switch, wizard, and routing match the desktop build.

## File layout

- `index.html` — Single-page shell with top bar, main content, bottom nav, and drawer.
- `css/mobile.css` — Mobile-first styles, design tokens, bottom nav, drawer.
- `js/app.js` — Router, data, bottom nav/drawer handling, same behavior as desktop.
