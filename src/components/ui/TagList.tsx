import Tag from './Tag'

interface TagListProps {
  items: string[]
  label: string
  tone?: 'default' | 'accent'
  className?: string
}

export default function TagList({ items, label, tone = 'default', className = '' }: TagListProps) {
  if (items.length === 0) return null
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Tag tone={tone}>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}
