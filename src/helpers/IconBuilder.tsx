import { icons, type IconName } from "@/src/config/Icon"

interface IconBuilderProps {
    type: IconName
    paint?: string
}

// Decorative by default: pair every icon with visible text or an aria-label on its control.
export default function IconBuilder({ type, paint = 'h-4 w-4' }: IconBuilderProps) {
    const { variant, viewBox, path } = icons[type]
    const strokeProps = variant === 'stroke'
        ? { fill: 'none', stroke: 'currentColor', strokeWidth: 1.75, strokeLinecap: 'round', strokeLinejoin: 'round' } as const
        : { fill: 'currentColor' }

    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox={viewBox}
            aria-hidden="true"
            focusable="false"
            className={`inline-block shrink-0 ${paint}`}
            {...strokeProps}
        >
            <path d={path} />
        </svg>
    )
}
