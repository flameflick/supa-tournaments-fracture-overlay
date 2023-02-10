import React from 'react'
import styles from './UserWithScore.module.scss'
import clsx from 'clsx'

import { BaseMarquee } from '@/components/BaseMarquee'

import type { ITeam } from '@/types/configs'
import type { RelayScore, RelayUser } from '@/types/relay'

import { getTeamByUUID } from '@/utils/config'
import Marquee from 'react-fast-marquee'
import { useScoreSaberPlayer } from '@/hooks/use-scoresaber'
import { useScore } from '@/hooks/use-score'

interface IProps {
  // Score of associated user
  score: RelayScore

  user: RelayUser
}

const TEAM_SIZE = 3

export const UserWithScore = (props: IProps) => {
  if (!props.user) return null

  const nicknameOverflows = props.user.name.length >=  18

  const score = useScore(props.score)

  const {
    player: scoreSaberResult
  } = useScoreSaberPlayer(props.user.platformId)

  return (
    <div className={styles['score-user']}>
      <img 
        className={styles['score-user__logo']}
        src={scoreSaberResult?.profilePicture}
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
        <p className={styles['score-user__score-tracker-fcs']}>{ score.combo }x { score.isFC ? '(FC)' : null }</p>
        <p className={styles['score-user__score-tracker-acc']}>{ score.acc }%</p>
      </div>
    </div>
  )
}
