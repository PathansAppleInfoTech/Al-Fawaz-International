# Al Fawaz International for Food Trading: website

React + Vite + Tailwind CSS, react-helmet SEO, Lenis smooth scroll.

## Run
npm install
npm run dev      # development
npm run build    # production build in /dist

## Where things live
- src/data/company.js: ALL company text, contact details, categories, image URLs (edit once, site updates)
- src/components: Header, Footer, BackToTop, WhatsAppFloat, SmoothScroll (Lenis + reveal animations)
- src/pages/*/page.jsx: each page's content and SEO (react-helmet)
- src/assets: logo.png (scrolled header and footer), logo-transparent.png (transparent header)
- public: favicon, og-logo.png, robots.txt, sitemap.xml

## Replace images
Unsplash URLs are in the `images` and `categories` entries of src/data/company.js.
Swap them for the client's own photos (keep the alt text meaningful).

## Reveal animations
Add data-reveal="up|left|right|fade|mask|arch|wipe" to any element.
Add data-group to a wrapper containing <span class="rv-line"><span>text</span></span> for line reveals.
