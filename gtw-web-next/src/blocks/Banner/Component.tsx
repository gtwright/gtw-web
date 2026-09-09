import type { BannerBlock as BannerBlockProps } from 'src/payload-types'

import { cn } from '@/lib/utils/cn'
import React from 'react'
import RichTextComponent from '@/components/RichText'

type Props = {
  className?: string
} & BannerBlockProps

export const BannerBlock: React.FC<Props> = ({ className, content, style }) => {
  return (
    <div className={cn('mx-auto my-8 w-full', className)}>
      <div
        className={cn('border py-3 px-6 flex items-center rounded', {
          'border-border border-indigo-500 border-4 bg-card': style === 'info',
          'border-error border-red-600 bg-error/30': style === 'error',
          'border-success border-green-600 bg-success/30': style === 'success',
          'border-warning border-yellow-600 bg-warning/30': style === 'warning',
        })}
      >
        <RichTextComponent data={content} />
      </div>
    </div>
  )
}
