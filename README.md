# DROPZONE — Live Skin Drops

Watch CS2 streams, participate in drops, and win skins. This is a **static single-page app** with a dark theme, purple accents, and a clean layout.

---

## What you need for Cursor

- **No build step** — open `index.html` in a browser or run a local server.
- **No repo required** — the project works as a folder. You can run `git init` later if you want version control.
- **Directory layout** (already set up):

```
idea/
├── index.html       # Main app (layout + all pages in one file)
├── css/
│   └── main.css     # All styles (variables, components, responsive)
├── js/
│   └── app.js       # Router, data, feed, wizard, icons
├── package.json     # Optional: run `npm start` for a local server
├── dropzone-v3.html # Original single-file version (reference)
└── README.md
```

---

## How to run

**Option A — Open the file**

- Double-click `index.html`, or  
- In Cursor: right-click `index.html` → “Open with Live Server” (if you use the Live Server extension).

**Option B — Local server (recommended for Lucide icons and future API)**

```bash
npm start
```

Then open **http://localhost:3000**.

---

## Pages (split in code)

The UI is one SPA; “pages” are separate sections in `index.html` and are toggled by `js/app.js`:

| Section        | ID / role        | Description              |
|----------------|------------------|--------------------------|
| Live Streams   | `p-browse`       | Browse streams, stats, feed |
| Stream detail  | `p-stream`       | Single stream + eligibility |
| My Drops       | `p-my-drops`     | Won skins history        |
| Profile        | `p-profile`      | Account, connections      |
| Settings       | `p-v-settings`   | Viewer settings          |
| Setup Wizard   | `p-s-onboard`    | Streamer onboarding      |
| Dashboard      | `p-s-dash`       | Streamer dashboard       |
| Triggers       | `p-s-triggers`   | Game triggers config     |
| Skin Pool      | `p-s-pool`       | Drop pool                |
| History        | `p-s-hist`       | Drop history             |
| Health         | `p-s-health`     | System status            |
| Anti-Fraud     | `p-s-antifraud`  | Abuse protection         |
| Settings       | `p-s-settings`   | API, bot, overlay        |

Navigation and role (Viewer / Streamer) are in `js/app.js` (`go()`, `setRole()`).

---

## Making it “beautiful” (already in place)

- **Design**: Dark background, purple/violet accent, JetBrains Mono + Inter, subtle mesh and noise.
- **Structure**: CSS in `css/main.css` (variables, cards, stats, feeds, skins, wizard, health).
- **Behavior**: Lucide icons, simple page transitions, live-style ticker and event feed.

To tweak the look, edit `css/main.css` (especially `:root` and component classes).

---

## Cursor workflow

1. **Open the folder** in Cursor: `File → Open Folder → idea`.
2. **Run the app**: `npm start` or open `index.html` with Live Server.
3. **Edit**  
   - Layout / pages: `index.html`  
   - Styles: `css/main.css`  
   - Logic / routing: `js/app.js`
4. **Optional**: Initialize git with `git init` and add a `.gitignore` (e.g. `node_modules/`) when you’re ready.

You’re set to develop and run the Dropzone project in Cursor with a full-loaded, runnable setup.
