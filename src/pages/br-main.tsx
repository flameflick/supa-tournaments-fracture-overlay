import { useState } from 'react'

import { ITeam } from '@/types/configs'

import Image from 'next/image'
import styles from '../styles/Home.module.css'

import { BaseFooter } from '@/components/BaseFooter'
import { BaseSidebar } from '@/components/BaseSidebar'
import { useRelay } from '@/hooks/use-relay'
import { BasePlayerCard } from '@/components/BasePlayerCard'

import SkewLogo from '@/assets/skew-logo.svg'
import clsx from 'clsx'

export default function Home() {
  const {
    team1,
    team2,

    userScores,
    users,

    teamPoints,

    songHash,
    songDiff,

    audioPlayerIndex
  } = useRelay()

  const getActiveTeamMembers = (team: ITeam) => {
    const members = team.members.filter(i => i.platformId in users)

    return members.length === 3 ? members : team.members.slice(0, 3)
  }

  return (
    <main>
      <section className={styles['main-streams']}>
        <div className={styles['main-streams__team-wrapper']}>
          {team1 ? getActiveTeamMembers(team1).map((i, index) => 
            <BasePlayerCard 
              userId={i.platformId}
              score={userScores[i.platformId]}
              muted={index !== audioPlayerIndex}
              key={i.platformId}  
            />
          ) : null}

          <div className={styles['main-streams__team-badge']}>
            <img className={styles['main-streams__team-badge-image']} src={team1?.logoLink}/>
            { team1?.shortName || team1?.name }
          </div>
        </div>

        <div className={styles['main-streams__middle-info']}>

          <div className={styles['main-streams__casters-placeholder']}></div>

          <SkewLogo className={styles['main-streams__main-logo']}/>        
        </div>


        <div className={styles['main-streams__team-wrapper']}>
          {team2 ? getActiveTeamMembers(team2).map((i, index) => 
            <BasePlayerCard 
              userId={i.platformId} 
              score={userScores[i.platformId]}
              muted={(index + 3) !== audioPlayerIndex}
              scoreTrackerPosition="bottom" 
              key={i.platformId} 
            />
          ) : null}

          <div className={clsx(styles['main-streams__team-badge'], styles['main-streams__team-badge_team-bottom'])}>
            <img className={clsx(styles['main-streams__team-badge-image'], styles['main-streams__team-badge-image_team-bottom'])} src={team2?.logoLink}/>
            { team2?.shortName || team2?.name }
          </div>
        </div>
      </section>
      
      
      <BaseFooter songHash={songHash} selectedDifficulty={songDiff}/>

      <BaseSidebar userScores={userScores} users={users} teamPoints={teamPoints}/>
    </main>
  )
}
