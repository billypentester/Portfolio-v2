import KFC from '@/assets/images/projects/kfc.webp'
import Dominos from '@/assets/images/projects/dominos.webp'
import CrustCulture from '@/assets/images/projects/crustculture.webp'
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
    employer: SIMPLEX,
    featured: true,
    stack: ['NestJS', 'Node.js', 'React', 'MySQL', 'Redis'],
    cover: { src: KFC, alt: 'KFC Pakistan ordering website home page' },
    links: { live: 'https://www.kfcpakistan.com/' },
    highlights: [
      'Configurable loyalty engine with point management, third-party integrations and reporting.',
      'Future ordering so customers can schedule orders within operational hours.',
      'QR code dine-in ordering straight from the customer\'s phone.',
    ],
    caseStudy: {
      context: 'KFC Pakistan takes customer orders online. I work on its ordering platform as part of the engineering team at Simplex Technology Solutions, mostly on the backend and its integrations.',
      role: 'Software Engineer at Simplex, working on backend services and the features below from requirements to production.',
      responsibilities: [
        'Turned business requirements for loyalty and ordering into backend modules and APIs.',
        'Worked with the mobile and marketing teams on frontend integrations.',
        'Integrated third-party services and built the reporting around them.',
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
    },
  },
  {
    kind: 'professional',
    slug: 'dominos-pakistan',
    title: 'Domino\'s Pakistan',
    summary: 'Digital wallet, rule-based free delivery and a refactored client API for Domino\'s Pakistan.',
    domain: 'Food ordering · Payments',
    employer: SIMPLEX,
    featured: true,
    stack: ['NestJS', 'Node.js', 'React', 'MySQL', 'GTM'],
    cover: { src: Dominos, alt: 'Domino\'s Pakistan ordering website home page' },
    links: { live: 'https://www.dominos.com.pk/' },
    highlights: [
      'Digital wallet so customers can pay with wallet credits at checkout.',
      'Dynamic free-delivery rules based on time, channel, deals and customer location.',
      'Refactored client-side APIs for structure, validation, documentation, security and performance.',
    ],
    caseStudy: {
      context: 'Domino\'s Pakistan takes customer orders online. At Simplex Technology Solutions my work on the platform focused on checkout flexibility and the quality of the APIs its clients depend on.',
      role: 'Software Engineer at Simplex, building the features below on the backend.',
      responsibilities: [
        'Built the wallet and free-delivery checkout features on the backend.',
        'Refactored the existing client-facing APIs.',
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
    },
  },
  {
    kind: 'professional',
    slug: 'hospinizer',
    title: 'Hospinizer',
    summary: 'Patient authentication, appointment reminders and EMR synchronisation across clinics.',
    domain: 'Healthcare · Integrations',
    employer: SIMPLEX,
    featured: true,
    stack: [],
    highlights: [
      'Patient authentication and automated push notifications to improve appointment adherence.',
      'EMR systems integrated across clinics through an aggregator engine for appointment synchronisation.',
    ],
    caseStudy: {
      context: 'Hospinizer handles patient appointments across multiple clinics, each running its own EMR system, so appointment data has to stay synchronised between them.',
      role: 'Software Engineer at Simplex, building the patient-facing backend features and the EMR integration.',
      responsibilities: [
        'Implemented patient authentication.',
        'Built automated push notifications for upcoming appointments.',
        'Integrated clinic EMR systems through an aggregator engine.',
      ],
      features: [
        {
          title: 'Appointment reminders',
          description: 'Automated push notifications remind patients about upcoming appointments, which improves adherence.',
        },
        {
          title: 'EMR aggregation',
          description: 'An aggregator engine integrates each clinic\'s EMR system so appointments stay synchronised everywhere.',
        },
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
