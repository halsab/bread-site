# Landing design and motion

The landing page follows the approved [visual direction](https://docs.google.com/document/d/17Pq11gb7BLebd3kNMHPCJfif_644eaUDAWBm7pLx2-s/edit) and [Russian copy](https://docs.google.com/document/d/1iU2h8yTxCfAdf0rSqTEzJkKxrV05ZV5uBpDjZCp1FzQ/edit), with the later project decisions recorded below. Bread remains a single-page brand and portfolio website presenting four breads and the baker's process. Telegram and MAX are personal contact channels; they do not provide ordering. There is no cart, checkout, payment flow, or order database.

## Composition

A warm editorial photo essay uses Milk, Flax, Crust, Cocoa, and Olive. A wide headline leads into unequal photographic layers. The philosophy pairs a large ingredient photograph with an overlapping crumb detail. Four bread portraits use a four-column desktop, two-column tablet, and single-column mobile grid. Product descriptions and preliminary ingredients remain with the three existing cards; the rye card contains only its confirmed name because no further product facts are verified. The baker's portrait, hands, and dough form a three-image collage. A wide fresh loaf photograph bridges the milk page into the cocoa closing and footer.

The reference informed photographic scale, offset edges, whitespace, and quiet entrances. Its exact parallax curves and pinning were not established through visual inspection. Bread's bounded scroll-linked movement is an original interpretation. Photo overlays appear on the hero, philosophy, and baker-story images. No reference assets or source code are used.

Mobile uses a single reading sequence, smaller image overlaps, and reduced movement. Text remains outside photographic overlaps. Native page scrolling and anchor navigation are preserved; there are no pinned scenes or artificial scroll distances.

## Typography

Cormorant Garamond Medium supplies the Cyrillic display voice; Manrope Regular and Medium keep longer passages and navigation readable. Only the used Cyrillic and Latin WOFF2 subsets are hosted locally, with `font-display: swap`, serif/sans-serif fallbacks, and preloads for the two display subsets. Font assets total approximately 79 KB before licenses. No runtime request to a font CDN is required.

Sources: [Cormorant project](https://github.com/CatharsisFonts/Cormorant), [Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), and [Fontsource's maintained WOFF2 distribution](https://github.com/fontsource/font-files/tree/main/fonts/google). Each family's SIL Open Font License is retained in `public/fonts/`.

## Motion architecture

Photographic movement uses native CSS scroll-driven animations in `app/globals.css`. `MediaFrame` exposes a typed `data-photo-motion` profile, and CSS view timelines animate only the oversized inner image layer as its frame crosses the viewport. The frames remain in normal document flow, so the page does not pin sections or add artificial scroll distance. There is no JavaScript animation controller or animation dependency.

The motion profiles use restrained vertical, horizontal, gentle, and full-bleed movement. Overscan on the inner image layer keeps the frame covered throughout each translation. At widths up to 760px, portrait travel is reduced, horizontal details remain still, and full-bleed travel is shallower. Browsers without CSS view-timeline support show static images. The `prefers-reduced-motion` rule disables scroll movement, transitions, and smooth anchor scrolling.

## Photography

Eleven WebP assets are used. Landscape assets are 1536 × 1024; portrait assets are 1122 × 1402. Aspect-ratio containers reserve their space, and responsive `sizes` declarations guide image delivery. The rye image is provisional generated editorial imagery and must not be described as an authentic photograph of the baker's bread. The repeated hero crumb image is decorative; informative photographs retain descriptive alternative text.

Authentic bakery photography and verified ingredients remain outstanding inputs. The rye sourdough asset is provisional generated imagery for editorial layout only. Existing imagery is retained for local design review; authenticity is not established by this design. Replace assets using the existing [photography inventory](image-inventory.md) when the baker supplies verified photographs. The Telegram and MAX profile URLs also remain outstanding; both links are emitted only when both HTTPS profile URLs are configured, and are omitted until then. Contact links do not imply availability, ordering, delivery, or response times.
