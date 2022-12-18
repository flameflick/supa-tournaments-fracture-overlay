import React, { ReactPropTypes } from 'react'

import styles from './BaseSidebar.module.scss'

import clsx from 'clsx'

interface IBaseSidebarProps {
  children?: React.ReactNode
}

export const BaseSidebar = (props: IBaseSidebarProps) => {
  return (
    <aside className={styles['base-sidebar']}>
      <h3 className={styles['base-sidebar__title']}>Team Leaderboard</h3>
    </aside>
  )
}
