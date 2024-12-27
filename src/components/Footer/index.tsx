import { getCachedGlobal } from '@/lib/utils/getGlobals'
import { Footer as FooterType } from '@/payload-types'
import Link from 'next/link'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  return (
    <footer className="bg-gray-100 p-4">
      <div className="container flex flex-col items-center justify-center">
        {navItems.map(({ link }, i) => (
          <Link key={i} href={link.url || ''} className="text-gray-500 hover:text-gray-700 text-sm">
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
