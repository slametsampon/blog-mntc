import LayoutSideNavbar from '@/layouts/LayoutSideNavbar'

export default function KebunLayout({ children }: { children: React.ReactNode }) {
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
