import React, { useEffect, useState } from 'react'

import styles from './BaseSidebar.module.scss'
import teamStyles from '@/components/TeamWithCombinedScore/TeamWithCombinedScore.module.scss'
import clsx from 'clsx'

import type { RelayScore, RelayUser, RelayTeamWithPoints } from '@/types/relay'

import { Reorder } from 'framer-motion'

import { TeamWithCombinedScore } from '@/components/TeamWithCombinedScore'
import { UserWithScore } from '@/components/UserWithScore'

import { getTeamByUUID } from '@/utils/config'
import { default as teamsConfig } from '@/configs/teams.json'

interface IProps {
  children?: React.ReactNode

  userScores: Record<string, RelayScore>
  users: Record<string, RelayUser>
  teamPoints: RelayTeamWithPoints[] | null
}

export const BaseSidebar = (props: IProps) => {
  const [teamLeaderboardType, setTeamLeaderboardType] = useState<'score' | 'points'>('score')

  const scores = Object.entries(props.userScores)
    .sort(
      ([, scoreA], [, scoreB]) => scoreB.accuracy! - scoreA.accuracy!
    )

  // I still can't figure out why I decided to store everything 
  // in id => value Maps. Holy shit the next 50 lines is a trainwreck
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

  const teams = Object.entries(teamsMap)
    .map(([teamId, users]) => ({
      team: getTeamByUUID(teamId),
      users
    })).sort((a, b) => 
      b.users.reduce((k, j) => k + (j.score ? j.score.score! : 0), 0) -
      a.users.reduce((k, j) => k + (j.score ? j.score.score! : 0), 0) 
    )

  const users = Object.entries(props.users)
    .map(([, user]) => user)

  const players = Object.entries(props.userScores)
    .map(
      ([, score]) => (
        { 
          score, 
          user: users.find(i => i.guid === score.user_guid) 
        })
    ).sort(
      (a, b) => b.score.score! - a.score.score!
    )
   
  // When point update hits the WS client, switch team leaderboard
  // to display current points instead of acc for 30 seconds
  useEffect(() => {
    const switchTeamLeaderboard = () => {
      setTeamLeaderboardType(type => 
        type === 'score' ? 'points' : 'score'
      )
    }

    switchTeamLeaderboard()

    setTimeout(switchTeamLeaderboard, 30_000)
  }, [ props.teamPoints ])

  return (
    <aside className={styles['base-sidebar']}>
      <h3 className={styles['base-sidebar__title']}>Team Leaderboard</h3>
      <Reorder.Group axis="y" className={
        clsx(styles['base-sidebar__entities-list'], 
        )} onReorder={() => null} values={teamsConfig}>
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
        {players.filter(i => i.user).map(i => 
          <Reorder.Item className={teamStyles['score-team__container']} key={i.user?.guid} value={i}>
            <UserWithScore score={i.score} user={i.user!} />
          </Reorder.Item>
        )}
      </Reorder.Group>
    </aside>
  )
}
