import IconBuilder from '@/src/helpers/IconBuilder'

interface StatusMessageProps {
  tone: 'success' | 'danger'
  children: React.ReactNode
}

// Inline outcome line for forms: a check for success, an alert for errors.
export default function StatusMessage({ tone, children }: StatusMessageProps) {
  return (
    <p className={`flex items-start gap-2 ${tone === 'success' ? 'text-success' : 'text-danger'}`}>
      <IconBuilder type={tone === 'success' ? 'check' : 'alert'} paint="mt-0.5 h-4 w-4" />
      {children}
    </p>
  )
}
