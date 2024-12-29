import { ThemeSelector } from '@/lib/providers/Theme/ThemeSelector'
import { getCachedGlobal } from '@/lib/utils/getGlobals'
import { Footer as FooterType } from '@/payload-types'
import Link from 'next/link'

export async function Footer() {
  const footerData: FooterType = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []
  return (
    <footer className="p-4">
      <div className="container flex flex-col items-center justify-center">
        <ThemeSelector />
        {navItems.map(({ link }, i) => (
          <Link key={i} href={link.url || ''} className="text-sm">
            {link.label}
          </Link>
        ))}
      </div>
    </footer>
  )
}
