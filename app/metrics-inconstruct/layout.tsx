'use client'

import LayoutSideNavbar from '@/layouts/LayoutSideNavbar'
import { useSession } from 'next-auth/react'

export default function MetricLayout({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  console.log('MetricLayout-status', status)
  console.log('MetricLayout-session', session)
  // console.log('MetricLayout useSession() : ', useSession())
  return (
    <>
      <div className="flex flex-col md:flex-row gap-5 divide-x mt-5">
        <div>
          <LayoutSideNavbar />
        </div>
        <div className="px-5">{children}</div>
      </div>
    </>
  )
}
