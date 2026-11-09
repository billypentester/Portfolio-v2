import KFC from '@/assets/images/projects/kfc.webp'
import Dominos from '@/assets/images/projects/dominos.webp'
import CrustCulture from '@/assets/images/projects/crustculture.webp'
import FundsGrid from '@/assets/images/projects/funds-grid.webp'
import TutorHub from '@/assets/images/projects/tutorhub.webp'
import DEX from '@/assets/images/projects/dex.webp'
import CarPart from '@/assets/images/projects/carpart.webp'
import BusLink from '@/assets/images/projects/buslink.webp'
import Covid from '@/assets/images/projects/covid.webp'
import Weather from '@/assets/images/projects/weather.webp'
import Wallet from '@/assets/images/projects/wallet.webp'
import Personality from '@/assets/images/projects/personality.webp'
import type { ArchivedProject, Project, ShowcaseProject } from './types'

const SIMPLEX = 'Simplex Technology Solutions'

// Professional entries only contain what is already public on the live products or in the resume.
export const projects: Project[] = [
  {
    kind: 'professional',
    slug: 'kfc-pakistan',
    title: 'KFC Pakistan',
    summary: 'Loyalty, scheduled ordering and QR dine-in for KFC Pakistan\'s ordering platform.',
    domain: 'Food ordering · Loyalty',
    role: 'Backend lead',
    employer: SIMPLEX,
    featured: true,
    stack: ['NestJS', 'Node.js', 'React', 'MySQL', 'Redis'],
    cover: { src: KFC, alt: 'KFC Pakistan ordering website menu, showing the Everyday Value category' },
    links: { live: 'https://www.kfcpakistan.com/' },
    highlights: [
      'Configurable loyalty engine with point management, third-party integrations and reporting.',
      'Future ordering so customers can schedule orders within operational hours.',
      'QR code dine-in ordering straight from the customer\'s phone.',
    ],
    caseStudy: {
      context: 'KFC Pakistan\'s online ordering platform. I work on it at Simplex Technology Solutions as backend lead, owning the services, APIs and integrations behind the features below.',
      problem: 'On top of standard online ordering, the platform needed a loyalty programme whose point rules the business can configure, orders that can be scheduled for later, and a way to order from the table in the restaurant.',
      role: 'Backend lead at Simplex. I built the loyalty, future ordering and QR dine-in features on the backend, from requirements to production.',
      responsibilities: [
        'Turned business requirements for loyalty and ordering into backend modules and APIs.',
        'Built the loyalty engine so point rules are configured by the business instead of hard-coded.',
        'Integrated the third-party loyalty services and built the reporting around them.',
        'Worked with the mobile and marketing teams on the frontend integrations.',
      ],
      features: [
        {
          title: 'Configurable loyalty engine',
          description: 'Point management that the business can configure, with third-party integrations and reporting on top.',
        },
        {
          title: 'Future ordering',
          description: 'Customers can schedule an order for later, constrained to the store\'s operational hours.',
        },
        {
          title: 'QR dine-in ordering',
          description: 'Diners scan a QR code at the table and order directly from their own device.',
        },
      ],
      layers: [
        { name: 'Client', items: ['React'] },
        { name: 'Services', items: ['Node.js', 'NestJS'] },
        { name: 'Data', items: ['MySQL', 'Redis'] },
        { name: 'Integrations', items: ['Third-party loyalty services'] },
      ],
      complexity: [
        'Point rules are configured by the business, so the loyalty engine evaluates rules defined as data rather than hard-coded logic.',
        'Loyalty connects to third-party services and feeds reporting, so balances have to agree across every system that reads them.',
        'A scheduled order is only valid inside the store\'s operational hours.',
        'QR dine-in ties an order to a table in the restaurant instead of a delivery address.',
      ],
    },
  },
  {
    kind: 'professional',
    slug: 'dominos-pakistan',
    title: 'Domino\'s Pakistan',
    summary: 'Digital wallet, rule-based free delivery and a refactored client API for Domino\'s Pakistan.',
    domain: 'Food ordering · Payments',
    role: 'Backend lead',
    employer: SIMPLEX,
    featured: true,
    stack: ['NestJS', 'Node.js', 'React', 'MySQL', 'GTM'],
    cover: { src: Dominos, alt: 'Domino\'s Pakistan ordering website menu, showing the Favorite Flavors pizzas' },
    links: { live: 'https://www.dominos.com.pk/' },
    highlights: [
      'Digital wallet so customers can pay with wallet credits at checkout.',
      'Dynamic free-delivery rules based on time, channel, deals and customer location.',
      'Refactored client-side APIs for structure, validation, documentation, security and performance.',
    ],
    caseStudy: {
      context: 'Domino\'s Pakistan\'s online ordering platform. I work on it at Simplex Technology Solutions as backend lead, focused on checkout flexibility and the quality of the APIs its clients depend on.',
      problem: 'Checkout needed more flexibility: wallet credits as a way to pay, and free delivery decided by time, channel, deals and location instead of a fixed threshold. The client-facing APIs these features depend on also needed restructuring.',
      role: 'Backend lead at Simplex. I built the wallet and free-delivery features and refactored the client-facing APIs.',
      responsibilities: [
        'Built the digital wallet and the rule-based free-delivery checkout features on the backend.',
        'Refactored the existing client-facing APIs for structure, validation, documentation, security and performance.',
      ],
      features: [
        {
          title: 'Digital wallet',
          description: 'Customers can hold wallet credits and use them to pay, which makes checkout more flexible.',
        },
        {
          title: 'Dynamic free delivery',
          description: 'Free-delivery eligibility is decided by rules on time, channel, active deals and the customer\'s location instead of a fixed threshold.',
        },
        {
          title: 'Client API refactor',
          description: 'Restructured the client-side APIs with stricter validation, documentation, security fixes and better performance.',
        },
      ],
      layers: [
        { name: 'Client', items: ['React', 'GTM'] },
        { name: 'Services', items: ['Node.js', 'NestJS'] },
        { name: 'Data', items: ['MySQL'] },
      ],
      complexity: [
        'Free-delivery eligibility combines four inputs, so the rules have to stay predictable when time, channel, deals and location overlap.',
        'Wallet credits are a balance customers spend at checkout, where any mistake is visible to them.',
        'Refactoring client-facing APIs means tightening structure and validation without breaking the apps that already call them.',
      ],
      outcomes: [
        'Customers can pay with wallet credits, making checkout more flexible.',
        'Free delivery is decided by rules instead of a single threshold.',
        'Client APIs with a clearer structure, stricter validation, documentation, and security and performance fixes.',
      ],
    },
  },
  {
    kind: 'personal',
    slug: 'funds-grid',
    title: 'Funds Grid',
    summary: 'Portfolio tracker for PSX stocks, ETFs and Pakistani mutual funds: cost basis, profit and loss, tax, dividends and a KSE-100 benchmark in one view.',
    status: 'active',
    featured: true,
    stack: ['Next.js', 'NestJS', 'Prisma', 'MySQL', 'TanStack Query'],
    cover: { src: FundsGrid, alt: 'Funds Grid landing page: every stock, fund and dividend in one clear view' },
    links: { live: 'https://funds-frontend.vercel.app/' },
    caseStudy: {
      context: 'Funds Grid is a multi-user portfolio tracker for Pakistani retail investors, covering PSX-listed stocks, ETFs and mutual funds. I designed and built it end to end on my own time: the Next.js frontend, the NestJS API and the data model behind them.',
      problem: 'Investors who hold shares through a broker and mutual funds through several fund managers only ever see one statement at a time. None of them shows a combined cost basis, realised and unrealised profit, dividend income after withholding tax, or how the whole portfolio compares with the KSE-100.',
      role: 'Sole designer and engineer. I own the product, the frontend, the API, the database and the deployment.',
      responsibilities: [
        'Designed the data model for portfolios, holdings, transactions, cash movements and daily price history, built with Prisma on MySQL.',
        'Built the NestJS API in controller, service and repository layers, with session auth and ownership guards on every portfolio, asset and transaction.',
        'Built the Next.js frontend as a backend-for-frontend, so the browser never calls the API directly.',
        'Integrated a market-data provider for prices, fund NAVs, the KSE-100 index, dividend payouts and corporate announcements.',
        'Wrote reconciliation tests and a read-only diagnostic that check the portfolio figures against accounting invariants.',
      ],
      features: [
        {
          title: 'Transaction engine',
          description: 'Buys, sells, dividends and cash movements are replayed in order to derive weighted average cost and realised profit, and a sale can never exceed the quantity held.',
        },
        {
          title: 'Tax by filer status',
          description: 'Capital gains tax on each sale and withholding tax on each dividend are worked out at the investor\'s filer or non-filer rate.',
        },
        {
          title: 'Dividend Center',
          description: 'Announced payouts are matched to the shares each investor holds, then confirmed, snoozed or marked as not received.',
        },
        {
          title: 'KSE-100 benchmark',
          description: 'Time-weighted return, alpha, volatility and maximum drawdown against the KSE-100 for portfolios that hold stocks or ETFs.',
        },
        {
          title: 'Admin console',
          description: 'User management, data sync triggers and targeted push notifications, with every account action written to an audit log.',
        },
        {
          title: 'Installable app',
          description: 'A progressive web app that installs on a phone, with web push notifications and an offline fallback page.',
        },
      ],
      layers: [
        { name: 'Frontend (BFF)', items: ['Next.js', 'React', 'TanStack Query'] },
        { name: 'API', items: ['NestJS', 'better-auth', 'Zod'] },
        { name: 'Data', items: ['Prisma', 'MySQL'] },
        { name: 'Integrations', items: ['Market data provider', 'Web Push', 'Google sign-in'] },
      ],
      complexity: [
        'Cost basis, realised profit and tax all come from replaying the transaction history, so entries recorded out of order or on the same day must still produce the same result.',
        'Portfolio totals must satisfy accounting identities, such as total value minus net invested capital equalling unrealised plus realised profit plus dividends, within a defined rounding tolerance.',
        'Prices for funds, stocks and the index arrive from an external provider and are stored as daily history, so every valuation has to show how fresh its price is.',
        'No investor may read or change another\'s portfolios, so ownership is checked on every route, including for soft-deleted records.',
      ],
    },
  },
  {
    kind: 'professional',
    slug: 'crust-culture',
    title: 'Crust Culture',
    summary: 'Online ordering website for Crust Culture: accounts, menu browsing, cart and order processing.',
    domain: 'Food ordering',
    stack: ['NestJS', 'Node.js', 'React', 'MySQL'],
    cover: { src: CrustCulture, alt: 'Crust Culture ordering website home page' },
    links: { live: 'https://crustculture.com.pk/' },
    highlights: [
      'User authentication, product browsing, cart management and order processing.',
    ],
  },
  { kind: 'archive', slug: 'tutorhub', title: 'TutorHub', cover: { src: TutorHub, alt: 'TutorHub screenshot' } },
  { kind: 'archive', slug: 'decentralized-exchange', title: 'Decentralized Exchange', cover: { src: DEX, alt: 'Decentralized exchange screenshot' } },
  { kind: 'archive', slug: 'car-part-ecommerce', title: 'Car Part E-commerce', cover: { src: CarPart, alt: 'Car part e-commerce screenshot' } },
  { kind: 'archive', slug: 'bus-link', title: 'Bus Link', cover: { src: BusLink, alt: 'Bus Link screenshot' } },
  { kind: 'archive', slug: 'covid-tracker', title: 'Covid Tracker', cover: { src: Covid, alt: 'Covid Tracker screenshot' } },
  { kind: 'archive', slug: 'weather-app', title: 'Weather App', cover: { src: Weather, alt: 'Weather app screenshot' } },
  { kind: 'archive', slug: 'wallet-authenticator', title: 'Wallet Authenticator', cover: { src: Wallet, alt: 'Wallet Authenticator screenshot' } },
  { kind: 'archive', slug: 'personality-prediction', title: 'Personality Prediction', cover: { src: Personality, alt: 'Personality prediction screenshot' } },
]

export const showcaseProjects = projects.filter((p): p is ShowcaseProject => p.kind !== 'archive')
export const archivedProjects = projects.filter((p): p is ArchivedProject => p.kind === 'archive')
export const featuredProjects = showcaseProjects.filter((p) => p.featured)
export const caseStudyProjects = showcaseProjects.filter((p) => p.caseStudy !== undefined)

export const getProject = (slug: string): ShowcaseProject | undefined =>
  showcaseProjects.find((p) => p.slug === slug)
