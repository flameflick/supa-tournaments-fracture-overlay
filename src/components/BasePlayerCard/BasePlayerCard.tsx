import React from 'react'

import styles from './BasePlayerCard.module.scss'

import { RelayScore, RelayUser } from '@/types/relay'
import { useScoreSaberPlayer } from '@/hooks/use-scoresaber'
import { useBeatLeaderPlayer } from '@/hooks/use-beatleader'

type Props = {
  userId: string
  score?: RelayScore
  muted?: boolean
  scoreTrackerPosition?: 'top' | 'bottom'
}

const scorePositionMap = {
  'top': 'flex-start',
  'bottom': 'flex-end'
}

export const BasePlayerCard = (props: Props) => {
  const playerTwitchName = 'bread1_0'

  const {
    player: scoreSaberResult
  } = useScoreSaberPlayer(props.userId)

  // const {
  //   player: beatLeaderResult
  // } = useBeatLeaderPlayer(props.userId)

  return (
    <div className={styles['base-iframe__wrapper']}>
      <iframe
        className={styles['base-iframe']}
        src={`https://player.twitch.tv/?channel=${playerTwitchName}&parent=localhost&muted=${props.muted ?? true}&controls=false`}
        height="390px"
        width="610px">
      </iframe>

      <div 
        className={styles['base-iframe__score']}
        style={{
          alignItems: scorePositionMap[props.scoreTrackerPosition || 'top']
        }}
      >
        <div className={styles['base-iframe__score-user']}>
          <img
            src={scoreSaberResult?.profilePicture}
            className={styles['base-iframe__score-user-avatar']}
          />
           
          <div className={styles['base-iframe__score-user-info']}>
            {scoreSaberResult?.name}

            {/* <div className={styles['base-iframe__score-user-badges']}>
              <div className={styles['base-iframe__score-user-badge']}>SS {scoreSaberResult?.rank}</div>
              <div className={styles['base-iframe__score-user-badge']}>BL {beatLeaderResult?.rank}</div>
            </div> */}
          </div>
        </div>

        <div className={styles['base-iframe__score-trackers']}>
            <h3 className={styles['base-iframe__score-trackers-combo']}>1337x FC</h3>
            <h4 className={styles['base-iframe__score-trackers-accuracy']}>96.41%</h4>
        </div>
      </div>
    </div>
  )
}
