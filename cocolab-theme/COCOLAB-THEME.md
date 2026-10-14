# CocoLab Theme · Design Guide v1.0

This pack describes the look and behaviour of the CocoLab website, home of CocoRoute, CocoMio and CocoTrado. Give it to a developer or an AI website builder, and they can build a new site that looks and feels the same.

| File | What it is |
|---|---|
| `COCOLAB-THEME.md` | This guide: the rules, the values and the reasons |
| `cocolab-theme.css` | Ready-to-use stylesheet: every colour, font size, component and animation |
| `cocolab-theme.js` | Optional behaviour: day/night switch, scroll reveal, rotating headline, pagination dots, confetti |
| `example.html` | One page that uses every component. Open it in a browser to see the theme |

**Quick start.** Put the three files next to your page and start from this skeleton:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Fredoka:wght@500;600;700&family=Figtree:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="cocolab-theme.css">
</head>
<body>
  <header class="site-head">…</header>
  <main>…</main>
  <footer class="site-foot">…</footer>
  <script src="cocolab-theme.js"></script>
</body>
</html>
```

---

## 1. The feel

> **Playful on the outside, careful on the inside.**

A clean **white page** with **pastel colour coming from the products**. Headings use **chunky, rounded letters**. Buttons sit on a **solid shadow and press down** when clicked. Things **bounce, drop in and bob**, but only in ways that help the reader, and everything sits still for visitors who turn motion off. It works the same in **day and night mode**.

It should feel **friendly enough for an HR app and trustworthy enough for a money app**.

**Six principles**

1. **White first.** The page is white (night: deep plum). Colour belongs to products and actions, never to the whole page.
2. **One product, one colour.** Each product owns one accent (blue, green, violet). A section uses one accent at a time.
3. **Round and soft.** Big radii, 2px borders, pill shapes. No sharp corners, no thin hairlines.
4. **Things you can press look pressable.** Solid bottom shadow in a darker shade; it collapses on click.
5. **Motion has a job.** Draw the eye to the headline, show that something changed, celebrate a sent form. Nothing loops in a way that blocks reading.
6. **Plain words.** Short sentences, no hype, no invented numbers.

---

## 2. Colour

### 2.1 Neutrals

| Token | Day | Night | Used for |
|---|---|---|---|
| `--bg` | `#FFFFFF` | `#16131D` | Page background |
| `--panel` | `#FAF8F4` | `#1E1A28` | Alternate full-width bands, table header cells |
| `--card` | `#FFFFFF` | `#1B1724` | Cards, tiles, menus |
| `--chip` | `#F7F3EC` | `#241F30` | Pills, nav hover |
| `--ink` | `#2A2438` | `#F3F0F8` | Headings and body text |
| `--muted` | `#5B5470` | `#B7B0C6` | Secondary text |
| `--line` | `#EFEAE2` | `#302A3C` | Borders and dividers |
| `--dot` | `#E4DCCF` | `#433B52` | Inactive dots, dotted lines |
| `--shadow` | `rgba(42,36,56,.28)` | `rgba(0,0,0,.55)` | Soft shadows |
| `--night` | `#2A2438` | `#0F0D14` | Dark button (it turns light in night mode) |

### 2.2 Product accents: six tokens each

Every accent comes as a set of six, so it works on buttons, labels, fills and borders, by day and by night.

| Role | What it's for | CocoRoute · Ocean Blue | CocoMio · Leaf Green | CocoTrado · Violet |
|---|---|---|---|---|
| `base` | Buttons, active dots, timeline line | `#1C7ED6` | `#58CC02` | `#6B3FE0` |
| `-dark` | The press shadow under buttons | `#1462A8` | `#46A302` | `#4B26B8` |
| `-on` | Text on the base colour | `#FFFFFF` | `#10330A` | `#FFFFFF` |
| `-text` | Labels on white | `#1864AB` | `#235A00` | `#4B26B8` |
| `-tint` | Pale fills | `#E7F1FC` | `#F2FBEA` | `#F5F1FF` |
| `-line` | Borders, card shadows | `#C3DDF7` | `#D9F2C4` | `#E3DAFF` |
| `-text` night | Labels on dark | `#74B6F2` | `#9BE36A` | `#C4B2FF` |
| `-tint` night | Fills on dark | `#0F1E30` | `#1B2716` | `#221B38` |
| `-line` night | Borders on dark | `#1F3A5C` | `#2F4A22` | `#3B2F66` |

