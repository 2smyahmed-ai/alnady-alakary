# النادي العقاري — Landing Page

Arabic-first (RTL) landing page for The Real Estate Club. Plain HTML, CSS and
vanilla JavaScript — no framework, no build step, no dependencies.

## Running it

```bash
python -m http.server 8000
# then open http://localhost:8000
```

Opening `index.html` straight from disk also works — scripts are plain
`defer`-loaded files rather than ES modules, precisely so that it does.

## The art direction in one paragraph

The page runs on **two surfaces, not one**: INK (deep navy-black) for the
photographic chapters, BONE (warm off-white) for the editorial and credit
chapters. Alternating them is what gives the page its rhythm, and it is what
lets seventeen client logos appear in their own brand colours instead of being
flattened to white. Geometry is square — the logo mark is drawn from straight
architectural lines, so rounded corners fight it. Hierarchy comes from **scale
and hairlines**, not from cards: there is not a single bordered box on the
page. Accent green is rationed to calls to action and a handful of markers.

**Typography** is one family throughout: IBM Plex Sans Arabic. An earlier
draft paired it with Reem Kufi for display, but the client found the kufi
headings hard to read at a glance — this is the plain, high-clarity register
Saudi corporate sites are set in, and hierarchy now comes from weight and size
rather than a second, more decorative face. Tracking stays at zero except on
the small caps labels: Arabic letterforms join, and wide letter-spacing
visibly breaks them.

## What the page is selling

Event organisation is the revenue, so it is the loudest thing on the page.
**اطلب تنظيم فعاليتك** is the primary action in the header, the hero, the end
of the services chapter, every project dialog, and the floating button.
**شاهد أعمالنا** is the hero's secondary. Joining the community is kept, but
steps back: it is an outline button in the header and in its own chapter.

The floating WhatsApp button is a bare icon on desktop, where the header
already keeps the same CTA in view, and only carries its label on phones,
where the header CTA is hidden.

## Chapter order

```
Hero            ink  · full-bleed brand visual, one very large headline
Trust numbers   bone · five cumulative figures since 2014
Credits strip   bone · client logos in colour, marqueeing
About           bone · the club's description opposite its five values
Story           bone · 2014 / 2021 / 2024 timeline, then vision and mission
Services        ink  · five stages on one continuous rule + the primary ask
Projects        ink  · one full-bleed feature, then a gallery strip; every
                       project opens a detail dialog
Clients         bone · the logo wall, split into two groups
Community       ink  · the membership ask, deliberately quieter
Footer          ink
```

## Where to edit what

```
index.html                 All markup, including each project's detail content
                           in a <template> beside its card.
css/
  variables.css            Design tokens. Two surfaces, type scale, spacing,
                           geometry, motion. Start here for global changes.
  base.css                 Reset, .container, .on-bone inversion, .label, focus.
  buttons.css              Button family + the floating WhatsApp button.
  header.css               Sticky header, desktop nav, mobile drawer.
  hero.css                 Hero + the client credits strip beneath it.
  stats.css                The trust-numbers band under the hero.
  sections.css             Chapter shell: padding rhythm, headings, photographic
                           backdrops and their veils.
  about.css                The statement spread and the numbered value index.
  story.css                Timeline milestones, vision and mission.
  services.css             The five-stage process line and its call to action.
  projects.css             Featured project, gallery strip, detail triggers.
  dialog.css               The project detail dialog.
  trust.css                The client logo wall.
  community.css            Membership statement, criteria band, secondary CTA.
  footer.css               Footer.
  animations.css           Keyframes, scroll reveal, reduced-motion contract.
  responsive.css           All breakpoint overrides, in one place.
js/
  main.js                  Entry point; also clones the marquee group.
  components/navigation.js Sticky header, drawer + focus trap, scroll-spy,
                           floating CTA visibility.
  components/gallery.js    Arrows, keyboard paging, progress rail.
  components/dialog.js     Project detail dialog.
  components/reveal.js     IntersectionObserver scroll reveals.
assets/
  images/                  Photography, cut for the composition it sits in.
  logos/                   Club mark, wordmark, stacked lockup, favicons.
  partners/                17 client logos, full colour, transparent PNG.
```

Stylesheets are linked in cascade order in `index.html`; `responsive.css` is
last so breakpoint rules always win. They ship unminified and unbundled on
purpose — the files are the documentation.

## Adding project detail content

Each project's dialog content lives in a `<template>` next to its card, so the
copy sits in the HTML where it can be read and edited. The dialog shows the
title, a photograph, and a `<dl class="detail__facts">` of client, location,
year and event type. To add the scope of work or the outcome once the client
supplies them per project, drop a `<ul class="detail__list">` into
`.detail__body` — the styling is already there. Nothing renders empty.

## Three traps worth knowing about

- **`.ltr` sets `direction` on the element it is applied to**, so any logical
  `inset-*` / `border-inline-*` on that same element resolves LTR. Keep it on
  leaf text nodes only; pure digit strings do not need it at all.
