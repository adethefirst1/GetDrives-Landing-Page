# Identify the Car – React game

Mini game for the GetDrives landing page. Built with React and Framer Motion.

**Cars data:** 70 Western car models (US, German, UK, French, Italian, Swedish, etc.). The game picks 7 at random each round. The main site has `images/car-1.jpg` through `images/car-12.jpg`; add `car-13.jpg` through `car-70.jpg` to the site’s `images/` folder for full variety (otherwise rounds 13–70 will show missing images).

## Build

From this folder:

```bash
npm install
npm run build
```

Output: `dist/car-game.js` and `dist/car-game.css`. The main `index.html` loads these from `car-game/dist/`.

## Dev

```bash
npm run dev
```

Serves the game only. To test inside the full site, serve the project root (e.g. `python -m http.server 8080` from the repo root) and open the landing page.
