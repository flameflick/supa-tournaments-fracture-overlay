import React, { ReactPropTypes, forwardRef, createRef } from 'react'

import styles from './BaseSidebar.module.scss'
import teamStyles from '@/components/TeamWithCombinedScore/TeamWithCombinedScore.module.scss'
import clsx from 'clsx'

import type { RelayScore, RelayUser } from '@/types/relay'

import { Reorder } from 'framer-motion'

import { TeamWithCombinedScore } from '@/components/TeamWithCombinedScore'

import { getTeamByUUID } from '@/utils/config'
import { default as teamsConfig } from '@/configs/teams.json'

interface IProps {
  children?: React.ReactNode

  userScores: Record<string, RelayScore>
  users: Record<string, RelayUser>
}

export const BaseSidebar = (props: IProps) => {
  const scores = Object.entries(props.userScores).sort(
    ([, scoreA], [, scoreB]) => scoreB.accuracy! - scoreA.accuracy!
  )

  const teamsMap: Record<string, {
    user: RelayUser
    score: RelayScore
  }[]> = {}

  for (const [userId, user] of Object.entries(props.users)) {
    const teamMembers = teamsMap[user.team.id] || []
  
    teamsMap[user.team.id] = [
      ...teamMembers,
      {
        user,
        score: props.userScores[userId]
      }
    ]
  }

  const teams = Object.entries(teamsMap).map(([teamId, users]) => ({
    team: getTeamByUUID(teamId),
    users
  })).sort((a, b) => 
    b.users.reduce((k, j) => k + j.score.score!, 0) -
    a.users.reduce((k, j) => k + j.score.score!, 0) 
  )

  const players = Object.entries(props.userScores).map(
    ([, user]) => user
  ).sort(
    (a, b) => b.score! - a.score!
  )

  return (
    <aside className={styles['base-sidebar']}>
      <h3 className={styles['base-sidebar__title']}>Team Leaderboard</h3>
      <Reorder.Group axis="y" className={styles['base-sidebar__entities-list']} onReorder={() => null} values={teamsConfig}>
        {teams.splice(0, 10).map(i => 
          <Reorder.Item className={teamStyles['score-team__container']} key={i.team?.id} value={i.team}>
            <TeamWithCombinedScore 
              teamUUID={i.team?.id!} 
              scores={i.users.map(j => j.score)} 
              users={i.users.map(j => j.user)}
            />
          </Reorder.Item>
        )}
      </Reorder.Group>

      <h3 className={styles['base-sidebar__title']}>Player Leaderboard</h3>
      <Reorder.Group axis="y" className={styles['base-sidebar__entities-list']} onReorder={() => null} values={teamsConfig}>
        {players.map(i => 
          <Reorder.Item className={teamStyles['score-team__container']} key={i.user_guid} value={i}>
            { JSON.stringify(i) }
          </Reorder.Item>
        )}
      </Reorder.Group>
    </aside>
  )
}
