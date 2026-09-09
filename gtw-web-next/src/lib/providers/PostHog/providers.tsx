// app/providers.tsx
'use client'

import posthog from 'posthog-js'
import { PostHogProvider as PHProvider } from 'posthog-js/react'
import { useEffect } from 'react'

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  const key = process.env.NEXT_PUBLIC_POSTHOG_KEY

  useEffect(() => {
    if (key) {
      posthog.init(key, {
        capture_pageview: false, // Disable automatic pageview capture, as we capture manually
        capture_pageleave: false,
        api_host: '/ingest',
        ui_host: 'https://us.posthog.com',
      })
    }
  }, [key])

  if (!key) {
    return <>{children}</>
  }

  return <PHProvider client={posthog}>{children}</PHProvider>
}
