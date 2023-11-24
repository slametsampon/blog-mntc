import CustomLink from '@/components/Link'
import metricsNavLinks from '@/data/metricsNavLinks'

const LayoutSideNavbar = () => {
  return (
    <div className="flex flex-col rounded-2xl bg-blue-50 p-2 shadow-sm dark:bg-gray-900">
      {metricsNavLinks.map((link) => (
        <CustomLink
          key={link.title}
          href={link.href}
          className="link-active p-1 sm:block font-semibold text-blue-700 dark:text-gray-100"
        >
          {link.title}
        </CustomLink>
      ))}
    </div>
  )
}

export default LayoutSideNavbar
