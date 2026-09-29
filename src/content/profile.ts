import Photo from '@/public/images/about-me.jpeg'
import type { Profile, SocialLink } from './types'

export const SITE_URL = 'https://billypentester.pk'

export const profile: Profile = {
  firstName: 'Bilal',
  lastName: 'Ahmad',
  handle: 'billypentester',
  role: 'Software Engineer',
  location: 'Lahore, Pakistan',
  timezone: 'UTC+5',
  email: 'contact@billypentester.pk',
  resumeUrl: '/Bilal_Resume.pdf',
  photo: Photo,
  headline: 'I build the backend systems behind production commerce: loyalty engines, ordering flows, digital wallets and the integrations that hold them together.',
  intro: 'Full-stack software engineer at Simplex Technology Solutions, taking features from business requirements to production. Most of my work is in NestJS, React, Next.js, MySQL and Redis.',
  primaryStack: ['NestJS', 'Next.js', 'React', 'MySQL', 'Redis'],
  bio: [
    'I studied Computer Science at COMSATS University and started shipping client work before I graduated: crypto exchange, e-commerce, SPA and CMS projects on the MERN stack, delivered remotely through Cache First.',
    'Since September 2023 I have been a Software Engineer at Simplex Technology Solutions, where I lead backend development across two active projects and work closely with the mobile and marketing teams. The products are ordering and loyalty platforms for brands like KFC and Domino\'s, plus appointment and EMR work for Hospinizer.',
    'My handle comes from an early focus on security and penetration testing. I still carry that mindset into product work: validate every input, keep auth boring and correct, and treat API hardening as part of the feature rather than an afterthought.',
  ],
  enjoyBuilding: [
    'Rule engines that let the business change behaviour without a deploy, like loyalty points or free-delivery rules.',
    'Checkout and ordering flows where correctness matters: wallets, discounts, taxation and scheduled orders.',
    'Integrations between systems that were never designed to talk to each other, such as EMR aggregation across clinics.',
    'Refactors that leave a module faster, safer and easier for the next engineer to read.',
  ],
  languages: ['English', 'Urdu', 'Punjabi'],
  interests: ['Reading', 'Photography', 'Movies'],
}

export const fullName = `${profile.firstName} ${profile.lastName}`

export const socialLinks: SocialLink[] = [
  { platform: 'email', label: 'Email', url: `mailto:${profile.email}` },
  { platform: 'github', label: 'GitHub', url: 'https://github.com/billypentester' },
  { platform: 'linkedin', label: 'LinkedIn', url: 'https://www.linkedin.com/in/billypentester/' },
  { platform: 'whatsapp', label: 'WhatsApp', url: 'https://wa.me/923324187624?text=Hi%20Bilal%2C%20I%20want%20to%20hire%20you%20for%20my%20project' },
  { platform: 'messenger', label: 'Messenger', url: 'https://messenger.com/t/billypentester' },
]
