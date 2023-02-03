import React, { ReactPropTypes, useEffect } from 'react'

import styles from './BaseMap.module.scss'

import clsx from 'clsx'
import { intervalToDuration, addSeconds, format } from 'date-fns'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faDrum } from '@fortawesome/free-solid-svg-icons'

import MetronomeIcon from '@/assets/metronome.svg'
import StandardSabersIcon from '@/assets/standard-sabers.svg'

import { useBeatSaverMap } from '@/hooks/use-beatsaver-data'

interface IBaseMapProps {
  mapHash: string | null
  selectedDifficulty: string | null

  children?: React.ReactNode
}

const zeroPad = (n: number) => String(n).padStart(2, '0')

const shortDiffNameMap: Record<string, string> = {
  'easy': 'Easy',
  'normal': 'Normal',
  'hard': 'Hard',
  'expert': 'Expert',
  'expertplus': 'Expert+'
}

export const BaseMap = (props: IBaseMapProps) => {
  const { map: mapResult } = useBeatSaverMap(props.mapHash)

  const mapDuration = mapResult ? format(addSeconds(new Date(0), mapResult.metadata.duration), 'm:ss') : ''
  const previewImage = `https://eu.cdn.beatsaver.com/${props.mapHash?.toLowerCase()}.jpg`

  return (
    <div className={styles['base-map']}>
      <div 
        className={styles['base-map__bg']} 
        style={{
          background: `linear-gradient(90deg, rgba(14,14,14,0.9) 0%, rgba(14,14,14,0.9) 100%), url(${previewImage}) no-repeat center`
        }}
      ></div>
      
      <div className={styles['base-map__wrapper']}>
        <img className={styles['base-map__image']} src={previewImage}/>

        <div className={styles['base-map__info']}>
          <h2 className={styles['base-map__info-artist-name']}>{ mapResult?.metadata.songAuthorName }</h2>
          <h3 className={styles['base-map__info-name']}>{ mapResult?.metadata.songName} - {mapResult?.metadata.songSubName}</h3>

          <div className={styles['base-map__info-chore']}>
          { props.selectedDifficulty ? 
            <span 
              className={styles['base-map__info-badge']}
              style={{
                backgroundColor: `var(--difficulty-${props.selectedDifficulty}-color)`
              }}
            ><StandardSabersIcon fill="#ffffff" width="1.3rem" />{shortDiffNameMap[props.selectedDifficulty]}</span> 
            : null }

            <span 
              className={styles['base-map__info-badge']}
            ><MetronomeIcon fill="#ffffff" width="1.3rem" />{ mapResult?.metadata.bpm }</span> 

            <h4 className={styles['base-map__info-mapper']}>by { mapResult?.metadata.levelAuthorName }</h4>

            <span className={styles['base-map__info-duration']}>{mapResult?.id}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
