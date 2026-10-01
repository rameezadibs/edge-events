# The Edge Events

A cinematic homepage hero, editorial Who We Are section and photographic Our Services section built with React, Vite, Tailwind CSS and Framer Motion.

## Run

```sh
npm install
npm run dev
```

In Windows PowerShell with restricted script execution, use `npm.cmd` instead of `npm`.

```sh
npm run build
npm run preview
npm test
```

Browser tests start their own Vite server on port 4175 and use installed Microsoft Edge. Set `PLAYWRIGHT_CHANNEL=chrome` to use installed Chrome instead.

## Components and behavior

- `Hero.jsx`: composition, selected experience, touch swipe, three photographic framings, headline choreography.
- `HeroPanel.jsx`: independent slanted masks, sequential Framer Motion reveals, gentle zoom and focus transitions.
- `HeroNavigation.jsx`: recreated SVG wordmark, desktop navigation, event CTA and menu.
- `HeroThumbnails.jsx`: four image selectors and previous/next controls. Desktop emphasizes the selected panel; mobile crossfades full-screen photographs.
- `HeroDialog.jsx`: native accessible dialogs, focus return, Escape dismissal, navigation and story placeholders.
- `WhoWeAre.jsx` and `WhoWeAre.css`: ivory editorial section, overlapping event imagery, experience rail, line icons, italic statement and story CTA. The hero About link scrolls here.
- `src/data/hero.js`: image configuration and optional brand film URL.
- `ServicesSection.jsx`, `ServicesIntro.jsx`, `ServicePanel.jsx`: dark services banner, responsive photographic panels and accessible service-detail dialogs. Content, images and links live in `src/data/services.js`. What We Do scrolls to the section; View all services scrolls to the panels.

The motion respects the system reduced-motion preference. Fonts and photos are served locally. The desktop composition switches to a single-image experience below 768px. Very short viewports retain a minimum usable height, allowing vertical scrolling when needed.

## Launch integration

The hero, Who We Are and Our Services sections are implemented. Other navigation destinations and event enquiries display explicit coming-soon dialogs until real routes and contact details are available. Set `siteConfig.storyUrl` to an approved film to enable playback from either story button.

The logo is a vector approximation of the supplied reference; replace it with the official brand asset when available.

## Photography sources

These images illustrate the design and are not represented as The Edge Events portfolio. Corporate, social and premium photographs are third-party editorial reference assets; publication rights have not been established. Replace them with brand-owned or licensed event photography before public deployment.

| File | Source |
| --- | --- |
| `corporate.jpg` | [Unlimited Productions — TCS conference](https://unlimited-productions.com/app/uploads/TCS.jpg) |
| `social.jpg` | [Inside Park at St. Bart’s — Wedding Spot](https://www.wedding-spot.com/venue/2476/inside-park-at-st-barts/) |
| `desert.jpg` | [Wendy Wei — Pexels, photo 3006007](https://www.pexels.com/photo/3006007/) |
| `premium.jpg` | [Vanessa Traina wedding — Vogue](https://www.vogue.com/slideshow/vanessa-traina-wedding-photos) |

Desert photography is illustrative; its specific location has not been verified as UAE. Bodoni Moda and Manrope are distributed under the SIL Open Font License; copies are included in `public/fonts`.

## Verification

Services uses real photographic references, with no newly generated images. New preview sources are [Address Downtown terrace](https://www.addresshotels.com/en/hotels/address-downtown/events/) (`services-dubai.jpg`), [Arabian Adventures private desert dinner](https://www.arabian-adventures.com/ae/english/desert-experiences/aa-exclusive-desert-experience.html) (`services-desert.jpg`), and [Opera Ballet Vlaanderen backstage, Marcel Lennartz](https://www.operaballet.be/nl/ontdek/ontdek/de-technische-helden-achter-de-schermen) (`services-production-warm.jpg`). Corporate and social panels reuse the event references listed above. These third-party assets are for design preview; publication rights have not been established and they should be licensed or replaced before launch. The exact scenes differ from the supplied art-direction reference. Services browser checks cover four/two/one-column layouts, image loading, overflow, in-page navigation, each detail dialog and keyboard focus restoration.

The Who We Are images (`public/images/about-styling.png` and `public/images/about-detail.png`) were created using the built-in image generation tool, and depict illustrative event preparation rather than actual company staff or portfolio work. Full prompts are recorded in `docs/about-image-prompts.md`. The supplied 10+ years claim is reproduced from the brief.

Playwright checks image loading, desktop panel count, thumbnail selection, arrow navigation, menu navigation, story dialog, focus restoration, mobile swipe, CTA visibility and overflow at mobile/tablet/desktop viewport sizes. Screenshots are written to `artifacts/`.
