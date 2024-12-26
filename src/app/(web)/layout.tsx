import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { PostHogProvider } from '@/lib/providers/providers'
import '@/styles/globals.css'
import { Noto_Serif, Noto_Sans } from 'next/font/google'
import SuspendedPostHogPageView from '@/lib/providers/PostHogPageView'
import { AdminBar } from '@/components/AdminBar'

const notoSerif = Noto_Serif({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-serif',
})

const notoSans = Noto_Sans({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans',
})
export const metadata: Metadata = {
  title: 'GTW Web',
  description: "Graham Wright's website",
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-[100dvh] flex flex-col antialiased">
        <PostHogProvider>
          <SuspendedPostHogPageView />
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
