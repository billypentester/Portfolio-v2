# Portfolio v2

Personal portfolio website of **Bilal Ahmad** (`billypentester`), a full-stack software engineer. Live at [billypentester.pk](https://billypentester.pk).

Built with the Next.js App Router. All site content lives in typed files under `src/content/`, so the site can be updated without touching any components.

## Features

- **Pages**: Home, Work (`/projects`), a case study per project (`/projects/[slug]`), Experience, About, Writing (`/blogs`) and Certificates, plus a custom 404 page. Every page is prerendered, so there is no loading state: content is in the initial HTML.
- **Home sections**: Hero, Engineering snapshot, What I build, Selected work, Currently building (hidden while `now.ts` is empty), Experience, How I work, Technical expertise, Writing and Education & certifications.
- **Contact form**: a server action validates the input and sends an HTML email over SMTP (Zoho) using Nodemailer. `POST /api/contact` exposes the same logic as JSON. Inputs are length-limited, HTML-escaped and protected by a honeypot field.
- **SEO**: a canonical URL and Open Graph/Twitter card per page, generated 1200×630 share images (`opengraph-image.tsx` for the site and for each case study, via `next/og`), one connected JSON-LD `@graph` per page (WebSite, Person, WebPage/ProfilePage/CollectionPage, BreadcrumbList, and CreativeWork for case studies), and a generated `sitemap.xml`, `robots.txt` and web app manifest.
- **Analytics**: optional [Umami](https://umami.is) integration, served from the site's own domain, with typed events for every meaningful interaction, scroll depth, section views and Core Web Vitals. No personal data is sent.
- **Theming**: 5 colour themes, picked in `/admin` (with `SITE_THEME` as the fallback), each with designed light and dark modes that follow the OS setting and a toggle that remembers the choice.
- **Private admin**: `/admin` lets the site owner switch the theme and the active resume. Settings live in Upstash Redis; the public site falls back to its defaults when Redis is unavailable.
- **Static by default**: every public page is prerendered and regenerated when settings change. Only `/api/contact`, `/resume` and `/admin` run on demand.

## Tech Stack

| Area        | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19               |
| Language    | TypeScript (strict)                             |
| Styling     | Tailwind CSS v4 (`@tailwindcss/postcss`)        |
| Email       | Nodemailer (Zoho SMTP)                          |
| Analytics   | Umami (optional)                                |
| Font        | Geist Sans and Geist Mono via `next/font/google` (self-hosted at build) |
| Tooling     | ESLint (`eslint-config-next`), Node test runner |

## Getting Started

### Prerequisites

- Node.js 20.9 or later (`.nvmrc` pins 22)
- Yarn (the repo includes a `yarn.lock`)

### Installation

```bash
git clone git@github.com:billypentester/Portfolio-v2.git
cd Portfolio-v2
yarn install
cp example.env .env
```

Fill in `.env` (see [Environment Variables](#environment-variables)), then start the dev server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000).

### Scripts

| Command          | Description                              |
| ---------------- | ---------------------------------------- |
| `yarn dev`       | Start the development server             |
| `yarn build`     | Create a production build                |
| `yarn start`     | Serve the production build               |
| `yarn lint`      | Run ESLint                               |
| `yarn typecheck` | Type-check with `tsc --noEmit`           |
| `yarn test`      | Run unit tests with the Node test runner |
| `yarn resume:upload <pdf> [--keep]` | Upload a new resume to Vercel Blob and delete the old ones (`--keep` keeps them selectable in `/admin`) |

## Environment Variables

| Variable                       | Required | Used in                              | Purpose                                                          |
| ------------------------------ | -------- | ------------------------------------ | ---------------------------------------------------------------- |
| `SMTP_USER`                    | Yes      | `src/helpers/sendEmail.ts`           | SMTP auth username (server-only)                                 |
| `SMTP_PASSWORD`                | Yes      | `src/helpers/sendEmail.ts`           | SMTP auth password or app password (server-only)                 |
| `APP_EMAIL`                    | No       | `src/helpers/sendEmail.ts`           | Sender and recipient for contact emails. Defaults to `SMTP_USER` |
| `NEXT_PUBLIC_UMAMI_URL`        | No       | `src/lib/umami.ts`                   | Absolute URL of the Umami tracking script, e.g. `https://cloud.umami.is/script.js` |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | No       | `src/lib/umami.ts`                   | Umami website ID                                                 |
| `PORTFOLIO_READ_WRITE_TOKEN`   | Yes      | `src/lib/resume.ts`                  | Vercel Blob store that holds the resume PDF (server-only; `BLOB_READ_WRITE_TOKEN` also works) |
| `SITE_THEME`                   | No       | `src/lib/admin/settings.ts`          | Fallback colour theme id (see [Theming](#theming))               |
| `ADMIN_USERNAME`               | For `/admin` | `src/lib/admin/auth.ts`          | Username of the single admin account (server-only)               |
| `ADMIN_PASSWORD`               | For `/admin` | `src/lib/admin/auth.ts`          | Password of the admin account (server-only, use a long one)      |
| `SESSION_SECRET`               | For `/admin` | `src/lib/admin/session.ts`       | Signs the session cookie; 32+ characters. Rotate it to sign every session out |
| `PORTFOLIO_KV_REST_API_URL`              | For `/admin` | `src/lib/redis.ts`               | Upstash Redis REST URL (added by Vercel's Upstash integration; `UPSTASH_REDIS_REST_URL` also works) |
| `PORTFOLIO_KV_REST_API_TOKEN`            | For `/admin` | `src/lib/redis.ts`               | Upstash Redis REST token (`UPSTASH_REDIS_REST_TOKEN` also works)  |

> **Migrating from the old names:** `NEXT_PUBLIC_APP_EMAIL` and `NEXT_PUBLIC_APP_PASS` still work as a fallback, but set `SMTP_USER` and `SMTP_PASSWORD` on your host and then remove the old ones. Never put secrets in `NEXT_PUBLIC_*` variables.
>
> `NEXT_PUBLIC_HOST` is no longer used: the contact form calls the email service directly.
>
> The Umami script only loads when both Umami variables are set. Both are read at build time (the proxy rewrites live in `next.config.ts`), so redeploy after changing them.

## Project Structure

```
.
├── assets/images/          # Images imported by the content files
├── scripts/                # One-off tasks, such as uploading the resume
├── public/                 # Static files: OG image, manifest icons
└── src/
    ├── app/                # App Router routes
    │   ├── page.tsx        # Home page
    │   ├── projects/       # Work listing and [slug] case studies
    │   ├── experience/  about-me/  blogs/  certificates/
    │   ├── api/contact/    # POST /api/contact (JSON)
    │   ├── resume/         # GET /resume: redirects to the current resume in Vercel Blob
    │   ├── layout.tsx      # Root layout: fonts, theme styles and script, header, contact, footer, analytics
    │   ├── sitemap.ts  robots.ts  manifest.ts
    │   └── globals.css     # Tailwind token mapping, type scale, base styles
    ├── content/            # All site content and its domain types (types.ts)
    ├── components/
    │   ├── ui/             # Container, Section, PageHeader, ButtonLink, ArrowLink, Tag, Eyebrow
    │   ├── layout/         # SiteHeader, MobileMenu, NavLinks, ThemeToggle, SiteFooter
    │   ├── home/           # One component per home section
    │   ├── projects/  experience/  writing/  credentials/  contact/
    │   ├── seo/JsonLd.tsx
    │   └── shared/         # Umami script, click, scroll-depth, section and 404 trackers
    ├── config/             # Colour themes, email template, icon registry
    ├── helpers/            # Contact service, validator, email sender, server action, IconBuilder
    ├── lib/                # Constants, SEO helpers, analytics, resume storage, theme builder, global types
    ├── utils/              # Date, duration and colour helpers
    └── __tests__/          # Unit tests
```

The `@/*` path alias points to the repo root, so imports look like `@/src/...` and `@/assets/...`.

## Customizing Content

Content lives in [`src/content/`](src/content), typed by [`src/content/types.ts`](src/content/types.ts):

| File | Content |
| --- | --- |
| `profile.ts` | Name, role, headline, bio, photo, resume link, social links |
| `experience.ts` | Roles (dates as `YYYY-MM`, `end: null` for the current role, `projects` to link case studies) and the About page journey |
| `projects.ts` | Professional, personal and archived projects. Add a `caseStudy` (context, problem, contribution, features, optional complexity and outcomes) to get a `/projects/[slug]` page. Only publicly shareable details belong here |
| `skills.ts` | Skill groups (`primary` for daily production use, `additional` for the rest), capabilities, principles and the delivery workflow |
| `credentials.ts` | Education and certifications (issuer, date, credential ID and verify URL are optional) |
| `publications.ts` | Articles (external links today; the type is ready for native MDX posts) |
| `now.ts` | "Currently building / learning". The section stays hidden while both lists are empty, and a single list spans the full width |
| `snapshot.ts` | Headline numbers. Years of experience are computed from `experience.ts` |

Navigation links and tracked section IDs are in [`src/lib/constants.ts`](src/lib/constants.ts). Default metadata and JSON-LD builders are in [`src/lib/seo.ts`](src/lib/seo.ts).

To add an image, put it under `assets/images/<category>/` (WebP preferred), import it in the matching content file, and reference it in the entry.

## Theming

Colours are semantic tokens (`canvas`, `surface`, `subtle`, `line`, `control`, `fg`, `muted`, `faint`, `accent`, `focus`, ...; the role of each is listed at the top of `globals.css`) mapped to Tailwind utilities with `@theme inline` in [`src/app/globals.css`](src/app/globals.css), for example `bg-canvas`, `text-muted` and `border-line`. The type scale (`text-display`, `text-page-title`, `text-title`, `text-subtitle`, `text-heading`, `text-lede`, `text-eyebrow`, `text-ui`, `text-metric`, plus body line-heights for `text-base`/`text-sm`/`text-xs`) and radii (`rounded-card`, `rounded-control`) live in the same file.

The token values come from the active theme, chosen in [`/admin`](#admin). Until one is saved there (or while Redis is unreachable) the site uses `SITE_THEME`, or `DEFAULT_THEME` in [`src/config/themes.ts`](src/config/themes.ts). The ids:

| Id                   | Character                                                              |
| -------------------- | ---------------------------------------------------------------------- |
| `midnight`           | Navy-tinted neutrals, deep blue-black dark mode, azure accent          |
| `emerald`            | Cool sea-glass neutrals, slate dark mode, emerald accent               |
| `indigo` (default)   | Faintly violet neutrals, saturated indigo accent                       |
| `graphite`           | Near-neutral greys, restrained cyan accent                             |
| `amber`              | Warm stone neutrals, burnt-amber accent that turns golden in dark mode |

Pages are prerendered. Saving a theme in `/admin` expires the `portfolio-settings` cache tag, so every page, the manifest and the Open Graph images are regenerated with the new theme on their next request. Changing `SITE_THEME` still needs a redeploy. An unknown id logs a warning and falls back to the default.

A theme is only a few numbers: the hue of the light neutrals (`paperHue`), the hue of the dark neutrals (`inkHue`), a neutral `tint` strength, and an accent hue and chroma. [`src/lib/theme.ts`](src/lib/theme.ts) derives the full light and dark palettes on the original design's lightness scale and renders them into `<head>` (`ThemeStyles`). The same palette supplies the hex colours for the Open Graph images, the manifest and the browser `theme-color`. To add a theme, add an entry to `THEMES`. The tests check every theme in both modes for WCAG AA contrast (text 4.5:1 on every surface including status colours, `accent-fg` on `accent`, and 3:1 for `control` form borders, `focus` rings and accent icons on hover fills).

The light values sit on `:root` and the dark values on `[data-theme="dark"]`, with a `prefers-color-scheme` fallback. A small inline script applies the stored light/dark choice before first paint, so there is no flash.

## Contact Flow

1. [`ContactForm.tsx`](src/components/contact/ContactForm.tsx) submits to the `sendContactData` server action with `useActionState`. It works without JavaScript and shows loading, field errors and success/failure inline.
2. The action calls `submitContact` in [`helpers/contact.ts`](src/helpers/contact.ts), which drops honeypot submissions, validates with `validateContactForm` and sends the email with `sendEmail`.
3. [`route.ts`](src/app/api/contact/route.ts) exposes the same service as JSON. It returns `201` on success, `400` for invalid input, `413` for oversized bodies and `500` when sending fails.

## Resume

The resume PDF is stored in Vercel Blob under the `resume/` prefix, not in `public/`. Every resume link points to `/resume`, which looks up the newest blob and redirects to it. The lookup is cached for an hour under the `resume` cache tag.

`/resume` serves the resume chosen in [`/admin`](#admin) while that file exists, and otherwise the newest upload.

To replace it, run `yarn resume:upload path/to/resume.pdf`. The script uploads the new file, then deletes the older ones. Add `--keep` to keep the older files so you can switch between them in `/admin` (a specific resume chosen there stays active until you pick the new one or "Newest upload"). The script runs outside Next.js and can't clear that cache, so for up to an hour `/resume` may still redirect to the deleted file. Use it for the first upload, or when a short gap doesn't matter. Code that replaces the resume inside the app (for example an admin uploader) should call `replaceResume` from [`src/lib/resume.ts`](src/lib/resume.ts) and then `revalidateTag('resume', 'max')`, so the new file is served right away.

## Admin

`/admin` is a private settings page for the site owner: one account from `ADMIN_USERNAME`/`ADMIN_PASSWORD`, no registration. It sets the active theme (with a live preview) and the resume served at `/resume`.

- **Storage**: one JSON document under the Redis key `portfolio:settings` (`{ theme, resume: { active }, updatedAt }`), read and written only by [`src/lib/admin/settings.ts`](src/lib/admin/settings.ts). Stored values are validated on read, and an invalid or missing field falls back to its default.
- **Sessions**: signing in sets an HS256-signed, `HttpOnly`, `SameSite=Lax` cookie scoped to `/admin` (`Secure` in production) that expires after 8 hours. There is no server-side session store, so changing `SESSION_SECRET` signs every session out.
- **Authorization**: each admin page and Server Action checks the session on the server (`requireAdmin`). There is no middleware-only protection.
- **Validation**: the theme must be a key of `THEMES` and the resume a file that currently exists under the Blob `resume/` prefix; nothing else is accepted or stored.
- **Brute force**: 5 failed sign-ins from one IP lock it out for 15 minutes (tracked in Redis). If Redis is configured but unreachable, sign-in fails closed.
- **CSRF**: mutations are Server Actions, which Next.js only accepts as same-origin POST requests.
- **Failure handling**: when Redis is unavailable the public site renders with the defaults (`SITE_THEME`, newest resume), and `/admin` shows the problem and disables saving.

Set the variables listed under [Environment Variables](#environment-variables), then visit `/admin/login`.

## Analytics

When both Umami variables are set, the site loads the Umami tracker. Nothing is sent from local or preview deployments.

- **Proxy**: the script and collection endpoint are served from `/a/script.js` and `/a/api/send` on the site's own domain (rewrites in `next.config.ts`), so ad blockers that filter `umami.is` don't drop visits. After deploying, check that Umami's Locations report shows visitor countries rather than a single hosting region.
- **Only the live domain**: `data-domains` limits tracking to the `SITE_URL` host and its `www.` variant.
- **Owner excluded**: opening `/admin` while signed in sets `localStorage['umami.disabled']`, so your own visits on that browser are not counted. Run `localStorage.removeItem('umami.disabled')` in the console to undo it.
- **Page views and Web Vitals**: page views are automatic, with `#hash` dropped so `/#contact` counts as `/`. `data-performance` reports LCP, INP, CLS, FCP and TTFB to Umami's Performance view.

### Events

Events are typed in [`src/lib/analytics.ts`](src/lib/analytics.ts). Links and buttons are marked with `trackingAttributes()` (or the `tracking` prop on `ButtonLink` and `ArrowLink`), and one delegated listener sends them, so server components need no client code. Don't use Umami's `data-umami-event`: on same-tab links it cancels the click and reloads the page, which breaks client-side navigation. Event names are snake_case, data values kebab-case, and no event carries personal data such as form contents.

| Event | Data | Sent when |
| ----- | ---- | --------- |
| `section_view` | `section` | A section is at least 75% visible, or fills half the screen, for 1 second (home, about, experience and case study sections, and contact on every page) |
| `scroll_depth` | `depth` (25/50/75/100) | Scrolling comes to rest past that share of the page |
| `nav_click` | `item`, `location` | Header, mobile menu or footer navigation |
| `cta_click` | `cta`, `location` | Calls to action such as "View selected work", "Let's talk", the snapshot tiles and the "All …" links |
| `resume_download` | `location` | Any resume button on the site |
| `resume_served` | `source` (`site`/`external`/`direct`) | `/resume` is opened, sent by the server, so links shared outside the site are counted too |
| `social_click` | `platform`, `location` | Email, GitHub, LinkedIn, WhatsApp or Messenger links |
| `project_click` | `project`, `action` (`case-study`/`live`/`github`), `location` | Project cards, the experience timeline and case study pages |
| `blog_click` | `article`, `category`, `publisher` | An article card |
| `blog_topic_filter` | `category` | A topic chip on `/blogs` |
| `certificate_view` / `certificate_verify` | `certificate` | Opening a certificate image, or its verification link |
| `company_click` | `company` | A company link on the experience timeline |
| `theme_toggle` | `theme` | Switching light/dark mode |
| `mobile_menu_open` | none | Opening the mobile menu |
| `contact_form_start` | none | First focus in the contact form |
| `contact_form_submit` | none | The form is submitted |
| `contact_form_success` | none | The message was sent |
| `contact_form_error` | `reason` (`invalid`/`error`), `fields` | Validation or delivery failed; `fields` lists the field names only |
| `page_not_found` | `path`, `referrer` | A 404 page is shown |

### Suggested Umami reports

- **Goals**: `contact_form_success`, `resume_download`, `resume_served`, and `social_click` where `platform` is `linkedin`.
- **Funnel**: `/` → `/projects` → `/projects/*` → `contact_form_start` → `contact_form_success`.
- **Breakdowns**: `project_click` by `project`, `resume_download` by `location`, `blog_click` by `article`, `page_not_found` by `path`.
- **Attribution**: add UTM parameters to links you control (LinkedIn, GitHub profile README, article author bios, the resume PDF), e.g. `?utm_source=linkedin&utm_medium=profile`.

## Deployment

The app is a standard Next.js app. Public pages are static (regenerated when settings change); `/resume`, `/admin` and `/api/contact` run on demand. You can deploy it to Vercel or any Node host:

```bash
yarn build
yarn start
```

Set the environment variables above on your hosting platform. The sitemap is generated from the routes and projects, so you don't need to update it by hand.