**How components pick a colour.** Components never name a product. They read `--acc`, `--acc-dark`, `--acc-on`, `--acc-text`, `--acc-tint` and `--acc-line`. You choose the product with an attribute on any element, or on `<body>` for a whole page:

```html
<section class="sec" data-accent="trado"> … everything inside is violet … </section>
```

**Adding a fourth colour** (for a new product):
1. Add six tokens next to the others, for example `--grow:#F08C00; --grow-dark:#C46F00; --grow-on:#2A1600; --grow-text:#A35A00; --grow-tint:#FFF4E5; --grow-line:#FFDDB0;`
2. Add the three night versions (`-text`, `-tint`, `-line`) to both night blocks.
3. Add `[data-accent="grow"]{--acc:var(--grow); …}` to the accent mapping.

Rules for a new accent: it must look clearly different from blue, green and violet. White or dark text on it must be readable (contrast 4.5:1 or better). `-dark` is about 20% darker than the base. `-tint` is almost white.

### 2.3 Brand extras

| Token | Value | Used for |
|---|---|---|
| `--coconut` | `#8A5A2B` | The dot in the CocoLab brand mark |
| `--cream` | `#FFE3C2` | The brand mark tile |
| `--sun` | `#FFC83D` | Sun in the hero and on the day/night switch |
| `--highlight` | `rgba(255,176,32,.45)` | Highlighter stroke under one headline word |
| `--sky-a` → `--sky-b` | `#E3F4FF → #FFFFFF` (night `#231C3A → #16131D`) | Hero sky gradient |
| Contact gradient | `#E3F4FF → #F1ECFF` (night `#17233A → #231A3B`) | Contact card |
| Progress bar | blue → green → violet | Thin bar under the header that fills as you scroll |

### 2.4 Colour rules

- One saturated block per screen at most (a CTA band or a big button). Everything else is white, tint or line.
- The header button is always the **dark** button (`.btn-dark`). Product buttons use their accent (`.btn-acc`).
- Never put accent text on an accent tint of a *different* product.

---

## 3. Typography

Two Google fonts, both free (SIL Open Font License):

- **Fredoka** (500, 600, 700): headings, product names, big numbers. Rounded and friendly.
- **Figtree** (400 to 800): everything else. Clean and very readable.

| Use | Font | Size | Weight | Notes |
|---|---|---|---|---|
| Hero headline (h1) | Fredoka | `clamp(44px, 7.4vw, 92px)` | 700 | line-height 1.05, `text-wrap: balance` |
| Section heading (h2) | Fredoka | `clamp(32px, 3.6vw, 46px)` | 700 | |
| Contact heading | Fredoka | `clamp(34px, 3.8vw, 48px)` | 700 | |
| Product name on a tile | Fredoka | 28px | 700 | |
| Card heading (h3) | Fredoka | 20–22px | 700 | |
| Lead paragraph | Figtree | `clamp(17px, 1.6vw, 21px)` | 400 | colour `--muted`, max ~720px wide |
| Body | Figtree | 17px | 400 | line-height 1.55 |
| Card text | Figtree | 15–16px | 400 | colour `--muted` |
| Button | Figtree | 16px | 800 | |
| Eyebrow (above a heading) | Figtree | 13px | 800 | UPPERCASE, letter-spacing .08em, accent text colour |
| Small label / tag | Figtree | 12px | 800 | UPPERCASE, letter-spacing .04–.05em |
| Small print | Figtree | 13px | 400 | colour `--muted` |

