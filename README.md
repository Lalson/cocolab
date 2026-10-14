# CocoLab website

The company site for CocoLab: one home page and one page per product (CocoRoute, CocoMio, CocoTrado).
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
| `privacy.html` | The website's privacy notice. **Generated** by `build-products.js`; edit the text there. |
| `products-data.js` | All the content of the product pages, in one place. |
| `build-products.js` | Builds the product pages from the data: `npm run build`. |
| `product.css`, `product.js` | Styling and behaviour shared by the product pages. |
| `serve.js` | The local dev server. |

## Company details

The legal entity is **CocoLab Intelligence OÜ** (Estonia); the brand is CocoLab. Its details live in `COMPANY` at the top of
`build-products.js` (product pages and the privacy notice) and in the footer and contact section of `index.html`.
When the registry code and registered address arrive, fill them in both places and run `npm run build`.

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
