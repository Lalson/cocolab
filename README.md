# CocoLabs website

The company site for CocoLabs: one home page and one page per product (CocoRoute, CocoMio, CocoTrado).
Plain HTML, CSS and JavaScript. No framework, no build step for the home page.

## Run it locally

```bash
npm start          # or: node serve.js
```

Then open http://localhost:5000. Clean URLs work: `/cocoroute`, `/cocomio`, `/cocotrado`.
Any static host (Netlify, Vercel, GitHub Pages, nginx) can serve the folder as it is.

## Files

| File | What it is |
|---|---|
| `index.html` | The home page. Self-contained: its CSS and JS are inside it. |
| `cocoroute.html`, `cocomio.html`, `cocotrado.html` | The product pages. **Generated.** Do not edit by hand. |
| `privacy.html`, `terms.html`, `company.html` | Privacy notice, terms of use and company details. **Generated** by `build-products.js`; edit the text there. |
| `about.html` | The About page. **Generated** by `build-products.js`. The story and milestones are in `ABOUT` there; while one is empty the page shows a dashed "to write" box, drafts flagged in `ABOUT.draft` show in a dashed "draft" box with [blanks] highlighted, and `npm run build` says how many are left. |
| `404.html` | The page GitHub Pages shows for an address that does not exist. **Generated.** |
| `products-data.js` | All the content of the product pages, in one place. |
| `build-products.js` | Builds the product pages from the data: `npm run build`. |
| `product.css`, `product.js` | Styling and behaviour shared by the product pages. |
| `serve.js` | The local dev server. |
| `logo.svg`, `apple-touch-icon.png` | The CocoLabs swirl logo: header, footer and browser-tab icon; the PNG is the phone home-screen icon. |
| `og-image.png` | The 1200×630 picture shown when a page is shared on LinkedIn, WhatsApp or Slack. |

## Live site

https://cocolabs.eu is served by GitHub Pages from the `claude/sweet-einstein-nkqqs2` branch (repository root).
Pushing to that branch republishes the site in about a minute. The domain is registered at GoDaddy, whose DNS
has four `A` records for `@` (185.199.108.153, .109.153, .110.153, .111.153) and a `CNAME` for `www` pointing to
`lalson.github.io`. The `CNAME` file holds the domain; `.nojekyll` stops GitHub from processing the files.

## Company details

The legal entity is **CocoLabs OÜ** (Estonia, registry code 17630550, registered 22.10.2026); the brand is CocoLabs.
Its details live in `COMPANY` at the top of `build-products.js` (product pages and the privacy notice) and in the
footer and contact section of `index.html`. If they change, update both places and run `npm run build`.

## Demo form

The form on the home page sends requests through [Web3Forms](https://web3forms.com), a free form service.
Put the access key that Web3Forms emails to the company mailbox in `FORM_KEY` in `index.html` (it is meant to be public).
While `FORM_KEY` is empty, or if sending fails, the form opens the visitor's email app with the request filled in.

## Change a product page

1. Edit `products-data.js`.
2. Run `npm run build`.
3. Commit the data file **and** the regenerated pages.

## Add a fourth product

1. Add an entry to `PRODUCTS` in `products-data.js` and its key to `ORDER`.
2. Add its colours as `--name-*` tokens and a `body[data-product="name"]` rule in `product.css`, and its logo as a `<symbol id="logo-name">` in `index.html`.
3. On the home page, copy one product block in the five places listed in the comment at the top of `<main>` in `index.html`.
4. Run `npm run build`.

Everything count-based ("Four products. One team.", "PRODUCT 2 OF 4", the tile layout) updates itself.
