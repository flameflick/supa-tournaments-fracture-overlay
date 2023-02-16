import React from 'react'

import styles from './BasePlayerCard.module.scss'

import { RelayScore, RelayUser } from '@/types/relay'
import { useScoreSaberPlayer } from '@/hooks/use-scoresaber'
import { useBeatLeaderPlayer } from '@/hooks/use-beatleader'
import { useScore } from '@/hooks/use-score'
import { getContrastingColor } from '@/utils/colors'
import { getPlayerTwitchUsername } from '@/utils/config'

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

const scoreShadowOffsetMap = {
  'top': '100px',
  'bottom': '-100px'
}

const OVERLAY_ORIGIN = process.env.ORIGIN || 'localhost'

export const BasePlayerCard = (props: Props) => {
  const playerTwitchName = getPlayerTwitchUsername(props.userId)

  const {
    player: scoreSaberResult
  } = useScoreSaberPlayer(props.userId)

  const {
    player: beatLeaderResult
  } = useBeatLeaderPlayer(props.userId)

  const getNameWithoutClans = (name: string) => {
    const nameParts = name.split('|')
    return nameParts[nameParts.length - 1]
  }

  const score = useScore(props.score)

  console.info(score)

  return (
    <div className={styles['base-iframe__wrapper']}>
      <iframe
        className={styles['base-iframe']}
        src={`https://player.twitch.tv/?channel=${playerTwitchName}&parent=${OVERLAY_ORIGIN}&muted=${props.muted ?? true}&controls=false`}
        height="390px"
        width="610px">
      </iframe>

      <div 
        className={styles['base-iframe__score']}
        style={{
          alignItems: scorePositionMap[props.scoreTrackerPosition || 'top'],
          boxShadow: `0px ${scoreShadowOffsetMap[props.scoreTrackerPosition || 'top']} 100px -89px black inset`
        }}
      >
        <div className={styles['base-iframe__score-user']}>
          <img
            src={scoreSaberResult?.profilePicture}
            className={styles['base-iframe__score-user-avatar']}
          />
           
          <div className={styles['base-iframe__score-user-info']}>
            { scoreSaberResult?.name && getNameWithoutClans(scoreSaberResult?.name) }

            <p className={styles['base-iframe__score-user-clans']}>
              { beatLeaderResult?.clans.map(i => 
                <span 
                  className={styles['base-iframe__score-user-clan']}
                  style={{
                    backgroundColor: i.color,
                    color: getContrastingColor(i.color)
                  }}
                  key={i.id}
                >
                  { i.tag }
                </span>
              ) }
            </p>
          </div>
        </div>

        <div className={styles['base-iframe__score-trackers']}>
            <h3 className={styles['base-iframe__score-trackers-combo']}>
              { score.combo }x  
              { score.isFC ? <span className={styles['base-iframe__score-trackers-combo-fc']}>FC</span> : null}
            </h3>
            <h4 className={styles['base-iframe__score-trackers-accuracy']}>{ score.acc }%</h4>
        </div>
      </div>
    </div>
  )
}
