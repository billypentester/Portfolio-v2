import Simplex from '@/assets/images/experience/simplex.webp'
import type { Experience, JourneyMilestone } from './types'

export const experience: Experience[] = [
  {
    id: 'simplex',
    company: 'Simplex Technology Solutions',
    role: 'Software Engineer',
    location: 'Lahore, Pakistan',
    start: '2023-09',
    end: null,
    url: 'https://simplexts.net/',
    logo: Simplex,
    summary: 'Backend-focused full-stack engineering on production ordering, loyalty and healthcare platforms.',
    ownership: 'Lead backend development across two active projects, working with the mobile and marketing teams.',
    highlights: [
      'Delivered 20+ feature modules from business requirements to production, including third-party integrations and analytical reports.',
      'Built coupons, discounts, taxation and OTP-based authentication for customer-facing ordering platforms.',
      'Integrated third-party SDKs, task scheduling and event-based notifications to streamline operational workflows.',
      'Revamped core modules for security, performance and scalability, optimised API payloads and refactored legacy code.',
      'Handled Google Analytics integration and CRM development, and kept documentation and test coverage current.',
    ],
    stack: ['NestJS', 'Node.js', 'React', 'MySQL', 'Redis', 'GTM'],
  },
  {
    id: 'cache-first',
    company: 'Cache First',
    role: 'MERN Stack Developer',
    location: 'Remote',
    start: '2022-09',
    end: '2023-09',
    summary: 'Remote client delivery across web apps for global and local clients.',
    highlights: [
      'Built 10+ global and local web apps, including a crypto exchange, e-commerce, SPA and CMS solutions, with 4.5+ client ratings for quality and reliability.',
      'Designed business-oriented data models, automated database migrations and wrote SQL scripts for analytics, reporting and dashboard integrations.',
    ],
    stack: ['MongoDB', 'Express', 'React', 'Node.js', 'SQL'],
  },
]

export const journey: JourneyMilestone[] = [
  {
    period: '2017 — 2019',
    title: 'Intermediate in Computer Science',
    description: 'Punjab Group of Colleges, Lahore. First programming courses.',
  },
  {
    period: '2019 — 2023',
    title: 'BSc Computer Science, COMSATS University',
    description: 'Served as Google Developer Student Clubs Cloud Lead and wrote about security, machine learning and Web3.',
  },
  {
    period: '2022 — 2023',
    title: 'Client work at Cache First',
    description: 'Shipped 10+ MERN web apps for remote clients while finishing my degree.',
  },
  {
    period: '2023 — Now',
    title: 'Software Engineer at Simplex',
    description: 'Backend lead on production ordering and loyalty platforms for KFC and Domino\'s, plus Hospinizer.',
  },
]
