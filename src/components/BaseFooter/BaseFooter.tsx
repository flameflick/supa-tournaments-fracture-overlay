import React, { useState } from 'react'

import styles from './BaseFooter.module.scss'

import { BaseMarquee } from '@/components/BaseMarquee'
import { BaseMap } from '@/components/BaseMap'
import { TeamWithMembers } from '@/components/TeamWithMembers'

import { default as marqueeConfig } from '@/configs/marquee.json'
import { default as teamsConfig } from '@/configs/teams.json'

type Props = {
  songHash: string | null
  selectedDifficulty: string | null
}

export const BaseFooter = (props: Props) => {
  return (
    <footer className={styles['base-footer']}>
      <BaseMap mapHash={props.songHash} selectedDifficulty={props.selectedDifficulty} />

      <section className={styles['base-footer__info']}>
        <BaseMarquee gradientWidth={100} height={105} width={1000}>
          { teamsConfig.map(i => <TeamWithMembers team={i} key={i.id}/>) }
        </BaseMarquee>
      </section>
    </footer>
  )
}