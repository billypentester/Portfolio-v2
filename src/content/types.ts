import type { StaticImageData } from 'next/image'

// Month precision is all the timeline needs: "YYYY-MM".
export type YearMonth = `${number}-${number}`

export type SocialPlatform = 'email' | 'github' | 'linkedin' | 'whatsapp' | 'messenger'

export interface SocialLink {
  platform: SocialPlatform
  label: string
  url: string
}

export interface Profile {
  firstName: string
  lastName: string
  handle: string
  role: string
  // Shown next to the role, e.g. "Backend & full-stack".
  specialty: string
  location: string
  timezone: string
  email: string
  resumeUrl: string
  photo: StaticImageData
  headline: string
  intro: string
  primaryStack: string[]
  bio: string[]
  enjoyBuilding: string[]
  languages: string[]
  interests: string[]
}

export interface Capability {
  title: string
  description: string
  evidence: string[]
}

export interface Principle {
  title: string
  description: string
  // Where the principle shows up in real work. Leave it out rather than stretch a claim.
  evidence?: string
}

export interface WorkflowStep {
  title: string
  description: string
}

export interface Experience {
  id: string
  company: string
  role: string
  location: string
  start: YearMonth
  // null means the role is current.
  end: YearMonth | null
  url?: string
  logo?: StaticImageData
  summary: string
  ownership?: string
  highlights: string[]
  stack: string[]
  // Slugs of case studies from this role, linked from the timeline.
  projects?: string[]
}

export interface JourneyMilestone {
  period: string
  title: string
  description: string
}

export interface ProjectImage {
  src: StaticImageData
  alt: string
  caption?: string
}

export interface ProjectLinks {
  live?: string
  github?: string
}

export interface StackLayer {
  name: string
  items: string[]
}

export interface ProjectFeature {
  title: string
  description: string
}

export interface CaseStudy {
  context: string
  // The business or technical problem the work had to solve.
  problem: string
  role: string
  responsibilities: string[]
  features: ProjectFeature[]
  // Stack grouped by layer, rendered as a diagram. Only list layers that are documented.
  layers?: StackLayer[]
  // What made the work non-trivial, stated at the level that is already public.
  complexity?: string[]
  challenges?: { challenge: string; solution: string }[]
  outcomes?: string[]
  lessons?: string[]
  gallery?: ProjectImage[]
}

interface ProjectBase {
  slug: string
  title: string
  summary: string
  stack: string[]
  cover?: ProjectImage
  links?: ProjectLinks
  featured?: boolean
  caseStudy?: CaseStudy
}

export interface ProfessionalProject extends ProjectBase {
  kind: 'professional'
  employer?: string
  domain: string
  highlights: string[]
}

export interface PersonalProject extends ProjectBase {
  kind: 'personal'
  status: 'active' | 'shipped' | 'paused'
}

// Earlier work kept for the record: title and screenshot only, no case study.
export interface ArchivedProject {
  kind: 'archive'
  slug: string
  title: string
  cover: ProjectImage
}

export type Project = ProfessionalProject | PersonalProject | ArchivedProject
export type ShowcaseProject = ProfessionalProject | PersonalProject

export interface SkillGroup {
  title: string
  // Used day to day in production.
  primary: string[]
  // Used on projects or earlier roles, without implying depth.
  additional: string[]
  appliedIn?: string
}

export interface SnapshotMetric {
  value: string
  label: string
  detail: string
  href: string
}

export interface NowItem {
  title: string
  description: string
  status?: string
  stack?: string[]
  href?: string
}

export interface NowContent {
  building: NowItem[]
  learning: NowItem[]
}

export interface Education {
  id: string
  degree: string
  institution: string
  city: string
  start: string
  end: string
  logo: StaticImageData
}

export interface Certification {
  id: string
  title: string
  image: StaticImageData
  issuer?: string
  issuedAt?: YearMonth
  credentialId?: string
  verifyUrl?: string
  topics?: string[]
  featured?: boolean
}

export type PublicationCategory = 'Engineering' | 'Security' | 'Machine Learning' | 'Web3' | 'Career'

interface PublicationBase {
  title: string
  description: string
  category: PublicationCategory
  tags: string[]
  cover: StaticImageData
  publishedAt?: string
  featured?: boolean
}

// Articles hosted elsewhere today. Native articles (MDX) can be added as a second variant
// with a `slug` and served from /blogs/[slug] without changing the listing UI.
export interface ExternalPublication extends PublicationBase {
  source: 'external'
  url: string
  publisher: string
}

export type Publication = ExternalPublication
