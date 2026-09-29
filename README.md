# Portfolio v2

Personal portfolio website of **Bilal Ahmad** (`billypentester`), a full-stack software engineer. Live at [billypentester.pk](https://billypentester.pk).

Built with the Next.js App Router. All site content lives in typed files under `src/content/`, so the site can be updated without touching any components.

## Features

- **Pages**: Home, Work (`/projects`), a case study per project (`/projects/[slug]`), Experience, About, Writing (`/blogs`) and Certificates, plus a custom 404 page and a loading skeleton.
- **Home sections**: Hero, Engineering snapshot, What I build, Selected work, Experience, How I work, Technical expertise, Now (hidden until filled in), Writing and Education & certifications.
- **Contact form**: a server action validates the input and sends an HTML email over SMTP (Zoho) using Nodemailer. `POST /api/contact` exposes the same logic as JSON. Inputs are length-limited, HTML-escaped and protected by a honeypot field.
- **SEO**: a canonical URL and Open Graph/Twitter card per page, JSON-LD (WebSite, Person, ProfilePage, BreadcrumbList and CreativeWork), and a generated `sitemap.xml`, `robots.txt` and web app manifest.
- **Analytics**: optional [Umami](https://umami.is) integration with a small set of custom events. No personal data is sent.
- **Theming**: designed light and dark themes that follow the OS setting, with a toggle that remembers the choice.
- **Static by default**: every page is prerendered at build time. Only `/api/contact` runs on demand.

## Tech Stack

| Area        | Technology                                      |
| ----------- | ----------------------------------------------- |
| Framework   | Next.js 16 (App Router), React 19               |
| Language    | TypeScript (strict)                             |
| Styling     | Tailwind CSS v4 (`@tailwindcss/postcss`)        |
| Email       | Nodemailer (Zoho SMTP)                          |
| Analytics   | Umami (optional)                                |
| Font        | Geist Sans and Geist Mono via `next/font/local` |
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

## Environment Variables

| Variable                       | Required | Used in                              | Purpose                                                          |
| ------------------------------ | -------- | ------------------------------------ | ---------------------------------------------------------------- |
| `SMTP_USER`                    | Yes      | `src/helpers/sendEmail.ts`           | SMTP auth username (server-only)                                 |
| `SMTP_PASSWORD`                | Yes      | `src/helpers/sendEmail.ts`           | SMTP auth password or app password (server-only)                 |
| `APP_EMAIL`                    | No       | `src/helpers/sendEmail.ts`           | Sender and recipient for contact emails. Defaults to `SMTP_USER` |
| `NEXT_PUBLIC_UMAMI_URL`        | No       | `src/components/shared/umami.tsx`    | URL of the Umami tracking script                                 |
| `NEXT_PUBLIC_UMAMI_WEBSITE_ID` | No       | `src/components/shared/umami.tsx`    | Umami website ID                                                 |

> **Migrating from the old names:** `NEXT_PUBLIC_APP_EMAIL` and `NEXT_PUBLIC_APP_PASS` still work as a fallback, but set `SMTP_USER` and `SMTP_PASSWORD` on your host and then remove the old ones. Never put secrets in `NEXT_PUBLIC_*` variables.
>
> `NEXT_PUBLIC_HOST` is no longer used: the contact form calls the email service directly.
>
> The Umami script only loads when both Umami variables are set.

## Project Structure

```
.
├── assets/images/          # Images imported by the content files
├── public/                 # Static files: resume PDF, OG image, manifest icons
└── src/
    ├── app/                # App Router routes
    │   ├── page.tsx        # Home page
    │   ├── projects/       # Work listing and [slug] case studies
    │   ├── experience/  about-me/  blogs/  certificates/
    │   ├── api/contact/    # POST /api/contact (JSON)
    │   ├── layout.tsx      # Root layout: fonts, theme script, header, contact, footer, analytics
    │   ├── sitemap.ts  robots.ts  manifest.ts
    │   └── globals.css     # Design tokens and light/dark themes
    ├── content/            # All site content and its domain types (types.ts)
    ├── components/
    │   ├── ui/             # Container, Section, PageHeader, ButtonLink, ArrowLink, Tag, Eyebrow
    │   ├── layout/         # SiteHeader, MobileMenu, NavLinks, ThemeToggle, SiteFooter
    │   ├── home/           # One component per home section
    │   ├── projects/  experience/  writing/  credentials/  contact/
    │   ├── seo/JsonLd.tsx
    │   └── shared/         # Section observer, Umami
    ├── config/             # Email template, icon registry
    ├── helpers/            # Contact service, validator, email sender, server action, IconBuilder
    ├── lib/                # Constants, SEO helpers, analytics, global types
    ├── utils/              # Date and duration helpers
    └── __tests__/          # Unit tests
```

The `@/*` path alias points to the repo root, so imports look like `@/src/...` and `@/assets/...`.

## Customizing Content

Content lives in [`src/content/`](src/content), typed by [`src/content/types.ts`](src/content/types.ts):

| File | Content |
| --- | --- |
| `profile.ts` | Name, role, headline, bio, photo, resume path, social links |
| `experience.ts` | Roles (dates as `YYYY-MM`, `end: null` for the current role) and the About page journey |
| `projects.ts` | Professional, personal and archived projects. Add a `caseStudy` to get a `/projects/[slug]` page |
| `skills.ts` | Skill groups, capabilities, principles and the delivery workflow |
| `credentials.ts` | Education and certifications (issuer, date, credential ID and verify URL are optional) |
| `publications.ts` | Articles (external links today; the type is ready for native MDX posts) |
| `now.ts` | "Currently building / learning". The section stays hidden while both lists are empty |
| `snapshot.ts` | Headline numbers. Years of experience are computed from `experience.ts` |

Navigation links and tracked section IDs are in [`src/lib/constants.ts`](src/lib/constants.ts). Default metadata and JSON-LD builders are in [`src/lib/seo.ts`](src/lib/seo.ts).

To add an image, put it under `assets/images/<category>/` (WebP preferred), import it in the matching content file, and reference it in the entry.

## Theming

Colours are semantic tokens (`canvas`, `surface`, `subtle`, `line`, `fg`, `muted`, `faint`, `accent`, ...) defined in [`src/app/globals.css`](src/app/globals.css) and mapped to Tailwind utilities with `@theme inline`, for example `bg-canvas`, `text-muted` and `border-line`. The light values sit on `:root` and the dark values on `[data-theme="dark"]`, with a `prefers-color-scheme` fallback. A small inline script applies the stored choice before first paint, so there is no flash. The type scale (`text-display`, `text-title`, `text-heading`, `text-lede`, `text-eyebrow`) and radii (`rounded-card`, `rounded-control`) live in the same file.

## Contact Flow

1. [`ContactForm.tsx`](src/components/contact/ContactForm.tsx) submits to the `sendContactData` server action with `useActionState`. It works without JavaScript and shows loading, field errors and success/failure inline.
2. The action calls `submitContact` in [`helpers/contact.ts`](src/helpers/contact.ts), which drops honeypot submissions, validates with `validateContactForm` and sends the email with `sendEmail`.
3. [`route.ts`](src/app/api/contact/route.ts) exposes the same service as JSON. It returns `201` on success, `400` for invalid input, `413` for oversized bodies and `500` when sending fails.

## Analytics Events

When Umami is enabled, the site sends these events. None of them include form contents or other personal data.

- `<section-id>_section_view`: a home section was at least 75% visible (once per page view)
- `contact_form_submit` and `contact_form_error`
- `resume_download`, `project_case_study_click`, `project_live_click`, `project_github_click`
- `<platform>_click` for social links and `blog_click_<title>` for articles

## Deployment

The app is a standard Next.js app. Every page is static, so you can deploy it to Vercel or any Node host:

```bash
yarn build
yarn start
```

Set the environment variables above on your hosting platform. The sitemap is generated from the routes and projects, so you don't need to update it by hand.

