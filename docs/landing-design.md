# Landing design and motion

The landing page preserves the approved [visual direction](https://docs.google.com/document/d/17Pq11gb7BLebd3kNMHPCJfif_644eaUDAWBm7pLx2-s/edit) and [Russian copy](https://docs.google.com/document/d/1iU2h8yTxCfAdf0rSqTEzJkKxrV05ZV5uBpDjZCp1FzQ/edit). These documents remain authoritative for product requirements. The site is a presentation of three breads and the baker's process; contact and commerce features require separate approval.

## Composition

A warm editorial photo essay uses Milk, Flax, Crust, Cocoa, and Olive. A wide headline leads into unequal photographic layers. The philosophy pairs a large ingredient photograph with an overlapping crumb detail. Bread portraits have staggered starting positions while keeping their descriptions and provisional ingredients together. The baker's portrait, hands, and dough form a three-image collage. A wide fresh loaf photograph bridges the milk page into the cocoa closing and footer.

The reference informed photographic scale, offset edges, whitespace, and quiet entrances. Its exact parallax curves and pinning were not established through visual inspection. Bread's bounded scroll-linked movement is an original interpretation. Photo overlays appear on the hero, philosophy, and baker-story images. No reference assets or source code are used.

Mobile uses a single reading sequence, smaller image overlaps, and reduced movement. Text remains outside photographic overlaps. Native page scrolling and anchor navigation are preserved; there are no pinned scenes or artificial scroll distances.

## Typography

Cormorant Garamond Medium supplies the Cyrillic display voice; Manrope Regular and Medium keep longer passages and navigation readable. Only the used Cyrillic and Latin WOFF2 subsets are hosted locally, with `font-display: swap`, serif/sans-serif fallbacks, and preloads for the two display subsets. Font assets total approximately 79 KB before licenses. No runtime request to a font CDN is required.

Sources: [Cormorant project](https://github.com/CatharsisFonts/Cormorant), [Google Fonts](https://github.com/google/fonts/tree/main/ofl/manrope), and [Fontsource's maintained WOFF2 distribution](https://github.com/fontsource/font-files/tree/main/fonts/google). Each family's SIL Open Font License is retained in `public/fonts/`.

## Motion architecture

`LandingMotion` is the only client-side animation controller. It enhances server-rendered `MediaFrame` figures using their typed motion keys. With JavaScript unavailable, all content and imagery remain visible in the authored composition.

- Hero: the photographs enter from 72% to full opacity over 850 ms while the headline copy enters over 600 ms. Opposing vertical movement separates the dominant loaf and supporting crumb detail; the main image slowly relaxes its scale.
- Philosophy: the large portrait and detail move at different speeds; the detail's lower crop opens as it enters the viewport.
- Assortment: short, restrained photographic travel and scale changes preserve the association with each description.
- Baker: three distinct trajectories create depth; the hands photograph receives a small entry reveal.
- Closing: a shallow bottom reveal and gradual scale change introduce the final loaf, which bridges the Milk strip into the Cocoa closing. The Cocoa background continues through the footer.

The controller schedules one animation frame per scroll/resize update, caches layout measurements, and applies transforms plus selective clip paths. It never runs an idle animation loop. ResizeObserver and font readiness keep geometry current. Event listeners, scheduled work, and inline styles are cleaned up on unmount. A live reduced-motion preference disables the controller and resets all enhancements; CSS also disables entrances, hover motion, and smooth anchor scrolling. Mobile movement is 28% of the desktop travel.

Native CSS scroll timelines would require a fallback across the target browsers; GSAP or Motion would add a dependency for bounded effects that need no physics or pinning. A small event-driven controller provides the required fallback behavior directly. No dependency or infrastructure changes are introduced.

## Photography

All ten existing WebP assets are reused. Landscape assets are 1536 × 1024; portrait assets are 1122 × 1402. Aspect-ratio containers reserve their space, and responsive `sizes` declarations guide image delivery. The repeated hero crumb image is decorative; informative photographs retain descriptive alternative text.

The approved documents still identify authentic bakery photography and recipes as outstanding inputs. Existing imagery is retained for local design review; authenticity is not established by this redesign. Replace assets using the existing [photography inventory](image-inventory.md) when the baker supplies verified photographs. No additional scene is necessary for the composition.
