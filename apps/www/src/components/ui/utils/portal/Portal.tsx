'use client'
import React, { useMemo, useState } from "react"
import { createPortal } from "react-dom"
import styles from './Portal.module.css'
import clsx from "clsx"
import { useIsClient, useClickAway } from '@uidotdev/usehooks'
type PortalProps = {
    isOpen?: boolean,
    children: React.ReactNode
    parent?: HTMLElement | null
    onClose?: () => void
}
export const Portal = ({ children, isOpen, parent, ...props }: PortalProps) => {


    const isClient = useIsClient()
    const ref = useClickAway((e) => { 
        if(e.target !== parent && !parent?.contains(e.target as HTMLElement) ) props.onClose?.()
        // props.onClose?.(); 
    })
    const className = clsx([styles.portal, isOpen && styles.isOpen])

    if (!isClient) return <></>
    return <>{createPortal(<div {...props} className={className} ref={ref as any} >
        {children}
    </div>, parent ?? document.body)}</>
}