import React, { ReactPropTypes, useEffect } from 'react'

import styles from './BaseMap.module.scss'

import clsx from 'clsx'
import { intervalToDuration, addSeconds, format } from 'date-fns'

import { useBeatSaverMap } from '@/hooks/use-beatsaver-data'

interface IBaseMapProps {
  mapHash: string | null
  children?: React.ReactNode
}

const zeroPad = (n: number) => String(n).padStart(2, '0')

export const BaseMap = (props: IBaseMapProps) => {
  const { map: mapResult } = useBeatSaverMap(props.mapHash)

  const mapDuration = mapResult ? format(addSeconds(new Date(0), mapResult.metadata.duration), 'm:ss') : '';

  return (
    <div className={styles['base-map']}>
      <img className={styles['base-map__image']} src={`https://eu.cdn.beatsaver.com/${props.mapHash}.jpg`}/>

      <div className={styles['base-map__info']}>
        <h2 className={styles['base-map__info-name']}>{ mapResult?.name }</h2>

        <p className={styles['base-map__info-entry']}>
          <strong className={styles['base-map__info-entry-title']}>Mapper: </strong>
          { mapResult?.metadata.levelAuthorName }
        </p>

        <p className={styles['base-map__info-entry']}>
          <strong className={styles['base-map__info-entry-title']}>BPM: </strong>
          { mapResult?.metadata.bpm }
        </p>

        <p className={styles['base-map__info-entry']}>
          <strong className={styles['base-map__info-entry-title']}>Length: </strong>
          { mapDuration }
        </p>
      </div>
    </div>
  )
}