Numbers in tables, times and balances use `font-variant-numeric: tabular-nums`.

---

## 4. Layout and spacing

- **Column:** `.wrap`, max 1280px wide, side gutter `clamp(16px, 5vw, 80px)`.
- **Header:** sticky, 80px tall plus a 1px border (81px). The first screen fills the rest: `min-height: calc(100svh - 81px)`.
- **Section rhythm:** 88px between big sections (`.section`), 56px inside product pages (`.sec`).
- **Gaps:** 14px (form fields), 16px (card grids), 20px (tiles), 48px (two-column blocks).
- **Full-bleed backgrounds:** bands and the hero sky run edge to edge while the content stays in the column. The trick is a pseudo-element or layer with `inset: 0 calc(50% - 50vw)`. Use `.sec.alt` for a pale band.
- **Breakpoints:**
  - 1080px: the nav collapses into the menu button.
  - 960px: tablet. Tiles become a sideways swipe row, two-column blocks stack, the timeline line moves to the left edge.
  - 560px: phone. The hero aligns left, forms go to one column, buttons go full width.

---

## 5. Shape and depth

| Radius | Where |
|---|---|
| 99px (pill) | Pills, tags, dots, the switch, avatars |
| 12–14px | Nav links, inputs, small buttons |
| 18px | Buttons, FAQ items |
| 20–24px | Small cards, feature cards |
| 28–32px | Tiles, menus, tables, CTA band |
| 40–44px | Large cards (contact card, product timeline cards) |

- **Borders:** 2px, in `--line` or the accent `-line`. Never 1px, except the header's bottom border.
- **Press-down depth:** a solid shadow straight down, no blur: `box-shadow: 0 5px 0 var(--acc-dark)` on buttons and `0 6px 0 var(--acc-line)` on tiles. On click it moves down 4px and the shadow disappears.
- **Soft depth:** only for floating things (menus, preview cards): `0 40px 80px -30px var(--shadow)`.

---

## 6. Components

All of these are in `cocolab-theme.css` and shown in `example.html`.

### Header
Brand mark (cream tile with a coconut dot), "CocoLab" in Fredoka 26px, nav links in `--muted`, then the day/night switch and a dark "Book a demo" button. It gets a bottom border after 8px of scrolling. A 4px progress bar under it fills blue → green → violet as you scroll.

### Day / night switch
A sky-blue track with a sun and a cloud. Pressed, the sun rolls across and turns into a moon with craters, the cloud drops away and three stars pop in (`.daynight` + `role="switch"`). Copy the markup from `example.html`.

### Buttons
```html
<a class="btn btn-dark" href="#contact">Book a demo</a>          <!-- header / main action -->
<a class="btn btn-acc" href="…">Go to CocoRoute website ↗</a>  <!-- product action (needs data-accent) -->
<a class="btn btn-ghost" href="…">Everything CocoRoute does →</a> <!-- secondary -->
```
Minimum height 52px. They wobble like jelly on hover and press down on click.

### Pill, tag, eyebrow
```html
<span class="pill">CocoLab · Software made in the UAE</span>
<span class="tag" data-accent="route">CRM FOR FREIGHT FORWARDERS</span>
<span class="eyebrow">Features</span>
```

### Hero (first screen)
- `.first-screen` fills the screen under the header and holds the sky, the headline and the product tiles.
- `.sky`: a soft vertical gradient. By day a slowly spinning sun; at night a moon and six twinkling stars.
- Up to three product logos float and bob around the headline (`.float`, hidden on phones).
- **Headline pattern:** two short sentences, with one key word highlighted: "Three products. One *team.*"
- Each word is its own `<span class="w" style="--d:N">` and drops in, one after another. The highlighted word gets `.hl`, and its highlighter stroke draws itself after the word lands.
- **Rotating headline (optional):** list more lines in `data-rotate`, separated by `|`, with `*stars*` around the highlighted word. It switches every 4.5s in random order, never repeats one twice in a row, keeps its height, and pauses on hover, off screen and in hidden tabs.

