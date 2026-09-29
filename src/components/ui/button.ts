export type ButtonVariant = 'primary' | 'secondary' | 'ghost'
export type ButtonSize = 'sm' | 'md'

const base =
  'inline-flex items-center justify-center gap-2 rounded-control font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-200 ease-out-soft active:translate-y-px disabled:pointer-events-none disabled:opacity-60'

const variants: Record<ButtonVariant, string> = {
  primary: 'bg-fg text-canvas hover:bg-accent hover:text-accent-fg',
  secondary: 'border border-line-strong bg-surface text-fg hover:border-fg',
  ghost: 'text-muted hover:text-fg hover:bg-subtle',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3.5 text-sm',
  md: 'h-11 px-5 text-[0.9375rem]',
}

// Shared by links styled as buttons and by real <button>s (e.g. the contact form submit).
export const buttonStyles = (variant: ButtonVariant = 'primary', size: ButtonSize = 'md', className = ''): string =>
  `${base} ${variants[variant]} ${sizes[size]} ${className}`
