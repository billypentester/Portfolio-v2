import type { Capability, Principle, SkillGroup, WorkflowStep } from './types'

// Union of the resume skills section and the stacks listed on experience and projects.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    skills: ['TypeScript', 'JavaScript', 'SQL', 'Python'],
  },
  {
    title: 'Backend',
    skills: ['Node.js', 'NestJS', 'Express', 'GraphQL', 'RabbitMQ', 'Kafka', 'Socket.IO', 'Jest'],
    appliedIn: 'Production APIs, integrations, scheduled jobs and event-based notifications at Simplex.',
  },
  {
    title: 'Frontend',
    skills: ['React', 'Next.js', 'Vue', 'Redux', 'Zustand', 'Tailwind CSS', 'Sass', 'Vite'],
    appliedIn: 'Client web apps at Cache First and frontend integrations on the Simplex ordering platforms.',
  },
  {
    title: 'Data',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'Redis'],
    appliedIn: 'Data models, automated migrations and SQL scripts for analytics and reporting.',
  },
  {
    title: 'Infrastructure',
    skills: ['Docker', 'Kubernetes', 'Jenkins', 'AWS', 'Google Cloud', 'Nginx'],
  },
]

export const capabilities: Capability[] = [
  {
    title: 'Backend & API engineering',
    description: 'Services, APIs and data models that encode real business rules and stay maintainable as those rules change.',
    evidence: ['Configurable loyalty engine', 'Rule-based free delivery', 'Client API refactor'],
  },
  {
    title: 'Commerce & ordering systems',
    description: 'The parts of checkout where correctness is the feature: wallets, discounts, taxation and order scheduling.',
    evidence: ['Digital wallet', 'Coupons, discounts & taxation', 'Future and QR dine-in ordering'],
  },
  {
    title: 'Integrations',
    description: 'Connecting products to third-party SDKs, analytics, notification channels and external systems of record.',
    evidence: ['EMR aggregator engine', 'Third-party SDKs', 'Push & event notifications'],
  },
  {
    title: 'Full-stack delivery',
    description: 'Taking a feature from business requirements through backend, frontend integration, documentation and tests to production.',
    evidence: ['20+ modules to production', '10+ client web apps', 'React & Next.js frontends'],
  },
  {
    title: 'Security-minded engineering',
    description: 'A penetration-testing background applied to product code: authentication, validation and hardening built in from the start.',
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
    title: 'Leave the module better than you found it',
    description: 'Refactor legacy code while you are in it, and keep documentation and tests current so the next change is cheaper.',
    evidence: 'Revamped core modules for security, performance and scalability at Simplex.',
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
