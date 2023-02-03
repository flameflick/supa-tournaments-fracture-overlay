import { useState } from 'react'

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
    team1Id,
    team2Id,

    userScores,
    users,

    songHash,
    songDiff
  } = useRelay()

  return (
    <main>
      <section className={styles['main-streams']}>
        <div className={styles['main-streams__team-wrapper']}>
          <BasePlayerCard userId={'76561198988695829'}  muted={false}/>
          <BasePlayerCard userId={'76561198167372371'} />
          <BasePlayerCard userId={'76561198167372371'} />

          <div className={styles['main-streams__team-badge']}>
            <img className={styles['main-streams__team-badge-image']} src={'https://i.imgur.com/b4pEEYm.png'}/>
            { 'Tseska\'s Household Appliances' }
          </div>
        </div>

        <div className={styles['main-streams__middle-info']}>
          

          <div className={styles['main-streams__casters-placeholder']}>
          
          </div>

          <SkewLogo className={styles['main-streams__main-logo']}/>
        </div>

        

        <div className={styles['main-streams__team-wrapper']}>
          <BasePlayerCard userId={'76561198204808809'} scoreTrackerPosition='bottom' />
          <BasePlayerCard userId={'76561198167372371'} scoreTrackerPosition='bottom' />
          <BasePlayerCard userId={'76561198167372371'} scoreTrackerPosition='bottom' />

          <div className={clsx(styles['main-streams__team-badge'], styles['main-streams__team-badge_team-bottom'])}>
            <img className={clsx(styles['main-streams__team-badge-image'], styles['main-streams__team-badge-image_team-bottom'])} src={'https://i.imgur.com/wcUzpiZ.png'}/>
            { 'McDickheads' }
          </div>
        </div>
      </section>
      
      
      <BaseFooter songHash={songHash} selectedDifficulty={songDiff}/>

      <BaseSidebar userScores={userScores} users={users} />
    </main>
  )
}
