import React from 'react'
import styles from './UserWithScore.module.scss'
import clsx from 'clsx'

import { BaseMarquee } from '@/components/BaseMarquee'

import type { ITeam } from '@/types/configs'
import type { RelayScore, RelayUser } from '@/types/relay'

import { getTeamByUUID } from '@/utils/config'
import Marquee from 'react-fast-marquee'
import { useScoreSaberPlayer } from '@/hooks/use-scoresaber'

interface IProps {
  // Score of associated user
  score: RelayScore

  user: RelayUser
}

const TEAM_SIZE = 3

export const UserWithScore = (props: IProps) => {
  if (!props.user) return null

  const nicknameOverflows = props.user.name.length >= 18

  const acc = props.score ? (props.score.accuracy! * 100).toFixed(2) : 0

  return (
    <div className={styles['score-user']}>
      <img 
        className={styles['score-user__logo']}
        src={`https://i.imgur.com/igYR8f4.png`}
      />

      <BaseMarquee 
        speed={6}
        play={nicknameOverflows}
        hollow={true} 
        className={styles['score-user__name']}
      >
        { props.user.name } &nbsp;
      </BaseMarquee>

      <div className={styles['score-user__score-tracker']}>
        <p className={styles['score-user__score-tracker-fcs']}>{ props.score.combo }x</p>
        <p className={styles['score-user__score-tracker-acc']}>{ acc }%</p>
      </div>
    </div>
  )
}
