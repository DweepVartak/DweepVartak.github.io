# Portfolio — where everything goes

Run it: `npm run dev` → http://localhost:5173
Build it: `npm run build` → `dist/`

---

## 1. Text — two files, nothing else

**`src/data/content.js`** — everything except projects:

| What | Field |
|---|---|
| Name, email, social links | `site` |
| The big "Hi. I'm Dweep." | `hero` |
| About paragraphs + photo caption | `about` |
| IIT Madras / Quidich / B.Tech | `experience` |
| Football, running, art… | `interests` |
| Line above your email | `contact` |

**`src/data/projects.js`** — one entry per project.

You should not need to open any `.jsx` file to change wording.

### Two things to know

`about.paragraphs` accepts HTML, so `<b>bold</b>` works there.
Everything else is plain text — a `<b>` tag elsewhere prints as literal characters.

`hero.sub` is a list. Each string becomes its own paragraph:

```js
sub: [
  "First paragraph.",
  "Second paragraph.",
],
```

---

## 2. Images — where each kind lives

| Folder | For | Referenced as |
|---|---|---|
| `src/assets/work/` | Project photos, videos, diagrams | `'work/device.jpg'` |
| `src/assets/life/` | Personal snaps for Interests | `'life/tuppy.jpg'` |
| `src/assets/frames/` | Tuppy's 12 drawings | *(automatic)* |
| `src/assets/photo.jpg` | Your About portrait | *(fixed name)* |
| `public/cv.pdf` | Your CV | *(fixed name)* |

Note the paths in the data files have **no leading slash and no `src/assets/`** —
just `'work/thing.jpg'`. Drop a file in the folder, reference it, done.

Anything not found renders as nothing rather than a broken image, so it's safe
to write the filename before you have the file.

**Tuppy**: drop a 13th drawing into `src/assets/frames/` and it joins the loop
automatically. Numbered files, transparent PNG, same canvas size as the others.

---

## 3. Adding a project

In `src/data/projects.js`:

```js
{
  slug: 'my-project',              // becomes /projects/my-project
  title: 'What it is called',
  year: '2025',
  award: 'Optional — shows in accent colour',

  card: {                          // the home page listing
    desc: 'One or two sentences.',
    stack: 'PyTorch · ROS 2',
    thumb: 'work/my-thumb.jpg',    // optional; omit and no image shows
  },

  page: null,                      // ← no detail page, just the listing
}
```

To give it a detail page at `/projects/my-project`, replace `page: null` with:

```js
page: {
  lede: 'One strong sentence under the title.',
  hero: { type: 'video', src: 'work/demo.mp4' },   // or type:'image', or null
  sections: [
    { h: 'The problem', p: 'A paragraph.' },
    { h: 'How it works', p: 'Another.' },
  ],
  figures: [
    { src: 'work/fig1.jpg', cap: 'Caption under the figure.' },
  ],
  links: [
    { label: 'Code', href: 'https://github.com/...' },
  ],
},
```

Videos autoplay muted and loop. Keep them under ~5 MB and 10 seconds:

```bash
ffmpeg -i in.mov -vf "scale=1280:-2,fps=24" -c:v libx264 -crf 28 -an out.mp4
```

---

## 4. Interests photos

In `content.js`, uncomment and point at real files:

```js
photos: [
  { src: "life/tuppy.jpg", cap: "the man himself" },
  { src: "life/ride.jpg",  cap: "somewhere near Lonavala" },
],
```

They render as tilted snapshots. Two or three is right; more reads as an album.

---

## 5. Colours and layout

All at the top of `src/css/App.css`:

```css
--beige   page background
--ink     all text
--accent  links and highlights
--max     content width (1040px)
--label   left rail the section names sit in (148px)
--floor   space kept clear at the bottom for Tuppy
```

Every text/background pairing clears WCAG AA contrast. If you change `--accent`,
check it stays at least 4.5:1 against `--beige`.

**Do not add `vector-effect: non-scaling-stroke` to `.scribble path`** — it breaks
the nav hover animation. There's a comment in `NavBar.css` explaining why.

---

## 6. Still to fill in

- `content.js` — nothing outstanding
- `projects.js` — Snake write-up; everything about the virtual tour; GitHub
  links per project; the Firebase URL for the live tour
- `public/cv.pdf` — not added yet
- Media: no files in `src/assets/work/` or `src/assets/life/` yet

---

## 7. Deploying

Works as-is on Vercel or Netlify — connect the repo, they detect Vite.

For GitHub Pages, `public/404.html` and a snippet in `index.html` already handle
the routing problem (a direct load of `/projects/x` would otherwise 404). You
also need `base` set in `vite.config.js` if the repo isn't named
`<username>.github.io`.
