import type { Capability, Principle, SkillGroup, WorkflowStep } from './types'

// Union of the resume skills section and the stacks listed on experience and projects.
// `primary` is what I use day to day in production; everything else goes in `additional`.
export const skillGroups: SkillGroup[] = [
  {
    title: 'Languages',
    primary: ['TypeScript', 'JavaScript', 'SQL'],
    additional: ['Python'],
    appliedIn: 'TypeScript across backend and frontend code; SQL for data models, migrations and reporting.',
  },
  {
    title: 'Backend',
    primary: ['Node.js', 'NestJS'],
    additional: ['Express', 'GraphQL', 'RabbitMQ', 'Kafka', 'Socket.IO'],
    appliedIn: 'Production APIs, integrations, scheduled jobs and event-based notifications at Simplex.',
  },
  {
    title: 'Frontend',
    primary: ['React', 'Next.js', 'Tailwind CSS'],
    additional: ['Vue', 'Redux', 'Zustand', 'Sass'],
    appliedIn: 'Client web apps at Cache First and frontend integrations on the Simplex ordering platforms.',
  },
  {
    title: 'Databases',
    primary: ['MySQL', 'Redis'],
    additional: ['PostgreSQL', 'MongoDB'],
    appliedIn: 'Data models, automated migrations and SQL scripts for analytics and reporting.',
  },
  {
    title: 'Infrastructure',
    primary: [],
    additional: ['Docker', 'Kubernetes', 'AWS', 'Google Cloud', 'Nginx'],
    appliedIn: 'Containers, cloud hosting and web serving for deploying and running applications.',
  },
  {
    title: 'Tools',
    primary: [],
    additional: ['Jenkins', 'Jest', 'Vite', 'GTM'],
    appliedIn: 'CI pipelines, testing, builds and analytics tracking alongside the application code.',
  },
]

export const allSkills = (group: SkillGroup): string[] => [...group.primary, ...group.additional]

export const capabilities: Capability[] = [
  {
    title: 'Backend & APIs',
    description: 'APIs, business logic and data models that stay maintainable as the rules behind them change.',
  },
  {
    title: 'Full-stack applications',
    description: 'React and Next.js applications backed by production APIs, from business requirements to release.',
  },
  {
    title: 'Integrations',
    description: 'Connecting products to third-party APIs and SDKs, notification channels and external systems.',
  },
  {
    title: 'Production engineering',
    description: 'Scheduled jobs, event-based workflows, documentation and tests, and refactoring legacy code for performance.',
  },
  {
    title: 'Security-minded development',
    description: 'Authentication, input validation and API hardening built in from the start, informed by a penetration-testing background.',
  },
]

export const principles: Principle[] = [
  {
    title: 'Start from the business rule',
    description: 'Features like free delivery or loyalty points are rules first and code second. Getting the rule right on paper avoids most rewrites.',
  },
  {
    title: 'Make it configurable, not hard-coded',
    description: 'When the business will keep changing a behaviour, give them the controls instead of a ticket queue.',
  },
  {
    title: 'Security is part of the feature',
    description: 'Authentication, validation and payload hygiene ship with the feature, not in a later hardening sprint.',
  },
  {
    title: 'Design for the unhappy path',
    description: 'A feature is done when it behaves sensibly outside the demo: a third party that times out, an order outside store hours, a rule that matches nothing.',
  },
  {
    title: 'Leave the module better than you found it',
    description: 'Refactor legacy code while you are in it, and keep documentation and tests current so the next change is cheaper.',
  },
  {
    title: 'Only as complex as the problem',
    description: 'Reach for a queue, a cache or a new service when a real constraint asks for it, not because the architecture diagram looks thin.',
  },
]

export const workflow: WorkflowStep[] = [
  { title: 'Understand', description: 'Understand requirements, constraints and business rules.' },
  { title: 'Design', description: 'Plan architecture, data models and API boundaries.' },
  { title: 'Build', description: 'Implement backend, frontend and integrations.' },
  { title: 'Validate', description: 'Test functionality, edge cases, security and performance.' },
  { title: 'Ship & Improve', description: 'Deploy, monitor, maintain and continuously improve.' },
]
