interface CaseStudySectionProps {
  id: string
  label: string
  title: string
  children: React.ReactNode
}

export default function CaseStudySection({ id, label, title, children }: CaseStudySectionProps) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="reveal grid gap-6 border-t border-line py-12 sm:py-16 lg:grid-cols-12 lg:gap-12">
      <div className="lg:col-span-4">
        <p className="font-mono text-eyebrow uppercase text-faint">{label}</p>
        <h2 id={`${id}-heading`} className="mt-3 text-heading font-semibold">{title}</h2>
      </div>
      <div className="lg:col-span-8">{children}</div>
    </section>
  )
}