- **A percentage `max-height` on a stretched flex or grid item is ignored** —
  there is no definite height to resolve against. The client logos size the
  `<img>` itself with `object-fit: contain` for exactly this reason, which is
  what gives seventeen differently proportioned marks one footprint.
- **A modal `<dialog>` is only centred on the inline axis by the UA sheet**,
  which leaves it pinned to the top of the viewport. `dialog.css` sets
  `position: fixed; inset: 0; margin: auto` explicitly.

## Asset provenance

The client supplied a flat sheet of logos and a logo on a solid navy plate.
Both were processed once into reusable web assets — background removed to
alpha, cropped, resized, quantised. Client logos keep their original colours;
the bone chapters exist partly so they can.

`أثمن العقارية` was struck through on the supplied sheet and is excluded.

The hero art (`assets/images/hero-bg.jpg`) is a staged brand visual supplied by
the client, not documentation of a named event, so it carries empty `alt` text
and no caption. It was re-encoded from 749 KB to 132 KB — it is the one image
that blocks first paint.

## What the client's latest round changed

- **من نحن، قصتنا، الرؤية، الرسالة، القيم** — all new copy, used verbatim. The
  timeline earned its own chapter: a 2014 initiative, a 2021 SAIP-registered
  trademark and a 2024 company is the strongest credibility the page has.
- **Primary action flipped** to event organisation, as described above.
- **سكون كمباوند → 2026**, and **برنس هب → بزنس هب, 2026**.
- **Email → `info@realclub.sa`** on the new domain.
- **Testimonials section removed.** It held no real reviews, only a note saying
  they were coming, which cost more trust than it earned. Its photograph was
  moved into the story chapter. Re-add the section when three documented
  testimonials (name, role, company, quote) are available.
- **The logo wall was split** so government and commercial marks are no longer
  presented under one "شركاؤنا" heading that implied a formal partnership.
- **Projects are now clickable**, each opening a detail dialog.

## The round after that

- **Font** — Reem Kufi out, IBM Plex Sans Arabic throughout, for legibility.
- **Fifth service** — «صناعة الفرص والشراكات», so the page reads as a broker of
  opportunity rather than only an events organiser. The process line now runs
  to five stages and stacks below 1100px instead of 900px.
- **Top nav cut to six** — قصتنا folds under من نحن and عملاؤنا under أعمالنا.
  Both chapters are still there and still sit directly after the section that
  now owns them; only the nav entries were removed.
- **Trust numbers** — a band directly under the hero carrying the five
  cumulative totals the client supplied (20+ MOUs, 20+ events, 800+ members,
  2,000+ beneficiaries, 100K+ social reach), all since 2014. Note these are
  cumulative, not the half-year figures on the client's H1-2026 infographic.
- **«عشر سنوات» → «أكثر من عقد»** in the story lead — it does not expire.
- **Page length** — chapter rhythm, the story figure and the featured project
  margins were all tightened. Desktop height dropped from ~9,840px to ~9,690px
  at 1440, and considerably more of that is now content rather than gap.
- **Map** — pinned to حي المزروعية, Dammam.
- **SEO** — `rel="canonical"`, absolute `og:image` with dimensions, `og:url`,
  `twitter:card`, and a JSON-LD `@graph`: `ProfessionalService` (address,
  phone, email, founding date, social profiles, a five-item `OfferCatalog`),
  `WebSite`, and an `ItemList` of the five projects, each with its own
  description, image, year and client.

  **The structured data hard-codes `https://realclub.sa`.** If production sits
  on another domain, update the URLs in the `<script type="application/ld+json">`
  block, the canonical link and the `og:` tags together.

## Still open

1. **Remaining project dates and names** — Seredo (2026), Dar Al-Talal (2025)
   and Dar Al-Saad (2025) are still unconfirmed. Verify before launch; there is
   a comment on the projects section in `index.html`.
2. **The client/worked-with split** — the five in عملاؤنا are the ones the
   project list itself evidences. Confirm the rest, and say which belong in a
   third شركاء النجاح group.
3. **Testimonials** — three documented quotes to bring the section back.
4. **Per-project scope** — the نطاق عمل النادي list in each dialog was derived
   from what the photographs document plus the published service list. It needs
   a sign-off. The outcome field (النتيجة والأثر) is still empty — see "Adding
   project detail content".
5. **Business Hub photography** — none supplied; the card uses another real
   event photo and is flagged in the markup.
6. **Google Maps pin** — the footer map is pinned to the حي المزروعية
   neighbourhood. Send the exact Google Maps share link to drop the marker on
   the building itself.
7. **YouTube and LinkedIn handles** — assumed `realclubsa`, unconfirmed.
8. **One logo's name** — the gold monogram has no legible name on the supplied
   sheet, so its `alt` text stays generic.
