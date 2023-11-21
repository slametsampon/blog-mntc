import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

export default function SectionContainer({ children }: Props) {
  return (
    <section className="mx-auto max-w-full px-0 sm:px-6 xl:max-w-full xl:px-0">{children}</section>
  )
}
