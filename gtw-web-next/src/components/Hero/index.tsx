// Hero.tsx - Reusable Hero Block Component
// Usage example:
// <Hero title="Welcome" subtitle="Modern web experiences" ctaLabel="Get Started" onCtaClick={() => {}} imageUrl="/hero.jpg" imageAlt="Hero image" align="center" />

import Image from 'next/image'
import { ReactNode } from 'react'

export interface HeroProps {
  title: string
  subtitle?: string
  imageUrl?: string
  imageAlt?: string
  align?: 'left' | 'center' | 'right'
  children?: ReactNode
}

export function Hero({
  title,
  subtitle,
  imageUrl,
  imageAlt,
  align = 'center',
  children,
}: HeroProps) {
  const alignment = {
    left: 'items-start text-left',
    center: 'items-center text-center',
    right: 'items-end text-right',
  }[align]

  return (
    <section
      className={`w-full py-16 px-4 flex flex-col gap-6 md:gap-10 ${alignment} bg-gradient-to-b from-background to-muted rounded-xl`}
    >
      {imageUrl ? (
        // TODO: Replace width/height with actual image dimensions if different
        <Image
          src={imageUrl}
          alt={imageAlt || ''}
          width={1200}
          height={600}
          className="w-full max-w-3xl mx-auto rounded-lg shadow-md object-cover"
          priority
        />
      ) : null}
      <h1 className="text-4xl md:text-6xl font-bold tracking-tight">{title}</h1>
      {subtitle && (
        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto">{subtitle}</p>
      )}
      {children}
    </section>
  )
}
