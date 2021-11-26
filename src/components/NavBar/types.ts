import { Resolution } from '../Layout/Layout'
import React, { ReactNode } from 'react'

export type NavItemTypes = NavItem['type']

export type NavAvatar = {
  [key in keyof Resolution]: string
}

export interface NavSettings {
  type: 'settings',
  items: Array<{

  }>
}

export interface NavTaskManagerItem {
  type: 'task-manager',
  items: Array<{
    icon: React.ReactNode,
    title: string,
    href: string,
    notificationCount?: number,
  }>
}

export interface NavAdminCenterItem {
  type: "admin-center",
  items: Array<{
    icon: React.ReactNode,
    title: string,
    href: string,
    rule: ['admin'],
  }>
}


export type NavItem = NavTaskManagerItem | NavAdminCenterItem