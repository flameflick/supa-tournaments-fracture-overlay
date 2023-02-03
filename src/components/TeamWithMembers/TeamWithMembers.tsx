import React from 'react'
import styles from './TeamWithMembers.module.scss'
import clsx from 'clsx'

import type { ITeam } from '@/types/configs'
import { toTwemojiFlag } from '@/utils/twemoji'

interface IProps {
  team: ITeam
}

export const TeamWithMembers = (props: IProps) => {
  const team = props.team

  return (
    <div className={styles['team']}>
      <img 
        src={team.logoLink}
        className={styles['team__logo']}
      />
      
      <div className={styles['team__info']}>
        <h2 className={styles['team__name']}>{ team.name }</h2>
        <p className={styles['team__members']}>
          { team.members.map(i => 
            <span className={styles['team__member']}>
              { i.countryCode ? <img 
                src={toTwemojiFlag(i.countryCode)}
                className={styles['team__member-flag']}
              /> : null }

              { i.nickname }
            </span>
          ) }
        </p>  
      </div>
    </div>
  )
}
