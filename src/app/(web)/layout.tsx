import type { Metadata } from 'next'
import { draftMode } from 'next/headers'
import { PostHogProvider } from '@/lib/providers/providers'
import '@/styles/globals.css'
import { Noto_Serif, Noto_Sans, Noto_Sans_Mono } from 'next/font/google'
import SuspendedPostHogPageView from '@/lib/providers/PostHogPageView'
import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/components/Footer'
import { ThemeProvider } from '@/lib/providers/Theme/ThemeProvider'
import { InitTheme } from '@/lib/providers/Theme/InitTheme'

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

const notoSansMono = Noto_Sans_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-noto-sans-mono',
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
      className={`${notoSans.variable} ${notoSerif.variable} ${notoSansMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <InitTheme />
        <link rel="icon" href="/favicon.ico" />
        <link rel="icon" sizes="32x32" href="/favicon-32x32.png" />
      </head>
      <body className="min-h-[100dvh] flex flex-col antialiased">
        <ThemeProvider>
          <PostHogProvider>
            <SuspendedPostHogPageView />
            <AdminBar
              adminBarProps={{
                preview: isEnabled,
              }}
            />
            {children}
            <Footer />
          </PostHogProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
