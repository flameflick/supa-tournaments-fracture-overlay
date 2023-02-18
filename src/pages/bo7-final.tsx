import { useState } from 'react'

import { ITeam } from '@/types/configs'

import Image from 'next/image'
import styles from '../styles/Finals.module.css'

import { BaseFooter } from '@/components/BaseFooter'
import { useRelay } from '@/hooks/use-relay'
import { useTeamScore } from '@/hooks/use-team-score'
import { BasePlayerCard } from '@/components/BasePlayerCard'

import SkewLogo from '@/assets/skew-logo.svg'
import ValknutLogo from '@/assets/valknut-logo.svg'
import clsx from 'clsx'

export default function Finals() {
  const {
    team1,
    team2,

    userScores,
    users,

    songHash,
    songDiff,

    audioPlayerIndex
  } = useRelay()

  const getActiveTeamMembers = (team: ITeam) => {
    const members = team.members.filter(i => i.platformId in users)

    return members.length === 3 ? members : team.members.slice(0, 3)
  }

  const findScoresForTeam = (team: ITeam | null) => {
    if (!team) return null

    const scoresList = Object.values(userScores)
    const usersList = Object.values(users)

    return scoresList
      .filter(i => {
        const fullUser = usersList.find(j => j.guid === i.user_guid)

        if (!fullUser) return

        return fullUser.team.id === team.id
      })
  }

  const team1Score = useTeamScore(
    findScoresForTeam(team1)
  )

  const team2Score = useTeamScore(
    findScoresForTeam(team2)
  )

  return (
    <main>
      <section className={styles['main-streams']}>
        <div className={styles['main-streams__team-wrapper']}>
          {team1 ? getActiveTeamMembers(team1).map((i, index) => 
            <BasePlayerCard 
              userId={i.platformId}  
              muted={index !== audioPlayerIndex}
              key={i.platformId} 
              big 
            />
          ) : null}

          <div className={styles['main-streams__team-badge']}>
            <img className={styles['main-streams__team-badge-image']} src={team1?.logoLink}/>
            { team1?.name }
          </div>
        </div>

        <div className={styles['main-streams__middle-info']}>
          <div className={styles['main-streams__team-score']}>
            1
          </div>

          <div className={styles['main-streams__casters-placeholder']}>
            {JSON.stringify(team1Score)}
            <br></br>
            {JSON.stringify(team2Score)}
          </div>

          <div className={styles['main-streams__team-score']}>
            1
          </div>
        </div>

        <div className={styles['main-streams__team-wrapper']}>
          {team2 ? getActiveTeamMembers(team2).map((i, index) => 
            <BasePlayerCard 
              userId={i.platformId} 
              scoreTrackerPosition="bottom" 
              muted={(index + 3) !== audioPlayerIndex}
              key={i.platformId} 
              big 
            />
          ) : null}

          <div className={clsx(styles['main-streams__team-badge'], styles['main-streams__team-badge_team-bottom'])}>
            <img className={clsx(styles['main-streams__team-badge-image'], styles['main-streams__team-badge-image_team-bottom'])} src={team2?.logoLink}/>
            { team2?.name }
          </div>
        </div>
      </section>
      
      
      <BaseFooter fullWidth songHash={songHash} selectedDifficulty={songDiff} withLogo/>
    </main>
  )
}
