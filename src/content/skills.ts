import type { Capability, Principle, SkillGroup, WorkflowStep } from './types'

// Union of the resume skills section and the stacks listed on experience and projects.
// `primary` is what I use day to day in production; everything else goes in `additional`.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    primary: ['TypeScript', 'JavaScript', 'SQL'],
    additional: ['Python'],
  },
  {
    title: 'Backend',
    primary: ['Node.js', 'NestJS'],
    additional: ['Express', 'GraphQL', 'Jest'],
    appliedIn: 'Production APIs, integrations, scheduled jobs and event-based notifications at Simplex.',
  },
  {
    title: 'Frontend',
    primary: ['React', 'Next.js', 'Tailwind CSS'],
    additional: ['Vue', 'Redux', 'Zustand', 'Sass', 'Vite'],
    appliedIn: 'Client web apps at Cache First and frontend integrations on the Simplex ordering platforms.',
  },
  {
    title: 'Data',
    primary: ['MySQL', 'Redis'],
    additional: ['PostgreSQL', 'MongoDB'],
    appliedIn: 'Data models, automated migrations and SQL scripts for analytics and reporting.',
  },
  {
    title: 'Messaging & real-time',
    primary: [],
    additional: ['RabbitMQ', 'Kafka', 'Socket.IO'],
  },
  {
    title: 'Infrastructure',
    primary: [],
    additional: ['Docker', 'Jenkins', 'AWS', 'Google Cloud', 'Kubernetes', 'Nginx'],
  },
]

export const allSkills = (group: SkillGroup): string[] => [...group.primary, ...group.additional]

export const capabilities: Capability[] = [
  {
    title: 'Backend & APIs',
    description: 'Production APIs, business logic, authentication and data models that stay maintainable as the rules behind them change.',
    evidence: ['Configurable loyalty engine', 'Rule-based free delivery', 'Client API refactor'],
  },
  {
    title: 'Commerce systems',
    description: 'The parts of ordering and checkout where correctness is the feature: loyalty, wallets, coupons, discounts, taxation and scheduling.',
    evidence: ['Digital wallet', 'Coupons, discounts & taxation', 'Future and QR dine-in ordering'],
  },
  {
    title: 'Full-stack applications',
    description: 'React and Next.js applications backed by production APIs, taken from business requirements to release with documentation and tests.',
    evidence: ['20+ modules to production', '10+ client web apps', 'React & Next.js frontends'],
  },
  {
    title: 'Integrations',
    description: 'Connecting products to third-party APIs and SDKs, analytics, notification channels and external systems of record.',
    evidence: ['EMR aggregator engine', 'Third-party SDKs', 'Push & event notifications'],
  },
  {
    title: 'Security-minded engineering',
    description: 'A penetration-testing background applied to product code: authentication, authorization, input validation and API hardening built in from the start.',
    evidence: ['OTP-based authentication', 'Security-focused module revamps', 'Network security certifications'],
  },
]

export const principles: Principle[] = [
  {
    title: 'Start from the business rule',
    description: 'Features like free delivery or loyalty points are rules first and code second. Getting the rule right on paper avoids most rewrites.',
    evidence: 'Free delivery at Domino\'s is decided by time, channel, deals and location.',
  },
  {
    title: 'Make it configurable, not hard-coded',
    description: 'When the business will keep changing a behaviour, give them the controls instead of a ticket queue.',
    evidence: 'The KFC loyalty engine is configurable by the business.',
  },
  {
    title: 'Security is part of the feature',
    description: 'Authentication, validation and payload hygiene ship with the feature, not in a later hardening sprint.',
    evidence: 'OTP auth, API validation work and a background in penetration testing.',
  },
  {
    title: 'Design for the unhappy path',
    description: 'A feature is done when it behaves sensibly outside the demo: a third party that times out, an order outside store hours, a rule that matches nothing.',
    evidence: 'Third-party integrations, scheduled jobs and event-based notifications running in production.',
  },
  {
    title: 'Leave the module better than you found it',
    description: 'Refactor legacy code while you are in it, and keep documentation and tests current so the next change is cheaper.',
    evidence: 'Revamped core modules for security, performance and scalability at Simplex.',
  },
  {
    title: 'Only as complex as the problem',
    description: 'Reach for a queue, a cache or a new service when a real constraint asks for it, not because the architecture diagram looks thin.',
  },
]

export const workflow: WorkflowStep[] = [
  { title: 'Understand', description: 'Turn the business requirement into explicit rules, edge cases and constraints.' },
  { title: 'Design', description: 'Model the data and the API contract before writing the implementation.' },
  { title: 'Build', description: 'Implement in small, reviewable modules that other engineers can read.' },
  { title: 'Validate', description: 'Test the edge cases and document the behaviour alongside the code.' },
  { title: 'Ship', description: 'Release to production with the mobile and marketing teams in the loop.' },
  { title: 'Improve', description: 'Revisit what shipped: payloads, performance, security and legacy code.' },
]
