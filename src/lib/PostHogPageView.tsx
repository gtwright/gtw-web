'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, Suspense } from 'react'
import { usePostHog } from 'posthog-js/react'

function PostHogPageView(): null {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const posthog = usePostHog()

  // Track pageviews
  useEffect(() => {
    if (pathname && posthog) {
      let url = window.origin + pathname
      const params = searchParams.toString()
      const paramsObject = Object.fromEntries([...searchParams.entries()])
      if (params) {
        url = url + `?${params}`
      }
      posthog.capture('$pageview', {
        $current_url: url,
        search_params: paramsObject,
      })
    }
  }, [pathname, searchParams, posthog])

  return null
}

// Wrap this in Suspense to avoid the `useSearchParams` usage above
// from deopting the whole app into client-side rendering
// See https://nextjs.org/docs/messages/deopted-into-client-rendering
export default function SuspendedPostHogPageView() {
  return (
    <Suspense fallback={null}>
      <PostHogPageView />
    </Suspense>
  )
}
