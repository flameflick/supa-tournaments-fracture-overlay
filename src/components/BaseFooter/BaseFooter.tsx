import React, { useState } from 'react'
import clsx from 'clsx'

import styles from './BaseFooter.module.scss'

import { BaseMarquee } from '@/components/BaseMarquee'
import { BaseMap } from '@/components/BaseMap'
import { TeamWithMembers } from '@/components/TeamWithMembers'
import SkewLogo from '@/assets/skew-logo.svg'

import { default as marqueeConfig } from '@/configs/marquee.json'
import { default as teamsConfig } from '@/configs/teams.json'

type Props = {
  songHash: string | null
  selectedDifficulty: string | null

  fullWidth?: boolean
  withLogo?: boolean
}

export const BaseFooter = (props: Props) => {
  const marqueeWidth = props.fullWidth ? 
    (props.withLogo ? 1100 : 1300) : 1000

  return (
    <footer className={clsx(
        styles['base-footer'],
        props.fullWidth && styles['base-footer_full-width'],
        props.withLogo && styles['base-footer_centered-wrap']
    )}>
      <BaseMap mapHash={props.songHash} selectedDifficulty={props.selectedDifficulty} />

      <section className={styles['base-footer__info']}>
        <BaseMarquee 
          gradientWidth={100} 
          height={105} 
          width={marqueeWidth}
        >
          { teamsConfig.map(i => <TeamWithMembers team={i} key={i.id}/>) }
        </BaseMarquee>
      </section>

      { props.withLogo ? <section className={styles['base-footer__logo-wrapper']}>
        <SkewLogo className={styles['base-footer__logo']}/>
      </section> : null }
    </footer>
  )
}