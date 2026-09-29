import Tag from './Tag'

interface TagListProps {
  items: string[]
  label: string
  className?: string
}

export default function TagList({ items, label, className = '' }: TagListProps) {
  if (items.length === 0) return null
  return (
    <ul aria-label={label} className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((item) => (
        <li key={item}>
          <Tag>{item}</Tag>
        </li>
      ))}
    </ul>
  )
}
