import Link from 'next/link'

export default function CustomLink({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) {
  return (
    <Link href={href} className="underline-effect">
      {children}
    </Link>
  )
}
