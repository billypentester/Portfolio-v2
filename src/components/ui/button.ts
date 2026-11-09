export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium whitespace-nowrap transition-[background-color,border-color,color,opacity,transform] duration-200 ease-out-soft active:translate-y-px disabled:pointer-events-none disabled:opacity-60'

// Solid ink pill that fades on hover; bordered pill that takes the brand colour; quiet text button.
const variants: Record<ButtonVariant, string> = {
  primary: 'bg-fg text-canvas hover:opacity-85',
  secondary: 'border border-line bg-canvas text-fg hover:border-brand hover:text-accent',
  ghost: 'text-muted hover:text-fg hover:bg-subtle',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-4',
  md: 'h-11 px-6',
}

// Shared by links styled as buttons and by real <button>s (e.g. the contact form submit).
export const buttonStyles = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = ''): string =>
  `${base} ${variants[variant]} ${sizes[size]} ${className}`
