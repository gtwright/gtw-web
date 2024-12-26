'use client'

import type { PayloadAdminBarProps } from 'payload-admin-bar'

import { cn } from '@/lib/utils/cn'
import { useSelectedLayoutSegments } from 'next/navigation'
import { PayloadAdminBar, PayloadMeUser } from 'payload-admin-bar'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import './index.scss'

import { getClientSideURL } from '@/lib/utils/getURL'

const baseClass = 'admin-bar'

const Title: React.FC = () => <span>Dashboard</span>

export const AdminBar: React.FC<{
  adminBarProps?: PayloadAdminBarProps
}> = (props) => {
  const { adminBarProps } = props || {}
  const segments = useSelectedLayoutSegments()
  const [show, setShow] = useState(false)
  const router = useRouter()
  console.log(segments)
  const onAuthChange = React.useCallback((user: PayloadMeUser) => {
    setShow(!!user?.id)
  }, [])

  return (
    <div
      className={cn(baseClass, 'py-2 bg-black text-white', {
        block: show,
        hidden: !show,
      })}
    >
      <div className="container">
        <PayloadAdminBar
          {...adminBarProps}
          className="py-2 text-white"
          classNames={{
            controls: 'font-medium text-white',
            logo: 'text-white',
            user: 'text-white',
          }}
          cmsURL={getClientSideURL()}
          logo={<Title />}
          onAuthChange={onAuthChange}
          onPreviewExit={() => {
            fetch('/next/exit-preview').then(() => {
              router.push('/')
              router.refresh()
            })
          }}
          style={{
            backgroundColor: 'transparent',
            padding: 0,
            position: 'relative',
            zIndex: 'unset',
          }}
        />
      </div>
    </div>
  )
}