```html
<h1 data-rotate="Less admin. More *done.*|Pick one, or use them *all.*">
  <span class="w" style="--d:0">Three</span> <span class="w" style="--d:1">products.</span>
  <span class="w" style="--d:2">One</span> <span class="w hl" style="--d:3">team.</span>
</h1>
```

### Product tiles with pagination dots
A rounded card with a coloured border and press-down shadow, a 56px logo, the name, a small uppercase label and one sentence. Give it `data-features` and the script adds dots. Each dot swaps only the text, with a soft fade, and the active dot stretches into a pill in the product colour.

```html
<div class="tile" data-accent="mio"
     data-features='[["Punch clock","Employees punch in from their phone."],["Leave requests","Ask, approve and see the balance."]]'>
  <div class="tile-head"><svg class="logo" width="56" height="56"><use href="#logo-mio"/></svg>
    <span class="nm"><b>CocoMio</b><span>HR &amp; LEARNING APP</span></span></div>
  <p>For HR teams and employees: attendance, leave, learning and career growth.</p>
  <a class="tile-foot" href="…"><span class="t-acc">Learn more</span><span>Full page →</span></a>
</div>
```

### Day timeline ("A day with …")
A solid line in the accent colour runs down the middle. Dots sit **on top** of the line, cards alternate left and right, and the times are in Fredoka. On phones the line moves to the left edge. Use `.day` > `.step` (add `.flip` to every second step).

### Feature cards
White cards with a tinted icon square. Pressed, the card's border turns the accent colour, the icon fills and jiggles, and a "how it works" paragraph opens. They are `<button class="feat">`, so they work with a keyboard.

### Other blocks
- **Values:** `.values > .value[data-accent]`, three pastel cards.
- **Comparison table:** `.table-scroll > table`, rounded border, pale row headers, one product per column.
- **FAQ:** native `<details>` in `.faq`; the round "+" turns into "×".
- **CTA band:** `.cta-band`, a full accent block with a soft floating circle and a dark button.
- **Contact card:** `.contact`, a sky-to-lavender gradient card with the form. Its own colours are the `--c-*` tokens. When the form is sent, call `CocoTheme.confetti(el)` for a burst in the product colours.
- **Footer:** a 2px top border, the brand, links, ©.

---

## 7. Motion

**Easing**
- `--bounce: cubic-bezier(.34,1.56,.64,1)` overshoots once. Use it for pop-ins, lifts and reveals.
- `--spring: cubic-bezier(.68,-.55,.27,1.55)` winds back first. Use it for switches, sliders and the dot pill stretching.

**Catalogue**

| Animation | Where | Duration |
|---|---|---|
| `dropIn` | Headline words fall in, staggered 0.12s | .9s, bounce |
| `dropOut` | Old headline words fall away when the headline rotates | .45s |
| `hlDraw` | Highlighter stroke draws under the key word | .5s |
| `popIn` | Pills, logos, chips appear | .6–.7s, bounce |
| `rise` | Sub-headline and opened content slide up | .4–.7s |
| `bob` | Floating logos and preview cards drift up and down | 4–6s loop |
| `wiggle` | A logo on hover | .5s |
| `jelly` | A button on hover, a feature icon on open | .5s |
| `jiggle` | A small "won" badge, every few seconds | 2.6s loop |
| `spin` / `twinkle` | Sun / stars in the sky | 18s / 2.4s loop |
| Scroll reveal | Cards rise 40px and scale up from .97 as they enter, staggered with `--i` | .7–.8s |
| `burst` | Confetti | 1.1s |
| Theme change | Every colour cross-fades | .6s |

