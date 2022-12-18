import React, { ReactPropTypes } from 'react'

import styles from './BaseMarquee.module.scss'

import Marquee from 'react-fast-marquee'
import clsx from 'clsx'

interface IBaseMarqueeProps {
  width?: number
  gradientWidth?: number
  children: React.ReactNode
}

export const BaseMarquee = (props: IBaseMarqueeProps) => {
  return (
    <div className={styles['base-marquee__wrapper']}>
      <Marquee
        style={{
          width: props.width ? `${props.width}px` : '100%'
        }}
        gradientWidth={`${props.gradientWidth ?? 50}px`}
        gradientColor={[35, 35, 35]}
      >
        { props.children }
      </Marquee>
    </div>
  )
}
