'use client'

import Link from 'next/link'
import React, { useEffect } from 'react'

import { Button } from '@/components/ui/button'
import { usePostHog } from 'posthog-js/react'

export default function NotFound() {
  const posthog = usePostHog()

  useEffect(() => {
    posthog.capture('not_found')
  }, [posthog])

  return (
    <div className="container flex flex-col items-center justify-center h-screen">
      <div className="prose">
        <h1 className="flex flex-row justify-center">404</h1>
        <p className="mb-4">This page could not be found.</p>
      </div>
      <Button asChild variant="default">
        <Link href="/">Go home</Link>
      </Button>
    </div>
  )
}