**Rules**
- Only content **below the first screen** is hidden for the scroll reveal, so nothing on screen flickers on load.
- Timed changes (rotating headline, tile dots) pause on hover, when they are off screen and when the tab is hidden. Decorative loops (bob, sun) are slow and gentle.
- Motion never changes layout. Rotating text keeps its height, and fading text keeps its box.
- **Reduce motion:** with `prefers-reduced-motion: reduce`, every animation and transition is switched off and everything simply shows. This is required, not optional.

---

## 8. Day and night

- The first visit follows the device setting (`prefers-color-scheme`).
- After the visitor presses the switch, their choice is stored in `localStorage` (`cocolab-theme` = `light` or `dark`) and set as `data-theme` on `<html>`.
- Night values live in two places, the media query and `:root[data-theme="dark"]`. Keep them identical.
- Any component with its own colours (like the contact card) needs a night version of those colours.
- In the sky, the sun sinks and the moon rises. Labels switch to the lighter `-text` accent shades.

---

## 9. Words

- **Plain and short.** "Enquiries, quotes and customers in one place." Not "A revolutionary end-to-end solution".
- **Say who it's for.** "For HR teams and employees: …", "For buying agents who hold client money: …"
- **Headlines:** two short sentences with one underlined word. "Less admin. More done."
- **Buttons say what happens.** "Book a demo", "Go to CocoRoute website ↗". Use ↗ for links that open another site and → for links within the site.
- **No made-up numbers.** Sample screens say "Illustrative". Unknown values are written as `[rate]` or `[Customer]`.
- British spelling (colour, organise), sentence case, no exclamation marks.

---

## 10. Accessibility checklist

- Text contrast is at least 4.5:1 in both modes. The `-text` accent shades exist for this reason. Measured: muted text on white 7.1:1, accent labels on white 6.1–9.3:1, night text 8.5–11.9:1.
  - **One known exception:** white text on the Ocean Blue button (`#1C7ED6`) is 4.2:1. That's fine for large bold text. For strict AA at 16px, use `--route-dark` (`#1462A8`, 6.3:1) as the button colour.
- Focus ring: 3px outline in the accent colour, offset 3px.
- Touch targets are at least 44px (buttons 52px, inputs 48px).
- The switch uses `role="switch"` and `aria-checked`. Feature cards are buttons with `aria-expanded`. Pagination dots have labels ("Show Punch clock").
- A rotating headline keeps one fixed accessible name (`aria-label` on the `<h1>`).
- Decorative SVGs and the sky have `aria-hidden="true"`.

---

## 11. Do and don't

| Do | Don't |
|---|---|
| White page, colour in tiles, buttons and bands | Fill whole pages with a product colour |
| One accent per section | Mix two product colours in one card |
| 2px borders, big radii, press-down shadows | Thin 1px borders, sharp corners, blurry drop shadows on buttons |
| Fredoka for headings only | Fredoka for paragraphs |
| Bouncy motion that settles quickly | Fast attention-grabbing loops, parallax, motion behind text |
| Real or clearly labelled sample content | Invented statistics, fake client logos |
| Test day, night, phone and reduced motion | Ship a night mode nobody has looked at |

---

## 12. Prompt for an AI website builder

Copy this, attach the four files, and add your own content:

> Build a website using the attached **CocoLab theme** (`cocolab-theme.css`, `cocolab-theme.js`, `COCOLAB-THEME.md`, `example.html`). Follow the guide exactly: white page, Fredoka headings and Figtree body text, product accents through `data-accent`, 2px borders, big radii, press-down buttons, bouncy motion that respects reduced motion, and day/night mode with the sun-and-moon switch. Start from `example.html` and reuse its components (header, full-screen hero with sky and word-by-word headline, product tiles with pagination dots, day timeline, feature cards, FAQ, CTA band, contact card, footer). Use plain, short sentences and no invented numbers. The site is for: **[describe the business, its products and its audience]**.

---

## 13. Source

This theme was taken from the live CocoLab site (`index.html` and `product.css` in the CocoLab repository, github.com/Lalson/cocolab). If the site changes, update `cocolab-theme.css` and this guide together.
