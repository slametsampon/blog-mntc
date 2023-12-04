import { Button } from '@/app/ui/button'
import CustomLink from '@/components/Link'
import metricsNavLinks from '@/data/metricsNavLinks'
import { ArrowRightIcon } from '@heroicons/react/24/outline'
import { signOut, useSession } from 'next-auth/react'

const LayoutSideNavbar = () => {
  const { data: session, status } = useSession()
  const logoutClickHandler = () => {
    signOut({ callbackUrl: '/login' })
  }
  return (
    <>
      <div className="mb-3 flex flex-col rounded-2xl bg-slate-50 p-2 shadow-sm dark:bg-gray-900">
        {session ? (
          <>
            <div className="p-1 font-semibold text-green-700">{session.user?.name}</div>
            <div>
              <Button onClick={logoutClickHandler} className="mt-4 w-full">
                Logout <ArrowRightIcon className="ml-auto h-5 w-5 text-gray-50" />
              </Button>
            </div>
          </>
        ) : (
          <CustomLink
            key="login"
            href={'/login'}
            className="link-active p-2 sm:block font-semibold text-blue-700 dark:text-gray-100"
          >
            Login
          </CustomLink>
        )}{' '}
      </div>
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
    </>
  )
}

export default LayoutSideNavbar
