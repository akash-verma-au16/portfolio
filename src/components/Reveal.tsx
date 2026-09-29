import type { ReactNode } from 'react'
import { useInView } from '../lib/hooks'

type Props = { children: ReactNode; delay?: number; className?: string; as?: 'div' | 'li' | 'article' }

/** Fades and lifts its children in the first time they scroll into view. */
export default function Reveal({ children, delay = 0, className = '', as: Tag = 'div' }: Props) {
  const [ref, seen] = useInView<HTMLDivElement>(0.15)
  return (
    <Tag
      ref={ref as never}
      className={`reveal ${seen ? 'is-visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Tag>
  )
}
