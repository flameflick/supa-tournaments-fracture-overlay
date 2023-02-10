import React, { useState } from 'react'
import clsx from 'clsx'

import styles from './BaseFooter.module.scss'

import { BaseMarquee } from '@/components/BaseMarquee'
import { BaseMap } from '@/components/BaseMap'
import { TeamWithMembers } from '@/components/TeamWithMembers'

import { default as marqueeConfig } from '@/configs/marquee.json'
import { default as teamsConfig } from '@/configs/teams.json'

type Props = {
  songHash: string | null
  selectedDifficulty: string | null

  fullWidth?: boolean
}

export const BaseFooter = (props: Props) => {
  return (
    <footer className={clsx(
        styles['base-footer'],
        props.fullWidth && styles['base-footer_full-width']
    )}>
      <BaseMap mapHash={props.songHash} selectedDifficulty={props.selectedDifficulty} />

      <section className={styles['base-footer__info']}>
        <BaseMarquee gradientWidth={100} height={105} width={props.fullWidth ? 1300 : 1000}>
          { teamsConfig.map(i => <TeamWithMembers team={i} key={i.id}/>) }
        </BaseMarquee>
      </section>
    </footer>
  )
}