import type { Metadata } from 'next'
import { PostHogProvider } from '@/lib/providers/providers'
// These styles apply to every route in the application
import '@/styles/globals.css'
import { Noto_Serif, Noto_Sans } from 'next/font/google'
import SuspendedPostHogPageView from '@/lib/providers/PostHogPageView'

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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${notoSans.variable} ${notoSerif.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen antialiased">
        <PostHogProvider>
          <SuspendedPostHogPageView />
          {children}
        </PostHogProvider>
      </body>
    </html>
  )
}
