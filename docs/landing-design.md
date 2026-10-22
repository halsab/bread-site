# Landing design and motion

MoolYort Bakery follows the approved [visual direction](https://docs.google.com/document/d/17Pq11gb7BLebd3kNMHPCJfif_644eaUDAWBm7pLx2-s/edit) and [Russian copy](https://docs.google.com/document/d/1iU2h8yTxCfAdf0rSqTEzJkKxrV05ZV5uBpDjZCp1FzQ/edit), originally prepared under the former working name, with later project decisions recorded here. MoolYort Bakery remains a single-page brand and portfolio website presenting four breads and the baker's process. Telegram and MAX are personal contact channels for discussing bread orders with the baker. There is no cart, checkout, payment flow, or order database.

## Composition

A warm editorial photo essay uses Milk, Flax, Crust, Cocoa, and Olive. A wide headline leads into unequal photographic layers. The philosophy pairs a large ingredient photograph with an overlapping crumb detail. Four bread portraits use a four-column desktop, two-column tablet, and single-column mobile grid. The rye card reads: “Ржаной хлеб на закваске с тёмной корочкой и пористым мякишем. Хорош к супу, сыру или просто так.” The crust and crumb wording reflects the supplied image; serving ideas are editorial copy. Its displayed composition, “ржаная мука, вода, ржаная закваска, соль,” is a provisional draft that must be checked against the actual recipe; allergens remain unverified. The baker's portrait, hands, and dough form a three-image collage. A wide fresh loaf photograph bridges the milk page into the cocoa closing and footer.

The reference informed photographic scale, offset edges, whitespace, and quiet entrances. Its exact parallax curves and pinning were not established through visual inspection. MoolYort Bakery's bounded scroll-linked movement is an original interpretation. Photo overlays appear on the hero, philosophy, and baker-story images. No reference assets or source code are used.

Mobile uses a single reading sequence, smaller image overlaps, and reduced movement. At widths up to 400px, the longer MoolYort Bakery wordmark sits above the centered navigation. Text remains outside photographic overlaps. Native page scrolling and anchor navigation are preserved; there are no pinned scenes or artificial scroll distances.

The closing area pairs the farewell copy with a contact group bounded by thin top and bottom rules, with open sides and no fill. Its “Хотите заказать хлеб? Напишите мне” heading and underlined messenger links share a left edge. The heading invites visitors to discuss bread orders directly with the baker through the personal messenger links. The links use the display typeface at 1.5625rem, sit together with a 1.75rem gap, and wrap when needed. At widths up to 900px, the group follows the copy and aligns with the content column. The contact anchor focuses the compact heading, and keyboard focus remains visible on the heading and each link.

The assortment heading and its introductory sentence form one left-aligned group above the product grid. Both share the grid's maximum width, keeping the heading aligned with the product photographs on wide screens.

## Typography

Cormorant Garamond Medium supplies the Cyrillic display voice; Manrope Regular and Medium keep longer passages and navigation readable. Only the used Cyrillic and Latin WOFF2 subsets are hosted locally, with `font-display: swap`, serif/sans-serif fallbacks, and preloads for the two display subsets. Font assets total approximately 79 KB before licenses. No runtime request to a font CDN is required.

Sources: [Cormorant project](https://github.com/CatharsisFonts/Cormorant), [Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), and [Fontsource's maintained WOFF2 distribution](https://github.com/fontsource/font-files/tree/main/fonts/google). Each family's SIL Open Font License is retained in `public/fonts/`.

## Motion architecture

Photographic movement uses native CSS scroll-driven animations in `app/globals.css`. `MediaFrame` exposes a typed `data-photo-motion` profile, and CSS view timelines animate only the oversized inner image layer as its frame crosses the viewport. The frames remain in normal document flow, so the page does not pin sections or add artificial scroll distance. There is no JavaScript animation controller or animation dependency.

The motion profiles use restrained vertical, horizontal, gentle, and full-bleed movement. Overscan on the inner image layer keeps the frame covered throughout each translation. At widths up to 760px, portrait travel is reduced, horizontal details remain still, and full-bleed travel is shallower. Browsers without CSS view-timeline support show static images. The `prefers-reduced-motion` rule disables scroll movement, transitions, and smooth anchor scrolling.

The hero, crumb transition, and closing photograph share the same full-width frame styles: viewport-based height with desktop/mobile bounds, cover cropping, and the full-bleed motion profile. The hero retains eager image preloading but has no separate aspect-ratio or height override.

## Photography

Eleven WebP assets are used. Landscape assets are 1536 × 1024; portrait assets are 1122 × 1402. Aspect-ratio containers reserve their space, and responsive `sizes` declarations guide image delivery. The rye image is provisional generated editorial imagery and must not be described as an authentic photograph of the baker's bread. The repeated hero crumb image is decorative; informative photographs retain descriptive alternative text.

Authentic bakery photography and verified ingredients remain outstanding inputs. The rye sourdough asset is provisional generated imagery for editorial layout only. Existing imagery is retained for local design review; authenticity is not established by this design. Replace assets using the existing [photography inventory](image-inventory.md) when the baker supplies verified photographs. Telegram (`https://t.me/alisa_sabr`) and MAX (`https://max.ru/u/f9LHodD0cOIDSkO42jaZH-QksI9MMg-0iqhx4QJPqQkv3KChCeO60u-ov9M`) are the baker's supplied personal profile URLs. Both are always rendered as external links. Contact links do not imply availability, delivery, or response times.
