import React from 'react'
import styles from './TeamWithCombinedScore.module.scss'
import clsx from 'clsx'

import { BaseMarquee } from '@/components/BaseMarquee'

import type { ITeam } from '@/types/configs'
import type { RelayScore, RelayUser } from '@/types/relay'

import { getTeamByUUID } from '@/utils/config'
import Marquee from 'react-fast-marquee'

interface IProps {
  teamUUID: string

  // Scores of associated users
  scores: RelayScore[]

  // Associated users for team lookup
  users: RelayUser[]
}

const TEAM_SIZE = 3

export const TeamWithCombinedScore = (props: IProps) => {
  const team = getTeamByUUID(props.teamUUID)

  if (!team) {
    return null
  }

  const combinedAcc = ((props.scores.reduce(
    (a, b) => a + (b ? b.accuracy! : 0)
  , 0) / TEAM_SIZE) * 100).toFixed(2)

  const fullComboCount = props.scores.filter(
    i => i ? (i.scoreTracker?.notesMissed! + i.scoreTracker?.bombHits!) === 0 : false
  ).length

  const teamNameOverflows = team.name.length > 18

  return (
    <div className={styles['score-team']}>
      <img 
        className={styles['score-team__logo']}
        src={team.logoLink}
      />

      <BaseMarquee 
        speed={6}
        play={teamNameOverflows}
        hollow={true} 
        className={styles['score-team__name']}
      >
        { team.name } &nbsp;
      </BaseMarquee>

      <div className={styles['score-team__score-tracker']}>
        <p className={styles['score-team__score-tracker-fcs']}>{ fullComboCount }x FCs</p>
        <p className={styles['score-team__score-tracker-acc']}>{ combinedAcc }%</p>
      </div>
    </div>
  )
}
