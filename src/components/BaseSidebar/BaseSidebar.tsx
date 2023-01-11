import React, { ReactPropTypes, forwardRef, createRef } from 'react'
import styles from './BaseSidebar.module.scss'
import clsx from 'clsx'

import { RelayScore } from '@/types/relay'
import { Reorder } from 'framer-motion'


interface IBaseSidebarProps {
  children?: React.ReactNode
  userScores: Record<string, RelayScore>
}


export const BaseSidebar = (props: IBaseSidebarProps) => {
  const scores = Object.entries(props.userScores).sort(([userIdA, scoreA], [userIdB, scoreB]) => scoreB.accuracy! - scoreA.accuracy!)

  return (
    <aside className={styles['base-sidebar']}>
      <h3 className={styles['base-sidebar__title']}>Team Leaderboard</h3>

      { scores.length ? (
        <Reorder.Group axis="y" className={styles['base-sidebar__entities-list']} onReorder={() => null} values={scores}>
          { scores.map(([userId, score]) => (
            <Reorder.Item key={userId} value={score} >
              { userId } { score.accuracy }
            </Reorder.Item>
          ))}
        </Reorder.Group>
      ) : null }
    </aside>
  )
}
