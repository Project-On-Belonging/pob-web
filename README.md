# Project on Belonging — Design Draft (v2, navy/yellow/red)

Plain HTML/CSS, no build step. Open `index.html` directly in a browser, or run a
local server (`python3 -m http.server`) from this folder.

## Local development

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000). (`npm start` does the same.)

## Structure

```
index.html                     homepage
convene.html / connect.html / collaborate.html / invest.html   pillar hubs
about.html / partner-with-us.html
festival-of-the-diaspora.html, diaspora-dialogues.html, sixth-region-summit.html
palante-labs.html, pob-studios.html
expectant-advisory.html
palante-capital.html, marketplace.html

styles.css                     the whole design system (one file, plain CSS vars)
site.js                        mobile menu + form submission (progressive enhancement, no dependencies)
images/                        real client photos + video-frame thumbnails
generate.js                    the Node script that generated every page below index.html
                                from shared layout/card/hero helpers — edit this, not the
                                individual HTML files, if you want a structural change
                                applied across every page at once (needs Node to run: `node generate.js`)
```

## Design system (all in `styles.css`, as CSS variables under `:root`)

- `--navy` (#0A212F) — dominant background color
- `--navy-light` (#122E3E) — card / alt surface
- `--yellow` (#FBB938) — supporting color, section accents
- `--red` (#D3432B) — supporting color, reserved for primary CTAs
- `--cream` (#FFFDFA) — text on navy, never a section background
- Headlines: **Big Shoulders Display** (loaded from Google Fonts in `styles.css`)
- Body: **Inter**

## Motion

All animation lives in the `Motion` block at the end of `styles.css` plus the "Motion"
section of `site.js`, so it applies to every page without touching any HTML. It is
subtle and fully opt-out: visitors with `prefers-reduced-motion` (or no JS) get the plain
static page.

- Hero copy rises in on load; the hero photo settles from a slight zoom.
- Sections and cards fade up as they scroll in (grids and filmstrips stagger).
- `.stat-num` values count up when scrolled into view (the real value stays in the DOM for
  screen readers). Years like `2022` roll up from four decades earlier instead of from 0.
- `.dot-pattern` wipes in on first view, then a soft wave of brighter, larger dots sweeps across it every
  few seconds (only while on screen).
- Hover polish: card lift + photo zoom, button lift, nav underline, dropdown fade, pulsing play button.

## Known gaps / next steps

- **Sixth Region Summit** has no real photo anywhere on the site — that convening
  is in the future (Atlanta, date TBD), so it's still a placeholder (`.photo-ph`
  class, diagonal stripe pattern). Swap in a real `<img>` once there's content.
- **Video is thumbnails only.** Every "video" on the site (PoB Studios hero,
  filmstrip, homepage video card) is currently a static frame grabbed from the
  source footage — there's no real embedded player. Once the videos are hosted
  somewhere (YouTube, Vimeo, etc.), replace the thumbnail `<img>`/background-image
  with a real `<iframe>` embed or video element. The PoB Studios play button
  already links out to `https://www.youtube.com/@projectonbelonging`.
- **Nav links are flat filenames** (`convene.html`, `palante-labs.html`, etc.),
  not the clean `/convene/` paths the production Netlify build uses. Fine for a
  static preview; adjust to match your routing once this moves into a real app
  or templating setup.
- A few photos are reused across more than one slot (e.g. the Festival staircase
  photo appears on both the homepage and the Convene hub) since that's what was
  available — swap in more variety as more photos come in.
- Every image's photographer/source credit should be confirmed before this goes
  live publicly — these came from the client's own Google Drive folder, but
  usage rights weren't part of this pass.

## Forms

The newsletter (homepage) and "Tell us what you want to achieve" (Partner With Us) forms are
written for [Netlify Forms](https://docs.netlify.com/forms/setup/) (`data-netlify`, honeypot,
`form-name`). They submit via `site.js` and show a success or error message. On a host without
a form backend the error message appears (with the `info@` address as a fallback), so point
them at your real backend before launch.
